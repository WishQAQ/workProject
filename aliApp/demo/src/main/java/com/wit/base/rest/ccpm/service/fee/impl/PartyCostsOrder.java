package com.wit.base.rest.ccpm.service.fee.impl;

import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Record;
import com.wit.base.rest.ccpm.utils.BaseException;
import com.wit.base.rest.ccpm.utils.ObjectUtil;
import com.wit.base.rest.ccpm.utils.ThreadUtil;

import java.math.BigDecimal;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

import static com.wit.base.rest.ccpm.config.DbConfig.JIANGSU_CONFIG;

/**
 * 党费订单
 */
public class PartyCostsOrder {
    private String memKey;//党员key
    private int year = 0;//年份
    private int month = 0;//月份

    private boolean isError = false;//执行多线程返回的错误信息
    private String errorMessage;//执行多线程返回的错误信息

    /**  数据 **/
    private Record memInfoRecord;//党员信息
    private boolean isPay = true;//上次是否缴纳
    private Map<Integer, List<Integer>> payDataMap = new HashMap<>();//支付的时间
    private BigDecimal payAmount;//支付金额
    private Map<String,Map<String,Object>> standardMap = new HashMap<>();//缴费标准
    private Map<String,Integer> payOderMap = new HashMap<>();//已创建未完成的订单
    private BigDecimal inPaymentMoney = new BigDecimal(0);//在支付中的金额
    private String startTime;//订单开始时间


    public PartyCostsOrder(String memKey, int year,int month){
        this.memKey = memKey;
        this.year = year;
        this.month = month;
    }

    public PartyCostsOrder(String memKey){
        this.memKey = memKey;
    }

    /**
     * 初始化费用
     */
    public void initCosts() throws BaseException {
        //判断上个月是否缴纳,存在指定缴费才查询
        ThreadUtil getPreviousTimeIsPay = null;
        if(year !=0 && month !=0){
            getPreviousTimeIsPay = new ThreadUtil(this,"getPreviousTimeIsPay");
            getPreviousTimeIsPay.start();
        }
        //初始化党员信息
        ThreadUtil initMemInfo = new ThreadUtil(this,"initMemInfo");
        initMemInfo.start();
        //初始化未完成的订单
        ThreadUtil initPayDetailInfo = new ThreadUtil(this,"initPayDetailInfo");
        initPayDetailInfo.start();

        //初始化支付信息
        try{
            initPayInfo();
        }catch (Exception e){
            String message = "生成订单错误，初始化支付信息发生错误";
            if(e instanceof BaseException){
                message = ((BaseException)e).getMessage();
            }
            throw  new BaseException(message);
        }
        try{
            if(getPreviousTimeIsPay!=null)getPreviousTimeIsPay.join();
            initMemInfo.join();
            initPayDetailInfo.join();
        }catch (Exception e){
            throw  new BaseException("生成订单，初始化费用异常");
        }
        if(isError){//初始化时出现异常，抛出
            String message = this.errorMessage == null?"初始化信息异常":this.errorMessage;
            throw new BaseException(message);
        }
    }

    /**
     * 判断上个月是否缴纳
     */
    public boolean getPreviousTimeIsPay() throws BaseException {
        boolean reulst = false;
        BigDecimal standard ;
        int month = this.month;
        int year = this.year;
        //如果要缴纳的月份为1月，则查询去年12的信息
        if(month == 1){
            year = year -1;
            month = 12;

        }else{
            month--;
        }
        BigDecimal bigDecimal = getNowPayAmount(memKey,year,month,false);
        //如果上个月的金额是空或者等于0则表示已缴纳
        if(bigDecimal == null || bigDecimal.doubleValue() == 0){
            reulst = true;
        }
        isPay = reulst;
        return  reulst;
    }

