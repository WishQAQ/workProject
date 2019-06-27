package com.wit.base.rest.ccpm.service.fee.impl;

import com.alibaba.fastjson.JSONObject;
import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.IAtom;
import com.jfinal.plugin.activerecord.Record;
import com.wit.base.rest.ccpm.po.CcpFee;
import com.wit.base.rest.ccpm.po.CcpFeeStandard;
import com.wit.base.rest.ccpm.service.fee.IFeeStandardService;
import com.wit.base.rest.ccpm.utils.BaseException;
import com.wit.base.rest.ccpm.utils.ObjectUtil;
import org.apache.log4j.Logger;

import java.lang.reflect.Method;
import java.math.BigDecimal;
import java.sql.SQLException;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static com.wit.base.rest.ccpm.config.DbConfig.JIANGSU_CONFIG;

public class FeeStandardServiceImpl implements IFeeStandardService {
    private Logger log = Logger.getLogger(FeeStandardServiceImpl.class);

    @Override
    public boolean addStandard(CcpFeeStandard standard) throws BaseException {
        //查询插入的日期是否重复
//        if(existsStandard(standard.getMemKey(),standard.getStartDate(),standard.getEndDate())){
//            throw new BaseException("不能对相同人员插入重复的日期");
//        }
        //获取用户的组织和用户名
        String memSql = "select org_code,name from ccp_mem where `key` = ?  and delete_time = 0";
        Record memRecord = Db.use(JIANGSU_CONFIG).findFirst(memSql, standard.getMemKey());
        String orgSql = "select name,zb_code,`key` from ccp_org where org_code = ? and delete_time = 0";
        Record orgRecord = Db.use(JIANGSU_CONFIG).findFirst(orgSql, memRecord.getStr("org_code"));
        String orgCode = memRecord.getStr("org_code");
        String memName = memRecord.getStr("name");
        if(orgRecord == null){
            throw new BaseException("该人员党组织组织不存在");
        }
        String orgName = orgRecord.getStr("name");
        String zbCode = orgRecord.getStr("zb_code");
        String orgKey = orgRecord.getStr("key");
        standard.setOrgCode(orgCode);//组织code
        standard.setMemName(memName);//人员name
        standard.setOrgName(orgName);//组织name
        standard.setOrgZbCode(zbCode);//组织code
        standard.setOrgKey(orgKey);//组织key
        standard.setKey(ObjectUtil.getUUID());
        standard.setCreateTime(ObjectUtil.getNowTimeStr());
        standard.setStatus("1");//设置状态为启用
        standard.set_id(ObjectUtil.getUUID());

        Record standardRecord = null;
        try {
            standardRecord = ObjectUtil.objectToRecord(standard);//将实体类转为Record
        } catch (BaseException e) {
            log.error(e.getMessage(),e);
            return false;
        }
        List<CcpFee> ccpFees = initCcpFee(standard);//初始化得到费用信息
        Map<String, List<Record>> feeMap = getFeeRecord(standard, ccpFees);
        return insertFee(standardRecord,feeMap.get("add"),feeMap.get("update"));
    }

