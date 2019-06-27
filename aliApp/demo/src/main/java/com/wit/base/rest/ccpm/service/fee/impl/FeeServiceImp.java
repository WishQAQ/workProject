package com.wit.base.rest.ccpm.service.fee.impl;

import com.jfinal.kit.PropKit;
import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.IAtom;
import com.jfinal.plugin.activerecord.Record;
import com.wit.base.rest.ccpm.service.fee.IFeeServiceImp;
import com.wit.base.rest.ccpm.utils.BaseException;
import com.wit.base.rest.ccpm.utils.ObjectUtil;
import org.apache.log4j.Logger;

import java.math.BigDecimal;
import java.sql.SQLException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

import static com.wit.base.rest.ccpm.config.DbConfig.JIANGSU_CONFIG;

//@JbootrpcService
public class FeeServiceImp implements IFeeServiceImp {
    private Logger log = Logger.getLogger(FeeServiceImp.class);

    @Override
    public Map<String, Object> getPayFunctionState() {
        Map<String, Object> map = new HashMap<>();
        String identity = PropKit.use("common.properties").get("partyCosts");
        String sql = "select * from ccp_function_switch where identity = ? and delete_time = 0 limit 1";
        Record record = Db.use(JIANGSU_CONFIG).findFirst(sql, identity);
        if (record == null) {
            return null;
        }
        map.put("status", record.get("status"));
        map.put("message", record.get("stop_use_reason"));
        return map;
    }

    @Override
    public Map<String, Object> getMemInfo4Costs(String key) throws BaseException {
        //查询人员信息
        String sql = "select name,org_code,join_org_date,last_pay_date from ccp_mem where `key` = ?";
        Record record = Db.use(JIANGSU_CONFIG).findFirst(sql, key);
        if (record == null) {
            return null;
        }
        //默认将入党年、日设为0
        record.set("join_party_year", 0);
        record.set("join_party_day", 0);
        if (!ObjectUtil.stringIsEmpty(record.getStr("join_org_date"))) {
            record.set("join_org_date", record.getStr("join_org_date"));//将时间从新赋值为字符串，否则转json时会将时间转为long
            try {
                //计算加入党至今的年和不足年的天数
                Date now = new Date();
                SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
                Map<String, Integer> map = ObjectUtil.calculationYearAndSurplusDay(record.getStr("join_org_date"), sdf.format(now));
                record.set("join_party_year", map.get("year"));
                record.set("join_party_day", map.get("day"));
            } catch (Exception e) {
                log.error("计算入党时间错误", e);
            }
        }
        //查询组织
        String orgSql = "select name org_name from ccp_org where org_code = ?";
        Record orgRecord = Db.use(JIANGSU_CONFIG).findFirst(orgSql, record.getStr("org_code"));
        record.set("org_name", orgRecord.get("org_name"));//将组织名插入人员信息中
        String lastPayTime = record.getStr("last_pay_date");
        if(!ObjectUtil.stringIsEmpty(lastPayTime)){
            try {
                Map<String, Integer> payDate = ObjectUtil.timeStrToMap(lastPayTime, "yyyy-MM-dd");
                int payYear = payDate.get("month") == 12 && !payDate.get("year").equals(ObjectUtil.getNowYear()+"")? payDate.get("year")+1:payDate.get("year");
                record.set("now_pay_year",payYear);
            } catch (ParseException e) {
                throw new BaseException("处理上次党费缴纳时间发生错误");
            }
        }else{//如果上次缴纳时间为空，查询fee表查看最早的未缴纳时间
            String feeSql = "select max(paid_time1) paid_time1,max(paid_time2) paid_time2,max(paid_time3) paid_time3,max(paid_time4) paid_time4 " +
                    ",max(paid_time5) paid_time5,max(paid_time6) paid_time6,max(paid_time7) paid_time7,max(paid_time8) paid_time8,max(paid_time9) paid_time9 " +
                    ",max(paid_time10) paid_time10,max(paid_time11) paid_time11,max(paid_time12) paid_time12,year " +
                    " from ccp_fee where mem_key = ? and delete_time = 0 and status = 0 group by year order by year desc";
            List<Record> feeRecord = Db.use(JIANGSU_CONFIG).find(feeSql, key);
            feeFor:for (Record fee:feeRecord) {
                for (int i = 12; i > 0; i--) {
                    //循环查找最后缴纳党费的日期
                   if(!ObjectUtil.stringIsEmpty(fee.getStr("paid_time"+i))){
                       int nowPayYear = fee.getInt("year");
                       if(i == 12 && !fee.getStr("year").equals(ObjectUtil.getNowYear()+"")){
                           nowPayYear++;
                       }
                       record.set("now_pay_year",nowPayYear);
                       break feeFor;
                   }
                }
            }
        }
        return ObjectUtil.recordToMap(record);
    }

