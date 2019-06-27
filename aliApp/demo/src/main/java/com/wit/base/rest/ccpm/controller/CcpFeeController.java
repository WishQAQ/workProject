package com.wit.base.rest.ccpm.controller;

import cn.hutool.core.util.StrUtil;
import cn.hutool.core.util.XmlUtil;
import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.bocom.pay.BocomClient;
import com.jfinal.aop.Before;
import com.jfinal.core.NotAction;
import com.jfinal.ext.interceptor.GET;
import com.jfinal.ext.interceptor.POST;
import com.jfinal.kit.PathKit;
import com.wit.base.rest.ccpm.service.fee.impl.PaidOrder;
import com.wit.base.rest.ccpm.service.fee.IFeeServiceImp;
import com.wit.base.rest.ccpm.service.fee.impl.FeeServiceImp;
import com.wit.base.rest.ccpm.utils.BaseException;
import com.wit.base.rest.ccpm.utils.DataTemplate;
import com.wit.base.rest.ccpm.utils.ObjectUtil;
import com.wit.base.rest.ccpm.utils.fee.*;
import io.jboot.web.controller.JbootController;
import io.jboot.web.controller.annotation.RequestMapping;
import org.apache.log4j.Logger;
import org.w3c.dom.Document;
import org.w3c.dom.Node;

import javax.servlet.http.HttpServletRequest;
import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.math.BigDecimal;
import java.util.HashMap;
import java.util.Map;

@RequestMapping("/api/v1/fee")
public class CcpFeeController extends JbootController {
    private Logger log = Logger.getLogger(CcpFeeController.class);

    public void demo() {
        JSONObject jsonObject = getRawObject();
        String name = getPara("name");
        if (StrUtil.isEmptyOrUndefined(name)) {
            renderJson(DataTemplate.wrapErrorData("错误信息！"));
            return;
        }
    }


    IFeeServiceImp costsService = new FeeServiceImp();

    /**
     * 查询支付是否可用
     */
    @Before(GET.class)
    public void getPayFunctionState() {
        Map<String, Object> map = costsService.getPayFunctionState();
        if (map == null) {
            renderJson(DataTemplate.wrapErrorData("没有维护功能信息"));
        } else {
            renderJson(DataTemplate.wrapSuccessData(map));
        }
    }

    /**
     * 获取党费党员信息
     */
    @Before(GET.class)
    public void getMemInfo4Costs() {
        String memKey = getPara("mem_key");
        if (ObjectUtil.stringIsEmptyOrUndefined(memKey)) {
            renderJson(DataTemplate.wrapErrorData("人员key不能为空"));
            return;
        }
        try {
            renderJson(DataTemplate.wrapSuccessData(costsService.getMemInfo4Costs(memKey.toString())));
        }catch (BaseException e){
            renderJson(DataTemplate.wrapErrorData(e.getMessage()));
        }
        ;
    }

    /**
     * 获取个人党费缴纳信息
     */
    @Before(GET.class)
    public void getPartyCostsInfo() {
        String memKey = getPara("mem_key");
        String year = getPara("year");
        if (ObjectUtil.stringIsEmptyOrUndefined(memKey)) {
            renderJson(DataTemplate.wrapErrorData("人员key不能为空"));
            return;
        }
        Map<String, Object> map = null;
        try {
            map = costsService.getPartyCostsInfo(memKey, year);
        } catch (BaseException e) {
            renderJson(DataTemplate.wrapErrorData(e.getMessage()));
            return;
        }
        renderJson(DataTemplate.wrapSuccessData(map));
    }

    /**
     * 获取当前需要缴纳党费的金额
     */
    @Before(GET.class)
    public void getPayMoney() {
        String memKey = getPara("mem_key");
        String year = getPara("yaer");
        String month = getPara("month");
        Map<String, String> data;
        try {
            data = costsService.getPayMoney(memKey, year, month);
        } catch (BaseException e) {
            renderJson(DataTemplate.wrapErrorData(e.getMessage()));
            return;
        }
        renderJson(DataTemplate.wrapSuccessData(data));
    }

    /**
     * 支付成功回调接口
     */
    @Before(POST.class)
    public void addOrderSuccess() {
        JSONObject json = getRawObject();
        String feeOrder = json.getString("fee_order");
        String weixinOrder = json.getString("weixin_order");
        if (ObjectUtil.stringIsEmptyOrUndefined(feeOrder)) {
            renderJson(DataTemplate.wrapErrorData("订单号不能为空"));
            return;
        }
        if (ObjectUtil.stringIsEmptyOrUndefined(weixinOrder)) {
            renderJson(DataTemplate.wrapErrorData("微信订单号不能为空"));
            return;
        }
        boolean result = costsService.updateOrderStatusToPaySuccess(feeOrder, weixinOrder);
        if (result) {
            renderJson(DataTemplate.wrapSuccessData("修改成功"));
            return;
        }
        renderJson(DataTemplate.wrapErrorData("修改失败"));
    }