    /**
     * 得到fee record
     * @param standard
     * @param ccpFees
     * @return add 添加集合，update修改集合
     */
    private Map<String,List<Record>> getFeeRecord(CcpFeeStandard standard,List<CcpFee> ccpFees) throws BaseException {
        Map<String,List<Record>> map = new HashMap<>();
        List<Record> addList = new ArrayList<>();
        List<Record> updateList = new ArrayList<>();
        Map<String, Integer> startTime;
        try {
            startTime = ObjectUtil.timeStrToMap(standard.getStartDate(), "yyyy-MM");
        } catch (ParseException e) {
            throw new BaseException("开始时间格式错误");
        }
        String sql = "select `key`,standard1,standard2,standard3,standard4,standard5,standard6 ," +
                "standard7,standard8,standard9,standard10,standard11,standard12," +
                "paid_time1,paid_time2,paid_time3,paid_time4,paid_time5,paid_time6,paid_time7," +
                "paid_time8,paid_time9,paid_time10,paid_time11,paid_time12,year,org_code,org_name " +
                "from ccp_fee where mem_key = ?  and year >= ? and delete_time = 0 ";
        List<Record> feeRecordList = Db.use(JIANGSU_CONFIG).find(sql, standard.getMemKey(), startTime.get("year"));
        //将record的一个字段提取出来作为mapkey，生成map
        Map<String, List<Record>> feeRecordMap = ObjectUtil.recordExtractKey(feeRecordList, "year");
        String orgCode = standard.getOrgCode();
        for (CcpFee fee:ccpFees) {
            List<Record> recordList = feeRecordMap.get(fee.getYear());
            Record tempRecord = ObjectUtil.objectToRecord(fee);//将实体转为Record
            if(recordList == null || recordList.isEmpty()){//如果没有一条记录，新增
                //为新增的数据则将为空的字段补齐，否则字段不一致会导致添加失败，造成数据丢失
                for (int i = 1; i <= 12; i++) {
                    if(tempRecord.get("standard"+i) == null){
                        tempRecord.set("standard"+i,null);
                    }
                }
                tempRecord.set("_id",ObjectUtil.getUUID());//es所需要的标识
                addList.add(tempRecord);
            }else if(recordList.size() == 1 && orgCode.equals(recordList.get(0).get("org_code"))){//只存在一条记录，并是当前组织
                Record feeRecord = recordList.get(0);
                for (int i = 1; i <= 12; i++) {
                    if(tempRecord.get("standard"+i) != null){
                        //判断数据库该月记录是否为-1，-1不允许修改
                        if(feeRecord.get("standard"+i) != null && feeRecord.getDouble("standard"+i) == -1){
                            throw new BaseException("不能修"+fee.getYear()+"年"+i+"月的记录，当前组织该月状态为不可更改");
                        }else if(feeRecord.get("paid_time"+i) != null ){
                            throw new BaseException("不能修"+fee.getYear()+"年"+i+"月的记录，该党员当前月党费已缴纳");
                        }
                        feeRecord.set("standard"+i,tempRecord.getBigDecimal("standard"+i));
                    }
                }
                feeRecord.set("update_time",ObjectUtil.getNowTimeStr());
                feeRecord.set("update_key",standard.getCreatorKey());
                updateList.add(feeRecord);
            }else{//一年存在多个组织
                Map<String, List<Record>> fee4OrgMap = ObjectUtil.recordExtractKey(recordList, "org_code");
                List<Record> list = fee4OrgMap.get(orgCode);
                Record nowOrgRecord = null;//当前组织的记录
                if(list == null || list.isEmpty()){//如果不存在当前组织记录，则需要新增
                    nowOrgRecord = tempRecord;
                }else{
                    //当前年一个组织只会存在一个，取值时取下标为0
                    nowOrgRecord = list.get(0);
                }
                for (int i = 1; i <= 12; i++) {
                    if(tempRecord.get("standard"+i) != null){
                        if(nowOrgRecord.get("standard"+i)!=null && nowOrgRecord.getDouble("standard"+i) == -1){
                            throw new BaseException("不能修"+fee.getYear()+"年"+i+"月的记录，当前组织该月状态为不可更改");
                        }
                        //循环其它组织，如果未缴纳则把其它组织的费用设为-2,
                        for (int j = 0; j < recordList.size(); j++) {
                            Record record = recordList.get(j);
                            if(!ObjectUtil.stringIsEmpty(record.getStr("paid_time"+i))){
                                throw new BaseException(fee.getYear()+"年"+i+"月该党员已在组织："+ record.getStr("org_name")+",组织码为："
                                        + record.getStr("org_code")+"。缴纳过党费,当前组织该月状态为不可更改");
                            }
                            if(nowOrgRecord == record){//如果为当前组织，跳过
                                continue;
                            }
                            if(record.get("standard"+i) == null || record.getDouble("standard"+i)>-1){//为空或者大于-1才进行数据操作
                                record.set("standard"+i,"-2");
                                if(!updateList.contains(record)){//如果修改集合不存在该对象，存入该对象
                                    record.set("update_time",ObjectUtil.getNowTimeStr());
                                    record.set("update_key",standard.getCreatorKey());
                                    updateList.add(record);
                                }
                            }
                        }
                        nowOrgRecord.set("standard"+i,tempRecord.get("standard"+i) );
                    }
                }
                nowOrgRecord.set("update_time",ObjectUtil.getNowTimeStr());
                nowOrgRecord.set("update_key",standard.getCreatorKey());
                updateList.add(nowOrgRecord);
            }
        }
        map.put("add",addList);
        map.put("update",updateList);
        return map;
    }

    @Override
    public boolean existsStandard(String memKey,String startDate,String endDate) {
        String sql = "select count(1) count from ccp_fee_standard where mem_key = ? and (? between start_date and end_date " +
                "or ? between start_date and end_date) and delete_time = 0 and `status` = 1";
        Record record = Db.use(JIANGSU_CONFIG).findFirst(sql, memKey, startDate, endDate);
        if(record.getInt("count") > 0){
            return true;
        }
        return false;
    }