    @Override
    public Map<String, Object> getPartyCostsInfo(String memKey, String year) throws BaseException {
        PartyCostsInfo costsInfo = new PartyCostsInfo(memKey, year);
        costsInfo.initAll();//初始化所以数据
        Map<String, Object> baseMap = costsInfo.getBaseMap();
        return baseMap;
    }

    @Override
    public Map<String,String> getPayMoney(String memKey, String yearStr, String monthStr) throws BaseException {
        Map<String,String> data = new HashMap<>();
        PartyCostsOrder order = initPartyCotsOrder(yearStr,monthStr,memKey);//订单信息处理类
        try {
            order.initPayInfo();//初始化需要缴纳的金额
            order.initPayDetailInfo();//初始化在支付中的金额
        } catch (ParseException e) {
            throw new BaseException("初始化支付信息错误");
        }
        BigDecimal payAmount = order.getPayAmount();
        payAmount = payAmount.subtract(order.getInPaymentMoney());//减去在支付的金额
        data.put("money",payAmount.toString());
        return data;
    }

    @Override
    public boolean updateOrderStatusToPaySuccess(final String feeOrder, final String weixinOrder) {
        Calendar calendar = Calendar.getInstance();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        final String nowTime = sdf.format(calendar.getTime());
        calendar.getTime();
        //修改订单为支付成功，订单状态为删除成功、状态为未支付才进行修改
        boolean result = Db.tx(new IAtom() {
            @Override
            public boolean run() throws SQLException {
                int update;
                int updateDetail;
                try {
                    String sql = "update ccp_fee_order set weixin_order = ?,pay_success_time=?,status=1 where fee_order=? and delete_time =0 and status=0";
                    update = Db.use(JIANGSU_CONFIG).update(sql, weixinOrder, nowTime, feeOrder);
                    sql = "update ccp_fee_order_detail set status = 1 where delete_time = 0 and status = 0 and order_key = " +
                            "(select `key` from ccp_fee_order where fee_order = ?)";
                    updateDetail = Db.use(JIANGSU_CONFIG).update(sql, feeOrder);
                } catch (Exception e) {
                    log.error("支付成功修改订单状态错误" + e);
                    return false;
                }
                return update > 0 && updateDetail > 0;
            }
        });
        return result;
    }

