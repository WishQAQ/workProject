package com.wit.base.rest.ccpm.service.fee.impl;

import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Record;
import com.wit.base.rest.ccpm.utils.BaseException;
import com.wit.base.rest.ccpm.utils.ThreadUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static com.wit.base.rest.ccpm.config.DbConfig.JIANGSU_CONFIG;

/**
 * 已支付订单
 */
public class PaidOrder {
    private Logger log = LoggerFactory.getLogger(PaidOrder.class);

    private String fee_order;//订单号
    private String weixin_order;//微信订单
    private String count_money;//订单总金额
    private List<PaidDetail> paid_details = new ArrayList<>();//订单详情

    /**
     * 参数
     **/
    private int year;//年
    private int month;//月
    private String memKey;

    /** 结果值 **/
    private String orderKey;
    private List<Record> orderDtailRecordList;//详情结果
    private String beginTime;//订单开始时间yyyy-MM
    private String endTime;//订单结束时间yyyy-MM
    private Map<String, Map<String,Object>> standardMap = new HashMap<>();//党费标准数据

    public PaidOrder(String memKey,int year, int month) {
        this.year = year;
        this.month = month;
        this.memKey= memKey;
    }

    /**
     * 初始化已支付订单数据
     */
    public void initAll() throws BaseException {
        initOrderKey();//根据人员key，年月，得到订单key
        //查询得到订单详情
        ThreadUtil initPaidOrder = new ThreadUtil(this,"initPaidOrder");
        initPaidOrder.start();
        initDetail();//初始化订单详情
        try{
            initPaidOrder.join();
        }catch (Exception e){
            log.error("获取已支付订单详情异常，等待子线程出现错误",e);
            throw new BaseException("初始化订单详情错误");
        }
        //得到党费基数
        PartyCostsOrder order = new PartyCostsOrder(memKey);
        try {
            standardMap = order.initStandard(beginTime,endTime);
        }catch (Exception e){
            log.error("获取已支付订单详情异常，查询基准时间格式错误",e);
            throw new BaseException("初始化订单详情错误");
        }
        processingDetail();//处理数据
    }

    /**
     * 处理detail，转换为实体数据，取出开始和结束时间
     */
    public void processingDetail(){
        for (Record record:orderDtailRecordList) {
            int month = record.getInt("fee_month");
            int year = record.getInt("fee_year");
            PaidDetail detail = new PaidDetail();
            detail.setMoney(record.getStr("pay_money"));
            detail.setMonth(month);
            //获取党费标准
            Map<String, Object> standard = standardMap.get(year + "-" + month);
            detail.setFee_base(standard.get("fee_base")==null?null:standard.get("fee_base").toString());
            if("3".equals(record.getStr("order_type"))){
                detail.setPaid_type("额外缴纳");
            }else{
                detail.setPaid_type(standard.get("paid_type")==null?null:standard.get("paid_type").toString());
            }
            paid_details.add(detail);
        }
    }

    /**
     * 初始化订单详情
     */
    public void initDetail(){
        String sql = "select fee_year,fee_month,pay_money,order_type from ccp_fee_order_detail where " +
                " order_key = ? and status = 3 and delete_time = 0 order by fee_year,fee_month asc";
        orderDtailRecordList = Db.use(JIANGSU_CONFIG).find(sql, orderKey);
        //取出开始时间
        int beginMonth = orderDtailRecordList.get(0).getInt("fee_month");
        beginTime = orderDtailRecordList.get(0).getStr("fee_year")+"-"+(beginMonth>9?beginMonth:"0"+beginMonth);
        int size = orderDtailRecordList.size();
        //取出结束时间
        int endMonth = orderDtailRecordList.get(size-1).getInt("fee_month");
        endTime = orderDtailRecordList.get(size-1).getStr("fee_year")+"-"+(endMonth>9?endMonth:"0"+endMonth);
    }

    /**
     * 初始化订单key
     * @return
     */
    public String initOrderKey(){
        String sql = "select order_key from ccp_fee_order_detail where mem_key = ? " +
                "and fee_year = ? and fee_month = ? and status = 3 and delete_time = 0";
        Record records = Db.use(JIANGSU_CONFIG).findFirst(sql, memKey, year, month);
        String orderKey = records.getStr("order_key");
        this.orderKey = orderKey;
        return orderKey;
    }

    /**
     * 初始化订单
     */
    public void initPaidOrder(){
        String sql = "select pay_money,fee_order,pay_type,weixin_order from ccp_fee_order where `key` = ? and status = 3 and delete_time = 0";
        Record record = Db.use(JIANGSU_CONFIG).findFirst(sql, orderKey);
        this.fee_order = record.getStr("fee_order");
        this.weixin_order = record.getStr("weixin_order");
        this.count_money = record.getBigDecimal("pay_money").toString();
    }

    public String getFee_order() {
        return fee_order;
    }

    public String getCount_money() {
        return count_money;
    }

    public String getWeixin_order() {
        return weixin_order;
    }

    public List<PaidDetail> getPaid_details() {
        return paid_details;
    }

}