    /**
     * 初始化支付信息
     */
    public void initPayInfo() throws ParseException, BaseException {
        String startTime;
        String endTime;
        if(year != 0 && month != 0){//存在月和年，只缴纳指定的时间
            payAmount = getNowPayAmount(memKey, year, month,true);
            if(payAmount == null){
                throw new BaseException(year+"年"+month+"月未设置党费标准，请联系管理员设置党费缴纳标准");
            }
            Map<Integer,Object> map = new HashMap<>();
            List<Integer> list = new ArrayList<>();
            list.add(month);
            payDataMap.put(year,list);
            endTime = startTime = year+"-"+(month>9?month:"0"+month);
        }else{
            PartyCostsInfo costsInfo = new PartyCostsInfo(memKey);//未指定时间，获取所有未缴纳的费用
            costsInfo.initLastPayTime();//初始化上次缴纳时间，连带生成费用信息
            //获取是否有月份未设置缴费标准，如果有，不能生成订单
            Map<String, List<Integer>> noStandardMap = costsInfo.getNoStandardMap();
            if(noStandardMap.size() > 0){
                StringBuffer message = new StringBuffer("以下月份未设置缴费标准：");
                for (String year:noStandardMap.keySet()) {
                    List<Integer> monthList = noStandardMap.get(year);
                    message.append(year+"年");
                    for (int month:monthList) {
                        message.append(month+"、");
                    }
                    message.deleteCharAt(message.length()-1).append("月，");
                }
                message.append("请联系管理员设置党费标准再缴纳以上党费");
                throw new BaseException(message.toString());
            }
            payDataMap = costsInfo.getUnpaidDataMap();//获取未缴纳的时间集合
            payAmount = costsInfo.getUnpaidMoney();//获取未支付的金额
            startTime = costsInfo.getPayStartTime();
            endTime = costsInfo.getPayEndTime();
        }
        this.startTime = startTime;
        initStandard(startTime,endTime);//初始化党费缴纳基准信息
    }

    /**
     * 得到本次需要缴纳的金额
     * @param memKey 人员key
     * @param year 查询的年
     * @param month 查询的月
     * @param isInspect 是否监管是否设置党费标准，查询上月是否缴费如果为空，不管，
     * @return
     * @throws BaseException
     */
    public BigDecimal getNowPayAmount(String memKey, int year, int month,boolean isInspect) throws BaseException {
        String sql = "select sum(if(standard"+month+" > 0 and (paid_time"+month+" is null or paid_time"+month+" = ''),standard"+month+",0)) standard " +
                ",count(standard"+month+" is null or null) no_standard from ccp_fee where mem_key = ? and  delete_time = 0 and status = 0 " +
                "and year = ? group by year";
        Record record = Db.use(JIANGSU_CONFIG).findFirst(sql, memKey, year);
        if(record == null){
            return null;
        }
        //判断当前月是否设置党费标准
        if(record.getInt("no_standard") > 0 && isInspect){
            throw new BaseException("请联系管理员设置党费标准后再缴纳党费");
        }
        return record.getBigDecimal("standard");
    }



    /**
     * 初始化党员信息
     */
    public Record initMemInfo(){
        String sql = "select `key` mem_key,name mem_name,job_code,org_code from ccp_mem where `key` = ?";
        memInfoRecord = Db.use(JIANGSU_CONFIG).findFirst(sql,memKey);
        String orgSql = "select name,zb_code,org_code,`key` from ccp_org where org_code = ?";
        Record orgRecord = Db.use(JIANGSU_CONFIG).findFirst(orgSql, memInfoRecord.getStr("org_code"));
        memInfoRecord.set("org_name",orgRecord.getStr("name"));
        memInfoRecord.set("org_zb_code",orgRecord.getStr("zb_code"));
        memInfoRecord.set("org_key",orgRecord.getStr("key"));
        return memInfoRecord;
    }

    /**
     * 初始化党费基准
     */
    public Map<String,Map<String,Object>> initStandard(String startTime,String endTimes) throws ParseException {
        String sql = "select fee_base,standard_scale,case paid_type when 1 then '按标准交纳' when 2 then '按工资比例' when 3 then '少交党费' when 4 then '免交党费' end paid_type " +
                ",start_date,end_date,money from ccp_fee_standard where mem_key = ? and status = 1 " +
                "and ((? BETWEEN start_date and end_date) or (? BETWEEN start_date and end_date))";
        List<Record> recordList = Db.use(JIANGSU_CONFIG).find(sql, memKey,startTime,endTimes);
        for (Record record:recordList) {
            Map<String,Integer> startDate = ObjectUtil.timeStrToMap(record.getStr("start_date"),"yyyy-MM");
            Map<String,Integer> endDate = ObjectUtil.timeStrToMap(record.getStr("end_date"),"yyyy-MM");
            int startYear = startDate.get("year");
            int endYear = endDate.get("year");
            //将不是当前年份的先存入map中
            for (int i = startYear; i < endYear; i++) {
                for (int j = startDate.get("month"); j <= 12; j++) {
                    Map<String,Object> map = new HashMap<>();
                    map.put("fee_base", record.getBigDecimal("fee_base"));
                    map.put("standard_scale", record.getBigDecimal("standard_scale"));
                    map.put("paid_type", record.getStr("paid_type"));
                    map.put("money", record.getStr("money"));
                    standardMap.put(i+"-"+j,map);//年+-+月作为key
                }
            }
            //计算结束年月份
            for (int i = 1; i <= endDate.get("month"); i++) {
                Map<String,Object> map = new HashMap<>();
                map.put("fee_base", record.getBigDecimal("fee_base"));
                map.put("standard_scale", record.getBigDecimal("standard_scale"));
                map.put("paid_type", record.getStr("paid_type"));
                map.put("money", record.getStr("money"));
                standardMap.put(endDate.get("year")+"-"+i,map);//年+-+月作为key
            }
        }
        return  standardMap;
    }