    private PartyCostsOrder initPartyCotsOrder(String yearStr,String monthStr,String memKey) throws BaseException {
        //查看支付功能是否可用
        Map<String, Object> payFunctionState = getPayFunctionState();
        if("0".equals(payFunctionState.get("status"))){
            throw new BaseException("支付功能已被停用");
        }
        PartyCostsOrder order;//订单信息处理类
        //指定缴纳的年份和月份都不为空，查询指定时间需要缴纳的党费
        Map<String, Integer> date = new HashMap<>();
        if (!ObjectUtil.stringIsEmpty(yearStr) && !ObjectUtil.stringIsEmpty(monthStr)) {
            try {
                date = ObjectUtil.timeStrToMap(yearStr + "-" + monthStr, "yyyy-MM");
            } catch (ParseException e) {
                log.error("判断上次党费是否缴纳，转换时间错误", e);
                throw new BaseException("年份或月份数据格式错误");
            }
            int month = date.get("month");
            int year = date.get("year");
            if(year >= ObjectUtil.getNowYear() && month > ObjectUtil.getNowMonth()){
                throw new BaseException("当前时间最多缴纳"+ObjectUtil.getNowYear()+"年"+ObjectUtil.getNowMonth()+"月党费，不能提前缴纳党费");
            }
            order = new PartyCostsOrder(memKey, year, month);
        } else {
            order = new PartyCostsOrder(memKey);
        }
        return  order;
    }