    /**
     * 请求生成订单
     */
    @Before(POST.class)
    public void produceOrder() {
        JSONObject json = getRawObject();
        BigDecimal money = json.getBigDecimal("money");
        String payType = json.getString("pay_type");
        BigDecimal otherPayMoney = json.getBigDecimal("other_pay_money");
        String year = json.getString("year");
        String month = json.getString("month");
        String memKey = json.getString("mem_key");
        String orderType = json.getString("order_type");
        String payerKey = json.getString("payer_key");//TODO 获取登录状态下的user_key
        if (ObjectUtil.stringIsEmptyOrUndefined(money.toString())) {
            renderJson(DataTemplate.wrapErrorData("订单金额不能为空"));
            return;
        }
        if (ObjectUtil.stringIsEmptyOrUndefined(payType)) {
            renderJson(DataTemplate.wrapErrorData("支付类型不能为空"));
            return;
        }
        if (ObjectUtil.stringIsEmptyOrUndefined(orderType)) {
            renderJson(DataTemplate.wrapErrorData("订单类型不能为空"));
            return;
        }
        if (ObjectUtil.stringIsEmptyOrUndefined(payerKey)) {
            renderJson(DataTemplate.wrapErrorData("支付人(创建人)不能为空"));
            return;
        }
        Map<String, Object> map = null;
        if (ObjectUtil.stringIsEmptyOrUndefined(memKey)) {//如果党员key为空，则默认为个人支付
            memKey = payerKey;//TODO 获取登录状态下的mem_key
        }
        try {
            map = costsService.produceOrder(money, payType, otherPayMoney, year, month, memKey, orderType, payerKey);
        } catch (BaseException e) {
            renderJson(DataTemplate.wrapErrorData(e.getMessage()));
            return;
        }
        renderJson(DataTemplate.wrapSuccessData(map));
    }

    /**
     * 获取用户管理员的手机号
     */
    @Before(GET.class)
    public void getAdminPhone() {
        String memKey = getPara("mem_key");
        renderJson(DataTemplate.wrapSuccessData(costsService.getAdminPhone(memKey)));
    }


    @NotAction
    private String generateXml(String ip,String money,String tranContent) {
        TagEntity tagEntity = new TagEntity();
        Head head = Init.initHead();
        Body body = Init.initBody(ip, money,tranContent);
        tagEntity.setHead(head);
        tagEntity.setBody(body);
        String html = XMLUtil.toXml(tagEntity);
        String top = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n";
        return top + html;
    }

    /**
     * 微信下单接口
     */
    @Before(POST.class)
    public void unifiedOrder() {
        JSONObject orderPara = getRawObject();
        if (!orderPara.containsKey("ip")) {
            renderJson(DataTemplate.wrapErrorData("缺少参数ip"));
            return;
        }
        if (!orderPara.containsKey("fee_order")) {
            renderJson(DataTemplate.wrapErrorData("缺少参数fee_order"));
            return;
        }
        String xmlConfigPath = PathKit.getWebRootPath()+"\\src\\main\\resources"+ File.separator + "BocompayMerchant.xml";
        BocomClient client = new BocomClient();
        int init = client.initialize(xmlConfigPath);
        if (init == -1) {
            log.error("配置文件初始化失败，请检查文件路径！" + xmlConfigPath);
            renderJson(DataTemplate.wrapErrorData("缴纳党费，下单失败"));
            return;
        }

        String ip = orderPara.getString("ip");
        String feeOrder = orderPara.getString("fee_order");
        Map<String, Object> map;
        try {
            map = costsService.getOrderByFeeOrder(feeOrder);
        } catch (BaseException e) {
            renderJson(DataTemplate.wrapErrorData("下单查询订单信息失败"));
            return;
        }
//        String xml = generateXml(ip,map.get("money").toString(),map.get("tranContent").toString());
        //@TODO 此处测试，金额固定为0.01
        String xml = generateXml(ip,"0.01",map.get("tranContent").toString());
        System.out.println(xml);

        //301140880629503.pfx 证书的id
        String RSASignData = client.AttachedSign("301140880629503", xml);

        /** ============== http 请求==================== **/
        String url = "http://pbanktest.95559.com.cn/netpay/mapiTRL/combine.jsp";
        Map<String, String> headers = new HashMap<>();
        Map<String, Object> HeadPostParam = new HashMap<String, Object>();
        HeadPostParam.put("RSASignData", RSASignData);
        String signData = HttpUtils.doPostByForm(url, headers, HeadPostParam);

        signData = client.AttachedVerify(signData);
        System.out.println("请求返回signData:" + signData);
        System.out.println("====================");

        Document doc = XmlUtil.parseXml(signData);
        Node node = doc.getElementsByTagName("TranPackage").item(0);

        System.out.println("解签返回：" + node.getTextContent());
        /*
        * Body
            --PayMerTranNo
            --TranPackage
        * */

        JSONObject jsonObject = JSON.parseObject(node.getTextContent());
        JSONObject retObject = new JSONObject();
        retObject.put("app_id", jsonObject.get("appId"));
        retObject.put("partner_id", jsonObject.get("partnerId"));
        retObject.put("prepay_id", jsonObject.get("prepayId"));
        retObject.put("package", jsonObject.get("package"));
        retObject.put("nonce_str", jsonObject.get("nonceStr"));
        retObject.put("time_stamp", jsonObject.get("timeStamp"));
        retObject.put("sign", jsonObject.get("paySign"));
        renderJson(DataTemplate.wrapSuccessData(retObject));
    }

