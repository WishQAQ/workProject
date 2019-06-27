package com.wit.base.rest.ccpm.utils.fee;

import com.jfinal.kit.PropKit;

import java.math.BigDecimal;
import java.text.SimpleDateFormat;
import java.util.Date;

public class Init {

    public static Head initHead() {
        Head head = new Head();

        //商户号
        head.setMerPtcId(PropKit.use("common.properties").get("merchantId"));
        // 订单日期
        String ReqTime = new SimpleDateFormat("yyyyMMddHHmmss").format(new Date());
        head.setReqTime(ReqTime);
        head.setTranCode("MAPIPY5115");
        head.setVersion("1.1.20181206");

        return head;
    }

    public static Body initBody(String ip, String amount,String tranContent) {
        Body body = new Body();
        long currentTime = System.currentTimeMillis();
        String ReqTime = new SimpleDateFormat("yyyyMMddHHmmss").format(new Date(currentTime));// 订单日期
        body.setPayMerTranNo(ReqTime+ReqTime); //需要保证唯一 这里要非常注意ReqTime+分布式保证唯一的方案
        body.setLocation("ONLINE");
        body.setTranScene("B2C-SDKAPP-WECHAT");
        body.setAmount(amount);
        body.setCurrency("CNY");
        //展示给客户的
        body.setTranContent(tranContent);
        //不展示给客户，可查询
        body.setMerMemo("内部测试");
        TranOptions tranOptions=new TranOptions();
        tranOptions.setAppID(PropKit.use("common.properties").get("aapId"));
        tranOptions.setIP(ip);
        body.setTranOptions(tranOptions);
        String EndTime = new SimpleDateFormat("yyyyMMddHHmmss").format(new Date(currentTime + 30 * 60 * 1000));// 30分钟订单日期
        //交易失效时间，貌似默认都是2分钟
        body.setValidPeriod(EndTime);
        body.setNotifyURL(PropKit.use("common.properties").get("payNotifyUrl"));
        return body;
    }



}