    /**
     * @TODO 未支付的订单未处理，是否需要一个定时器清理超时未支付订单
     */
    @Override
    public Map<String, Object> produceOrder(BigDecimal money, String payType, BigDecimal otherPayMoney, String yearStr,
                                            String monthStr, String memKey, String orderType, String payerKey) throws BaseException {
        PartyCostsOrder order = initPartyCotsOrder(yearStr,monthStr,memKey);//订单信息处理类
        order.initCosts();//初始化支付信息
        if (!order.isPay()) {//如果上个月党费未缴纳，停止生成订单
            throw new BaseException("请按顺序缴纳党费");
        }
        String nowTime = ObjectUtil.getNowTimeStr();
        Map<Integer, List<Integer>> payDataMap = order.getPayDataMap();//订单创建的党费缴纳日期
        //获取订单日期详情
        Map<String, Integer> payOrderDateMap = order.getPayOderMap();
        //需要缴纳的总金额
        BigDecimal payAmount = order.getPayAmount();
        payAmount = payAmount.subtract(order.getInPaymentMoney());//减去在支付的金额
        if(payAmount.doubleValue() == 0){
            String errorMessage = "当前月不需要缴纳党费";
            if(!ObjectUtil.stringIsEmpty(yearStr) && !ObjectUtil.stringIsEmpty(monthStr)){
                Integer status = payOrderDateMap.get(yearStr + "-" + monthStr);
                if(status != null){
                    if(status == 1){
                        errorMessage = "当前月党费已支付成功，正在处理中";
                    }else if(status == 3){
                        errorMessage = "当前月党费已缴纳，请不要重复缴费党费";
                    }
                }
            }else{
                errorMessage = "党费已缴纳完毕，当前没有需要缴纳的党费";
            }
            throw new BaseException(errorMessage);
        }
        /** 判断金额不等是否需要返回，不生成订单 **/
        if (money.compareTo(payAmount) != 0) {
            throw new BaseException("订单金额存在变动，请刷新后重新生成订单");
        }
        if(otherPayMoney != null){
            payAmount = payAmount.add(otherPayMoney);//加上额外缴纳的金额
        }
        //订单表数据
        final Record orderRecord = new Record();
        String orderNumber = order.procedureOrderNumber();//生成一个订单号
        String orderKey = ObjectUtil.getUUID();
        orderRecord.set("key", orderKey)
                .set("fee_order", orderNumber)
                .set("pay_money", payAmount)
                .set("order_type", payerKey.equals(memKey) ? 2 : 1)//[1是个人交纳,2是代交]
                .set("merchant_id", PropKit.use("common.properties").get("merchantId"))
                .set("status", "0")//默认为未支付
                .set("pay_type", payType)
                .set("pay_time", nowTime)
                .set("creator_key", payerKey)
                .set("create_time", nowTime)
                .set("_id",ObjectUtil.getUUID());
        //获取人员基本信息
        Record memInfo = order.getMemInfoRecord();
        Map<String, Object> columns = memInfo.getColumns();
        for (String key : columns.keySet()) {
            if ("org_key".equals(key)) {
                continue;//订单表不存入org_key
            }
            orderRecord.set(key, memInfo.get(key));
        }
        //生成订单详情数据
        final List<Record> detailRecords = new ArrayList<>();
        final Map<String, Map<String, Object>> standardMap = order.getStandardMap();//党费标准信息
        boolean otherPayswitch = otherPayMoney != null && otherPayMoney.compareTo(new BigDecimal(0)) > 0;
        for (Integer year : payDataMap.keySet()) {
            List<Integer> list = payDataMap.get(year);
            for (int month : list) {
                //判断是否有重复的订单
                if(payOrderDateMap.get(year+"-"+month) != null){
                    String errorMessage = "";
                    if(payOrderDateMap.get(year+"-"+month) == 1){
                        errorMessage = year+"年"+month+"月正在缴费处理中，不能再次下订单";
                    }else{
                        errorMessage = year+"年"+month+"月已缴纳党费，不能再次下订单";
                    }
                    throw new BaseException(errorMessage);
                };
                Record orderDetailRecord = new Record();
                orderDetailRecord.set("key", ObjectUtil.getUUID())
                        .set("order_key", orderKey)
                        .set("pay_money", standardMap.get(year + "-" + month).get("money"))
                        .set("pay_time", nowTime)
                        .set("status", 0)//默认为未支付
                        .set("order_type", (payerKey.equals(memKey) ? "2" : "1") + orderType)
                        .set("merchant_id", PropKit.use("common.properties").get("merchantId"))
                        .set("fee_base", standardMap.get(year + "-" + month).get("fee_base"))
                        .set("pay_type", payType)
                        .set("fee_year", year)
                        .set("fee_month", month)
                        .set("standard_scale", standardMap.get(year + "-" + month).get("standard_scale"))
                        .set("creator_key", payerKey)
                        .set("create_time", nowTime)
                        .set("_id",ObjectUtil.getUUID());
                for (String key : columns.keySet()) {
                    if ("job_code".equals(key)) {//详情表不存入job_code
                        continue;
                    }
                    orderDetailRecord.set(key, memInfo.get(key));
                }
                detailRecords.add(orderDetailRecord);
                if (otherPayswitch) {//如果存在额外缴费，创建一个订单详情记录
                    Record otherPay = new Record();
                    for (String key : orderDetailRecord.getColumns().keySet()) {
                        otherPay.set(key, orderDetailRecord.get(key));
                    }
                    otherPay.set("key", ObjectUtil.getUUID())
                            .set("order_type", 3)//order_type为3代表额外缴纳
                            .set("pay_money", otherPayMoney)
                            .set("_id",ObjectUtil.getUUID());
                    detailRecords.add(otherPay);
                    otherPayswitch = false;//关闭开关，只记录一次
                }
            }
        }
        boolean result = Db.tx(new IAtom() {
            @Override
            public boolean run() throws SQLException {
                boolean orderResult = Db.save("ccp_fee_order", orderRecord);
                int[] orderDetail = Db.batchSave("ccp_fee_order_detail", detailRecords, detailRecords.size());
                if (orderDetail.length != detailRecords.size() || !orderResult) {
                    return false;
                }
                return true;
            }
        });
        if (!result) {
            throw new BaseException("生成订单异常");
        }
        //组装返回数据
        Map<String, Object> resultMap = new HashMap<>();
        resultMap.put("money", payAmount);//需要支付的总金额
        resultMap.put("fee_order", orderNumber);//订单号
        resultMap.put("list", order.getResultOrderDateMap());
        return resultMap;
    }

    @Override
    public Map<String, String> getAdminPhone(String memKey) {
        Map<String, String> data = new HashMap<>();
        String sql = "select org_code from ccp_mem where `key` = ? and delete_time = 0";
        Record record = Db.use(JIANGSU_CONFIG).findFirst(sql, memKey);
        sql = "select secretary_key from ccp_org where org_code = ?";
        record = Db.use(JIANGSU_CONFIG).findFirst(sql, record.get("org_code"));
        sql = "select phone from ccp_mem where `key` = ?";
        record = Db.use(JIANGSU_CONFIG).findFirst(sql, record.get("secretary_key"));
        data.put("phone", record.getStr("phone"));
        return data;
    }

