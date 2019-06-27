package com.wit.base.rest.ccpm.service.fee.impl;

import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Record;
import com.wit.base.rest.ccpm.utils.BaseException;
import com.wit.base.rest.ccpm.utils.ObjectUtil;
import com.wit.base.rest.ccpm.utils.ThreadUtil;
import org.apache.log4j.Logger;

import java.math.BigDecimal;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

import static com.wit.base.rest.ccpm.config.DbConfig.JIANGSU_CONFIG;

/**
 * 党费缴纳信息
 */
public class PartyCostsInfo {
    private Logger log = Logger.getLogger(PartyCostsInfo.class);


    /** 参数 **/
    private String memKey;
    private String year;
    private int month;

    private boolean isError = false;//执行多线程返回的错误信息
    private String errorMessage;//执行多线程返回的错误信息

    /** 结果值 **/
    private Map<String, Object> otherPayMap;//额外支付
    private Map<String, Object> payInfoMap;//支付信息
    private Record feeRecord;//基础信息
    private boolean havaStandard4Year;//是否存在缴费标准,年度
    private Map<String,Object> baseMap = new HashMap<>();//装载的结果,返回结果
    private String lastPaytime;//上次缴费时间
    private int unpaidSum;//连续未缴纳月数
    private BigDecimal unpaidMoney;//连续未缴纳总金额
    private Map<Integer, List<Integer>> unpaidDataMap = new HashMap<>();//支付的时间
    private String payStartTime = null;//开始支付时间
    private String payEndTime = null;//结束缴费时间
    private Map<String,Integer> payOrderMap = new HashMap<>();//已创建未完成的订单
    private BigDecimal inPaymentMoney = new BigDecimal(0);//在支付中的金额
    private Map<String,List<Integer>> noStandardMap = new HashMap<>();//为设置标准的月份
    private int unExceedNumber = 0;//未超越人数
    private int needPayCount = 0;//需要支付的总人数

    public PartyCostsInfo(String memKey,String year){
        Calendar now = Calendar.getInstance();
        if(ObjectUtil.stringIsEmpty(year)){
            year = now.get(Calendar.YEAR)+"";
        }
        this.month = now.get(Calendar.MONTH)+1;
        this.memKey = memKey;
        this.year = year;
    }

    public PartyCostsInfo(String memKey){
        this.memKey = memKey;
    }


    /**
     * 初始化所以值
     */
    public void initAll() throws BaseException {
        //额外费用
        ThreadUtil initOtherPayMoney = new ThreadUtil(this,"initOtherPayMoney");
        initOtherPayMoney.start();
        //支付信息
        ThreadUtil initPayInfo = new ThreadUtil(this,"initPayInfo");
        initPayInfo.start();
        //上次缴费时间
        ThreadUtil initLastPayTime = new ThreadUtil(this,"initLastPayTime");
        initLastPayTime.start();
        //初始化未完成的订单
        PartyCostsOrder costsOrder = new PartyCostsOrder(memKey);
        ThreadUtil initPayDetailInfo = new ThreadUtil(costsOrder,"initPayDetailInfo");
        initPayDetailInfo.start();
        //初始化是否设置标准
        ThreadUtil initHaveStandard = new ThreadUtil(this,"initHaveStandard");
        initHaveStandard.start();
        initFee();//初始化费用基础信息
        try{
            initOtherPayMoney.join();
            initPayInfo.join();
            initLastPayTime.join();
            initPayDetailInfo.join();
            initHaveStandard.join();
        }catch (Exception e){
            log.error("等待子线程异常",e);
        }
        //将订单中未处理的订单取出
        payOrderMap = costsOrder.getPayOderMap();
        inPaymentMoney = costsOrder.getInPaymentMoney();
        ThreadUtil computePaidSpend = null;
        if(!ObjectUtil.stringIsEmpty(lastPaytime)){
            try {
                Map<String, Integer> date = ObjectUtil.timeStrToMap(lastPaytime, "yyyy-MM-dd HH:mm:ss");
                //如果最后缴纳时间为当前时间，且未缴纳金额为0，党费已缴纳完成，计算完成速度
                if(date.get("year") == ObjectUtil.getNowYear() && date.get("month") == ObjectUtil.getNowMonth() && this.unpaidMoney.doubleValue() == 0){
                    computePaidSpend = new ThreadUtil(this,"computePaidSpend");
                    computePaidSpend.start();
                }
            } catch (ParseException e) {
                log.error("转换最后缴纳时间格式错误",e);
            }
        }
        try{
            processing();//处理数据
            if(computePaidSpend!=null) computePaidSpend.join();
        }catch (Exception e){
            log.error("处理缴费信息异常",e);
            throw new BaseException("初始化错误，处理缴费信息异常");
        }

        if(isError){//初始化时出现异常，抛出
            String message = this.errorMessage == null?"初始化信息异常":this.errorMessage;
            throw new BaseException(message);
        }
    }