    @Override
    public Map<String, Object> getFeeListByOrgCodeAndYear(String year, String orgCode,String sizeStr,String pageStr) throws BaseException {
        int size = 10;//如果size为空，默认为10条
        int page = 1;//如果page为空，默认为第一页
        //如果查询年份为空，默认为当前年
        if(ObjectUtil.stringIsEmptyOrUndefined(year)){
            year = ObjectUtil.getNowYear()+"";
        }
        //如果size为空，默认为10条
        if(!ObjectUtil.stringIsEmptyOrUndefined(sizeStr)){
            size = Integer.parseInt(sizeStr);
        }
        //如果page为空，默认为第一页
        if(!ObjectUtil.stringIsEmptyOrUndefined(pageStr)){
            page = Integer.parseInt(pageStr);
        }
        FeeInfo fee = new FeeInfo(year,orgCode,page,size);
        fee.queryAll();
        return fee.getResultMap();
    }

    @Override
    public boolean updateFeeStatus(JSONObject json, String status) throws BaseException {
        String memKey = json.getString("mem_key");
        String year = json.getString("year");
        if(ObjectUtil.stringIsEmptyOrUndefined(memKey)){
            throw new BaseException("memKey不能为空");
        }
        if(ObjectUtil.stringIsEmptyOrUndefined(year)){
            throw new BaseException("year不能为空");
        }
        String sql = "update ccp_fee set status = ? where mem_key = ? and year = ? and delete_time = 0";
        int update = Db.use(JIANGSU_CONFIG).update(sql, status, memKey, year);
        if(update > 0){
            return true;
        }
        return false;
    }


    /**
     * 添加费用信息
     * @return
     */
    private boolean insertFee(Record standardRecord,List<Record> feeRecordAddList,List<Record> feeRecordUpdateList){
        boolean result = Db.tx(new IAtom() {
            @Override
            public boolean run() throws SQLException {
                //添加标准几率
                boolean result = Db.use(JIANGSU_CONFIG).save("ccp_fee_standard", standardRecord);
                if(!result){
                    return false;
                }
                //添加fee表记录
                if(feeRecordAddList.size() > 0){
                    int[] fees = Db.use(JIANGSU_CONFIG).batchSave("ccp_fee", feeRecordAddList, feeRecordAddList.size());
                    if(fees.length < 1){
                        return false;
                    }
                }
                if(feeRecordUpdateList.size() > 0){
                    int[] update = Db.use(JIANGSU_CONFIG).batchUpdate("ccp_fee", "key", feeRecordUpdateList, feeRecordUpdateList.size());
                    if(update.length < 1){
                        return false;
                    }
                }
                return true;
            }
        });
        return  result;
    }

    /**
     * 初始化费用实体数据
     * @param standard
     * @return
     */
    private List<CcpFee> initCcpFee(CcpFeeStandard standard) throws BaseException {
        //初始化费用实体
        List<CcpFee>  ccpFeeList = new ArrayList<>();
        Map<String, Integer> startDate;
        Map<String, Integer> endDate;
        try {
            //计算基准有限时间
            String startDateStr = standard.getStartDate();
            String endDateStr = standard.getEndDate();
            startDate = ObjectUtil.timeStrToMap(startDateStr, "yyyy-MM");
            endDate = ObjectUtil.timeStrToMap(endDateStr, "yyyy-MM");
        } catch (ParseException e) {
            log.error("添加党费标准时间格式错误",e);
            throw new BaseException("请输入正确的时间格式");
        }
        Integer startYear = startDate.get("year");
        Integer endYear = endDate.get("year");
        //获取插入人员的fee表记录

        for (int year = startYear; year <= endYear; year++) {
            CcpFee ccpFee = new CcpFee();
            try {
                ObjectUtil.copyObj(standard,ccpFee);//复制实体类相同信息
            } catch (Exception e) {
                log.error("复制实体类错误",e);
                throw new BaseException("初始化费用信息错误");
            }
            ccpFee.setKey(ObjectUtil.getUUID());//重新生成uuid
            ccpFee.setYear(year+"");//设置年份
            //如果是开始的年份，从指定开始时间的月份开始，否则从1月开始
            int startMonth = year == startYear?startDate.get("month"):1;
            //如果开始年份等于最后年份，循环到截止时间的月份，如果出现跨年的设置,循环到一年的结尾，12月
            int endMonth = year == endYear?endDate.get("month"):12;
            for (int i = startMonth; i <= endMonth; i++) {
                Class feeClass = ccpFee.getClass();
                try {
                    Method method = feeClass.getMethod("setStandard" + i, BigDecimal.class);//党费标准的set都为BigDecimal
                    method.invoke(ccpFee,standard.getMoney());
                } catch (Exception e) {
                    log.error("初始化费用实体错误，无法获取set方法setStandard" + i,e);
                    throw new BaseException("初始化费用信息错误");
                }
            }
            ccpFeeList.add(ccpFee);
        }
        return ccpFeeList;
    }

}