    @Override
    public boolean complatePayCallback4WeChat(String feeOrder, String complateTime, String wechatOrder,BigDecimal payMoney,int retryIndex) {
        //根据订单号和金额匹配订单
        String sql = "select `key`,`status`,pay_time from ccp_fee_order where fee_order = ? and pay_money = ? and delete_time = 0";
        Record order = Db.use(JIANGSU_CONFIG).findFirst(sql, feeOrder, payMoney);
        if("3".equals(order.getStr("status"))){
            return true;//如果订单已经完成，直接返回
        }
        String orderKey = order.get("key");
        String payTime = order.getStr("pay_time");//支付时间，订单完成加入mem表
        //查询订单详情
        String detailSql= "select fee_year,fee_month,pay_money,mem_key from ccp_fee_order_detail where " +
                " order_key = ? and delete_time = 0 and order_type != 3";
        List<Record> detailRecord = Db.use(JIANGSU_CONFIG).find(detailSql, orderKey);
        List<Record> updateMemList = new ArrayList<>();//用于修改mem表的集合
        Map<String,Map<String,Map<String,BigDecimal>>> feeMap = new HashMap<>();//用于修改fee表的集合
        for (Record record:detailRecord) {
            Record mem = new Record();
            mem.set("key",record.getStr("mem_key"))
            .set("last_pay_date",payTime);
            updateMemList.add(mem);
            Map<String,Map<String,BigDecimal>> yearMap = feeMap.get(record.getStr("mem_key"));//获取当前人员缴纳记录的年、月
            if(yearMap == null){//如果不存在，则创建年份map，并存入
                yearMap = new HashMap<>();
                feeMap.put(record.getStr("mem_key"),yearMap);
            }
            Map<String,BigDecimal> monthMap = yearMap.get(record.getStr("fee_year"));//获取缴纳的月份集合
            if(monthMap == null){//如果不存在月份list，则创建并存入
                monthMap = new HashMap<>();
                yearMap.put(record.getStr("fee_year"),monthMap);
            }
            monthMap.put(record.getStr("fee_month"),record.getBigDecimal("pay_money"));
        }
        //修改fee记录，批量修改的字段不一样会造成数据丢失，不能使用批处理修改
        List<String> sqlList = new ArrayList<>();//需要修改fee表记录的sql
        for (String memKey:feeMap.keySet()) {
            String updateSql = "update ccp_fee set ";
            Map<String, Map<String,BigDecimal>> yearMap = feeMap.get(memKey);//年份集合
            for (String year:yearMap.keySet()) {
                Map<String,BigDecimal> monthMap= yearMap.get(year);//月集合
                StringBuffer paidColumn = new StringBuffer();//交费金额
                StringBuffer paidTimeColumn = new StringBuffer();//交费时间
                StringBuffer standardColumn = new StringBuffer();//交费标准
                for (String month:monthMap.keySet()) {
                    paidColumn.append(" paid"+month+" = "+monthMap.get(month)+",");
                    paidTimeColumn.append(" paid_time"+month +" = '"+payTime+"',");
                    standardColumn.append(" standard"+month+">0 and ");//针对有转移组织的人员确定修改记录
                }
                paidTimeColumn.deleteCharAt(paidTimeColumn.length()-1);//删除最后一个逗号
                String updateFeeSql= updateSql+paidColumn+paidTimeColumn+" where mem_key = '"+memKey+"' and "+standardColumn+" delete_time = 0";
                sqlList.add(updateFeeSql);
            }
        }
        boolean result = Db.tx(new IAtom() {
            @Override
            public boolean run() throws SQLException {
                //修改订单
                String orderSql = "update ccp_fee_order set weixin_order = ?,bank_callback_time = ?,status=3 where fee_order = ?";
                int orderRow = Db.use(JIANGSU_CONFIG).update(orderSql, wechatOrder, complateTime, feeOrder);
                if(orderRow < 1){
                    return false;
                }
                //修改订单详情
                String detailSql = "update ccp_fee_order_detail set status = 3,bank_callback_time=? where order_key=?";
                int detailRow = Db.use(JIANGSU_CONFIG).update(detailSql, complateTime, orderKey);
                if(detailRow < 1){
                    return false;
                }
                //修改mem表上次缴纳时间
                int[] memUpdateRow = Db.use(JIANGSU_CONFIG).batchUpdate("ccp_mem", "key", updateMemList, updateMemList.size());
                if(memUpdateRow.length < 1){
                    return false;
                }
                //修改fee表记录
                int[] batch = Db.use(JIANGSU_CONFIG).batch(sqlList, sqlList.size());
                return batch.length > 0;
            }
        });
        //如果未处理成功，设置定时器再次尝试
        if (!result && retryIndex > 0) {
            Timer timer = new Timer();
            timer.schedule(new TimerTask() {
                public void run() {
                    complatePayCallback4WeChat(feeOrder,complateTime,wechatOrder,payMoney,retryIndex-1);
                }
            }, 1000*60*5);//5分钟后重试
        }
        return  result;
    }