    /**
     * 计算缴费完成速度
     */
    public void computePaidSpend() throws BaseException {
        //查询获取未超过人数
        ThreadUtil initNoExceedNumber = new ThreadUtil(this,"initNoExceedNumber");
        initNoExceedNumber.start();
        initNeedPayCount();//获取需要缴纳党费的总人数
        try {
            initNoExceedNumber.join();
        }catch (Exception e){
            log.error("计算超过人数等待子线程错误",e);
            throw new BaseException("计算缴费速度异常");
        }
        int exceedNumber = this.needPayCount - this.unExceedNumber;
        double spend = (double) exceedNumber/this.needPayCount;
        baseMap.put("complateSpend",String.format("%.2f", spend*100));//返回百分比
    }

    /**
     * 获取未超过人数
     * @return
     */
    public int initNoExceedNumber(){
        //获取未超过的人数
        String sql = "select count(1) count from( select max(paid_time"+ObjectUtil.getNowMonth()+") paid_time," +
                "mem_name count from ccp_fee where year = ? and delete_time = 0 " +
                "and status = 0  group by mem_key)t1 where  paid_time <= ?  ";
        int count = Db.use(JIANGSU_CONFIG).findFirst(sql,ObjectUtil.getNowYear(),this.lastPaytime).getInt("count");
        this.unExceedNumber = count;
        return count;
    }

    /**
     * 获取需要缴纳党费的总人数
     * @return
     */
    public int initNeedPayCount(){
        int month = ObjectUtil.getNowMonth();
        String sql = "select count(1) count from( select max(standard"+month+") standard from ccp_fee where " +
                "year = ? and delete_time = 0 and status = 0 group by mem_key)t1 where standard > 0";
        int count = Db.use(JIANGSU_CONFIG).findFirst(sql,ObjectUtil.getNowYear()).getInt("count");
        this.needPayCount = count;
        return count;
    }

    /**
     *  判断是有设置标准
     */
    public void initHaveStandard(){
        String sql = "select count(1) count from ccp_fee where mem_key = ? and year = ? and status = 0 and delete_time = 0";
        Record record = Db.use(JIANGSU_CONFIG).findFirst(sql,memKey,year);
        this.havaStandard4Year = record.getInt("count")>0;
    }

    /**
     * 初始化费用基础信息
     */
    public Record initFee(){
        Calendar now = Calendar.getInstance();
        StringBuffer standardColumns = new StringBuffer();
        StringBuffer paidTimeCoulums = new StringBuffer();
        StringBuffer noStandardColumns = new StringBuffer();//统计当前月是否有标准
        Calendar calendar = Calendar.getInstance();
        int month = calendar.get(Calendar.YEAR) == Integer.parseInt(year)?this.month:12;//如果当前年等于传入的年份，只查询到当前月为止
        for (int i = 1; i <= month; i++) {
            standardColumns.append("sum(if(standard"+i+" > 0,standard"+i+",0)) standard"+i+",");
            paidTimeCoulums.append("max(paid_time"+i+" ) paid_time"+i+" ,");
            noStandardColumns.append("count(standard"+i+" is null or null) no_standard"+i+",");
        }
        String sql = "select " +standardColumns+paidTimeCoulums+noStandardColumns+
                "org_code,mem_key" +
                " from ccp_fee where mem_key = ? and year = ? and delete_time = 0 and status = 0 ORDER BY mem_key";
        feeRecord = Db.use(JIANGSU_CONFIG).findFirst(sql,memKey,year);
        return feeRecord;
    }