    /**
     * 获取订单缴纳的年月，返回信息
     * @return
     */
    public List<Map<String,Object>> getResultOrderDateMap(){
        List<Map<String,Object>> list = new ArrayList<>();
        for (int year:payDataMap.keySet()) {
            Map<String,Object> baseMap= new HashMap<>();
            baseMap.put("year",year);
            List<Integer> months = payDataMap.get(year);
            List<Map<String,Object>> resultMonthsList = new ArrayList<>();
            for (int month:months) {
                //将年-月组合，获取标准信息
                Map<String,Object> childrenMap= standardMap.get(year+"-"+month);
                childrenMap.put("month",month);
                resultMonthsList.add(childrenMap);
            }
            baseMap.put("months",resultMonthsList);
            list.add(baseMap);
        }
        return list;
    }

    /**
     * 初始化支付信息，查询在缴费中和已完成的月份
     */
    public Map<String,Integer> initPayDetailInfo() throws BaseException {
        String tempSqlStr = "";
        if(year != 0 && month != 0){
            tempSqlStr = " and fee_year = ? and fee_month = ?";
        }
        String sql = "select fee_year,fee_month,`status`,pay_money from ccp_fee_order_detail where mem_key = ?  and order_type != 3 " +
                "and status in(1,3)  and delete_time = 0 "+tempSqlStr;
        List<Record> records;
        //判断是否缴纳的是指定月份
        if("".equals(tempSqlStr)){
            records = Db.use(JIANGSU_CONFIG).find(sql, memKey);
        }else{
            records = Db.use(JIANGSU_CONFIG).find(sql, memKey,year,month);
        }
        for (Record record:records) {
            //将年-月作为key，方便取值
            payOderMap.put(record.getInt("fee_year")+"-"+record.getInt("fee_month"),Integer.parseInt(record.getStr("status")));
            if("1".equals(record.getStr("status"))){//如果为支付中的金额，记录
                inPaymentMoney = inPaymentMoney.add(record.getBigDecimal("pay_money"));
            }
        }
        return payOderMap;
    }

    /**
     * 获取一个订单号
     * @return
     */
    public String procedureOrderNumber(){
        SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddHHmmss");
        Calendar calendar = Calendar.getInstance();
        String orderNumber = sdf.format(calendar.getTime());
        String random=Math.round((Math.random()*10000000))+"";//生成一千万以内的随机整数
        StringBuffer str = new StringBuffer();
        for (int i = 0; i < random.length(); i++) {
            str.append(0);
        }
        random = str+random;
        return orderNumber+random;
    }

    public Record getMemInfoRecord() {
        return memInfoRecord;
    }

    public Map<Integer, List<Integer>> getPayDataMap() {
        //将订单中的日期剔除掉
        for (int year:payDataMap.keySet()) {
            List<Integer> list = payDataMap.get(year);
            for (int i = 0;i<list.size();i++) {
                //如果存在订单表中，且状态为支付成功，不生成订单,剔除掉
                if(payOderMap.get(year+"-"+list.get(i))!=null && payOderMap.get(year+"-"+list.get(i)) == 1){
                    list.remove(i);
                    i--;
                }
            }
        }
        return payDataMap;
    }

    public BigDecimal getPayAmount() {
        return payAmount;
    }

    public Map<String, Map<String, Object>> getStandardMap() {
        return standardMap;
    }

    public boolean isPay() {
        return isPay;
    }

    public Map<String, Integer> getPayOderMap() {
        return payOderMap;
    }

    public BigDecimal getInPaymentMoney() {
        return inPaymentMoney;
    }

    /**
     * 多线程工具类通过此方法反馈是否发生异常
     */
    public void setErrorStatus(String errorMessage) {
        this.isError = true;
        this.errorMessage = errorMessage;
    }
}