    @Override
    public Map<String, Object> getOrderByFeeOrder(String feeOrder) throws BaseException {
        String sql = "select pay_money,`key` from ccp_fee_order where  fee_order = ? and delete_time = 0 and status = 0";
        Record order = Db.use(JIANGSU_CONFIG).findFirst(sql, feeOrder);
        if(order == null){
            throw new BaseException("不存在未支付的订单编号");
        }
        //根据订单key查询订单详情
        String detailSql = "select fee_year,fee_month from ccp_fee_order_detail where order_key = ? and delete_time = 0 and status = 0 ";
        List<Record> detailList = Db.use(JIANGSU_CONFIG).find(detailSql, order.getStr("key"));
        Map<Integer,List<Integer>> detailMap = new HashMap<>();
        //循环订单详情，将年份作为key，拼接返回信息
        for (Record record:detailList) {
            int year = record.getInt("fee_year");
            List<Integer> list = detailMap.get(year);
            if(list == null){
                list = new ArrayList<>();
                detailMap.put(year,list);
            }
            list.add(record.getInt("fee_month"));
        }
        StringBuilder tempStr = new StringBuilder("您已成功缴纳");
        for (int year:detailMap.keySet()) {
            tempStr.append(year+"年");
            List<Integer> list = detailMap.get(year);
            //从最后获取月份，保持从小到大的顺序
            for (int i = list.size()-1; i > 0; i--) {
                tempStr.append(list.get(i)+"、");
            }
            tempStr.deleteCharAt(tempStr.length()-1);
            tempStr.append("月份，");
        }
        tempStr.deleteCharAt(tempStr.length()-1);
        tempStr.append("的党费");
        Map<String, Object> resultMap = new HashMap<>();
        resultMap.put("money",String.format("%.2f",order.getBigDecimal("pay_money")));
        resultMap.put("tranContent",tempStr.toString());//给用户展示的信息
        return resultMap;
    }

    @Override
    public PaidOrder getPaidOrder(String memKey,String year, String month) throws BaseException {
        Map<String, Integer> dateMap;
        try {
            dateMap = ObjectUtil.timeStrToMap(year + "-" + month, "yyyy-MM");
        } catch (ParseException e) {
            throw new BaseException("查询订单的时间类型错误");
        }
        PaidOrder order = new PaidOrder(memKey,dateMap.get("year"),dateMap.get("month"));
        order.initAll();//初始化数据
        return order;
    }


}