    /**
     * 初始化额外缴纳的费用
     */
    public Map<String,Object> initOtherPayMoney(){
        String sql = "select fee_month,pay_money from ccp_fee_order_detail where order_type = '3' and mem_key = ? and fee_year = ? and status = 3";
        List<Record> otherPay = Db.use(JIANGSU_CONFIG).find(sql,memKey, year);
        otherPayMap = ObjectUtil.recordToMapAloneValue(otherPay, "fee_month", "pay_money");
        return otherPayMap;
    }

    /**
     * 初始化正常缴纳党费的信息
     */
    public Map<String,Object> initPayInfo(){
        String sql = "select fee_month month,pay_money money,pay_type from ccp_fee_order_detail where mem_key = ? and order_type != '3' and fee_year = ?  and status = 3";
        List<Record> otherPay = Db.use(JIANGSU_CONFIG).find(sql, memKey,year);
        payInfoMap = ObjectUtil.recordToMapMultipleValue(otherPay, "month");
        return payInfoMap;
    }

    /**
     * 初始化上次支付时间
     */
    public String initLastPayTime(){
        String sql = "select last_pay_date from ccp_mem where `key` = ? and delete_time = 0";
        Record record = Db.use(JIANGSU_CONFIG).findFirst(sql, memKey);
        lastPaytime = record.getStr("last_pay_date");
        initUnpaidInfo();//初始化未缴纳的总金额、连续月
        return lastPaytime;
    }

    /**
     * 处理数据
     */
    public void processing() throws ParseException, BaseException {
        //将额外支付的信息装载入支付信息
        for (String key:otherPayMap.keySet()) {
            Map<String,Object> map = (Map<String, Object>) payInfoMap.get(key);
            map.put("other_pay_money",otherPayMap.get(key));
        }
        List<Map<String,Object>> alreadyPaidList = new ArrayList<>();
        List<Map<String,Object>> unpaidList = new ArrayList<>();
        Calendar calendar = Calendar.getInstance();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        Map<String,Object> map;
        int month = calendar.get(Calendar.YEAR) == Integer.parseInt(year)?this.month:12;
        if(this.havaStandard4Year){
            for (int i = month; i >= 1 ; i--) {
                int isPay = 0;//默认为未缴纳
                String paid_time = feeRecord.getStr("paid_time" + i);
                //已经支付的月份数据处理
                if(!ObjectUtil.stringIsEmpty(paid_time)){
                    isPay = 1;//设置为已缴纳
                    int is_delay = 0;//默认为未延期
                    map = (Map<String, Object>) payInfoMap.get(i+"");
                    if(map == null){//支付信息丢失
                        log.error("支付信息丢失，人员key:"+memKey+"年份:"+year+"月份:"+i);
                        map = new HashMap<>();//数据丢失，防止初始化异常
                    }
                    try{
                        calendar.setTime(sdf.parse(paid_time));
                        //如果当前月等于缴费的月份，则不是补缴
                        if((i < calendar.get(Calendar.MONTH)+1 && calendar.get(Calendar.YEAR) == Integer.parseInt(year))
                                ||calendar.get(Calendar.YEAR) > Integer.parseInt(year)){
                            is_delay = 1;//延期
                        }
                    }catch (Exception e){
                        log.error("转换支付时间错误",e);
                        throw new BaseException("转换支付时间错误");
                    }
                    map.put("is_delay",is_delay);
                    map.put("pay_date",paid_time);//党费缴纳的时间
                }else{
                    map = new HashMap<>();
                }
                //设置基础数据
                map.put("month",i);//月
                map.put("money",feeRecord.getBigDecimal("standard"+i).toString());//党费缴纳金额
                boolean havaStandard = true;//默认为已设置标准
                //查看当前月是否有设置标准
                if(feeRecord.getInt("no_standard"+i) > 0 && feeRecord.getDouble("standard"+i) == 0){
                    havaStandard = false;//未设置标准
                }
                map.put("havaStandard",havaStandard);
                //判断当前年月是否存在未完成的订单
                if(payOrderMap.get(year+"-"+i) != null){
                    map.put("is_pay", payOrderMap.get(year+"-"+i)+1);//订单状态1为支付成功，3为订单完成(银行已到账) 累加1，避免和缴纳状态重合
                }else{
                    map.put("is_pay",isPay);//设置缴纳状态
                }
                if(isPay == 1){
                    alreadyPaidList.add(map);
                }else{
                    unpaidList.add(map);
                }
            }
        }
        String last_pay_time = "";
        if(!ObjectUtil.stringIsEmpty(lastPaytime)){
            Date date = sdf.parse(lastPaytime);
            SimpleDateFormat sdf1 = new SimpleDateFormat("yyyy年MM月dd日");
            last_pay_time = sdf1.format(date);
        }
        List<Map<String,Object>> sortUnpaidList = new ArrayList<>();//将未缴纳的日期集合倒序
        //未缴纳集合排序，倒序
        for (int i = unpaidList.size()-1; i >= 0 ; i--) {
            sortUnpaidList.add(unpaidList.get(i));
        }
        //判断党费是否已缴纳完成
        int isPaidComplate = 0;//默认为未完成
        if(!ObjectUtil.stringIsEmpty(this.lastPaytime)){
            Map<String, Integer> date = ObjectUtil.timeStrToMap(this.lastPaytime, "yyyy-MM-dd HH:mm:ss");
            if(unpaidMoney.doubleValue() == 0 && unpaidSum == 0 &&
                    date.get("year") == ObjectUtil.getNowYear() && date.get("month") == ObjectUtil.getNowMonth()){
                isPaidComplate = 1;//党费已缴纳完成

           }
        }
        baseMap.put("isPaidComplate",isPaidComplate == 1);//党费是否缴纳完成 0未完成，1完成
        baseMap.put("year",year);
        baseMap.put("last_pay_time",last_pay_time);
        baseMap.put("continuity_unpaid",unpaidSum);
        baseMap.put("count_money",String.format("%.2f", unpaidMoney));
        baseMap.put("in_payment_money",String.format("%.2f", inPaymentMoney));//在付款中的金额
        baseMap.put("alreadyPaidList",alreadyPaidList);//已经支付
        baseMap.put("unpaidList",sortUnpaidList);//未支付
        baseMap.put("havaStandard",this.havaStandard4Year);//是否设置标准
    }