    // @TODO 根据订单号获取订单详情测试接口，测试完毕需删除
    public void test() {
        String feeOrder = getPara("fee_order");
        try {
            Map<String, Object> map = costsService.getOrderByFeeOrder(feeOrder);
            renderJson(DataTemplate.wrapSuccessData(map));
        } catch (BaseException e) {
            renderJson(DataTemplate.wrapErrorData(e.getMessage()));
        }
    }


    /**
     * 微信支付成功回调
     */
    public void payNotifyUrl() throws IOException {
        HttpServletRequest request = getRequest();
        String resultStr = null;
        BufferedReader reader = null;
        reader = request.getReader();
        String line = "";
        String xmlString = null;
        StringBuffer inputString = new StringBuffer();
        while ((line = reader.readLine()) != null) {
            inputString.append(line);
        }
        xmlString = inputString.toString();
        request.getReader().close();
        System.out.println("----接收到的数据如下：---" + xmlString);
        Map<String, String> map = new HashMap<String, String>();
        map = XMLUtil.fromXml(xmlString, HashMap.class);
        String outTradeNo = map.get("out_trade_no");//商户订单号
        String transactionId = map.get("transaction_id");//微信订单号
        String timeEnd = map.get("time_end");//完成时间
        String totalFee = map.get("total_fee");//订单总金额
        String resultCode = map.get("result_code");//返回码
        if (FeeUtil.checkSign(xmlString)) {
            boolean result = costsService.complatePayCallback4WeChat(outTradeNo, timeEnd, transactionId, BigDecimal.valueOf(Double.parseDouble(totalFee)), 2);
            if (result) {
                //订单逻辑处理
                resultStr = XMLUtil.toXml(resultCode);
            } else {
                resultStr = XMLUtil.toXml("FAIL");
            }
        } else {
            resultStr = XMLUtil.toXml("FAIL");
        }
        renderText(resultStr);
    }

    //@TODO 微信回调测试接口
    public void payNotifyUrlTest(){
        String outTradeNo = getPara("out_trade_no");//商户订单号
        String transactionId = getPara("transaction_id");//微信订单号
        String timeEnd = getPara("time_end");//完成时间
        String totalFee = getPara("total_fee");//订单总金额
        boolean result = costsService.complatePayCallback4WeChat(outTradeNo, timeEnd, transactionId,
                BigDecimal.valueOf(Double.parseDouble(totalFee)), 2);
        if(result){
            renderJson(DataTemplate.wrapSuccessData("订单已完成"));
        }else{
            renderJson(DataTemplate.wrapErrorData("订单已处理失败"));
        }
    }

    /**
     * 查询已支付的详情
     */
    @Before(GET.class)
    public void queryPaidDetail(){
        String memKey = getPara("mem_key");
        String year = getPara("year");
        String month = getPara("month");
        if(ObjectUtil.stringIsEmptyOrUndefined(memKey)){
            renderJson(DataTemplate.wrapErrorData("memKey不能为空"));
            return;
        }
        if(ObjectUtil.stringIsEmptyOrUndefined(year)){
            renderJson(DataTemplate.wrapErrorData("year不能为空"));
            return;
        }
        if(ObjectUtil.stringIsEmptyOrUndefined(month)){
            renderJson(DataTemplate.wrapErrorData("month不能为空"));
            return;
        }
        try {
            PaidOrder paidOrder = costsService.getPaidOrder(memKey, year, month);
            renderJson(DataTemplate.wrapSuccessData(paidOrder));
        } catch (BaseException e) {
            renderJson(DataTemplate.wrapErrorData(e.getMessage()));
        }
    }

}