    /**
     * 初始化未缴纳的信息,连续未缴纳的月，连续未缴纳的金额总数
     */
    public Map<String,Object> initUnpaidInfo(){
        String lastPayYearAndMonth = "";
        //查询上次支付的月份和年份
        String detailSql = "select fee_year,fee_month from ccp_fee_order_detail where mem_key = ? " +
                " and delete_time = 0 and status = 3 and order_type != 3  order by fee_year,fee_month desc limit 1";
        Record detailRecord = Db.use(JIANGSU_CONFIG).findFirst(detailSql, memKey);
        if(detailRecord != null){
            lastPayYearAndMonth = detailRecord.get("fee_year")+"-"+detailRecord.get("fee_month");
        }
        Map<String,Object> data = new HashMap<>();
        //判断上次缴纳时间是否为空，为空则查询全部记录，不为空则查询上次缴纳截止的数据
        BigDecimal unpaidMoney = new BigDecimal(0);//未缴纳金额总数
        int unpaidSum = 0;//连续未缴纳月数
        String condition = "";
        try {
            //如果订单详情有上次缴纳的信息，查询之以这个时间点开始的数据
            Map<String, Integer> date = ObjectUtil.timeStrToMap(lastPayYearAndMonth, "yyyy-MM");//将缴费的年-月转为时间
            int queryYear = date.get("month")==12?date.get("year")+1:date.get("year");//如果上次缴纳的信息是12月，查询时间从第二年开始
            condition = ObjectUtil.stringIsEmpty(lastPayYearAndMonth)?"":" and year >= "+queryYear;
        } catch (ParseException e) {
            log.error("转换上次缴纳时间格式错误",e);
        }
        StringBuffer columns = new StringBuffer();
        //查询是否继续累加，大于0则需要继续累加，如果之前党费未缴纳，之后的月份设置为0或者未设置党费则无法累加未缴纳金额总数
        StringBuffer noStandardColumns = new StringBuffer();//未设置标准的
        StringBuffer noPayColumns = new StringBuffer();//为0不用缴纳的月
        for (int i = 1; i <= 12; i++) {
            columns.append("sum(if(standard"+i+" > 0 and paid_time"+i+" is null,standard"+i+",0)) standard"+i+",");
            noStandardColumns.append("count(standard"+i+" is null or null) no_standard"+i+",");
            noPayColumns.append("count(standard"+i+" = 0 or null) no_pay"+i+",");
        }
        String sql = "select "+columns+noStandardColumns+noPayColumns+" year from ccp_fee where mem_key = ? "+condition+" and  delete_time = 0 and status = 0 group by year order by year desc";
        List<Record> records = Db.use(JIANGSU_CONFIG).find(sql, memKey);
        Map<String, Object> unpaidRecords = ObjectUtil.recordToMapMultipleValue(records, "year");
        Calendar calendar = Calendar.getInstance();
        int nowYear = calendar.get(Calendar.YEAR);
        unpaidRecordsFor:for (String year:unpaidRecords.keySet()) {
            Map<String, Object> map = (Map<String, Object>) unpaidRecords.get(year);
            int i = 12;
            //如果是当前年，从当前月开始累计
            if((nowYear+"").equals(year)){
                i = calendar.get(Calendar.MONTH)+1;
            }
            List<Integer> unpaidList = new ArrayList<>();
            for (; i >= 1; i--) {
                if(payEndTime == null){
                    payEndTime = year+"-"+(i>9?i:"0"+i);
                }
                BigDecimal money = BigDecimal.valueOf(Double.parseDouble(map.get("standard"+i).toString()));
                int noStandard = Integer.parseInt(map.get("no_standard"+i).toString());//获取当月设置标准的个数，大于0则未设置
                int noPay= Integer.parseInt(map.get("no_pay"+i).toString());//获取党员是否不用支付
                if(noStandard > 0){
                    List<Integer> list = noStandardMap.get(year);//获取当前年份的月份集合
                    if(list == null){//如果没有当前年份的map，put入数据
                        list = new ArrayList<>();
                        noStandardMap.put(year,list);
                    }
                    list.add(i);//将月份放入list
                }
                if(money.intValue() > 0 || noStandard > 0 || noPay > 0){
                    unpaidList.add(i);//将未缴纳的月份记录进list
                    unpaidMoney = unpaidMoney.add(money);
                    unpaidSum++;
                }else{
                    //如果当前月已缴纳，不再计算
                    payStartTime = year+"-"+(i>9?i:"0"+i);
                    if(!unpaidList.isEmpty()){//结束前将未缴纳日期存入list
                        unpaidDataMap.put(Integer.parseInt(year),unpaidList);
                    }
                    break unpaidRecordsFor;
                }
            }
            if(!unpaidList.isEmpty()){
                unpaidDataMap.put(Integer.parseInt(year),unpaidList);
            }
        }//unpaidRecords for end
        data.put("unpaidSum",unpaidSum);
        data.put("unpaidMoney",unpaidMoney);
        this.unpaidSum = unpaidSum;
        this.unpaidMoney = unpaidMoney;
        return data;
    }




    public Map<Integer, List<Integer>> getUnpaidDataMap() {
        return unpaidDataMap;
    }

    public BigDecimal getUnpaidMoney() {
        return unpaidMoney;
    }

    public Map<String, Object> getBaseMap() {
        return baseMap;
    }

    public String getPayStartTime() {
        return payStartTime;
    }

    public String getPayEndTime() {
        return payEndTime;
    }

    public Map<String, Integer> getPayOrderMap() {
        return payOrderMap;
    }

    public BigDecimal getInPaymentMoney() {
        return inPaymentMoney;
    }

    public Map<String, List<Integer>> getNoStandardMap() {
        return noStandardMap;
    }

    /**
     * 多线程工具类通过此方法反馈是否发生异常
     */
    public void setErrorStatus(String errorMessage) {
        this.isError = true;
        this.errorMessage = errorMessage;
    }
}
