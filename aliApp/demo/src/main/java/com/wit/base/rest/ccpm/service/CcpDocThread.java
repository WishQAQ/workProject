package com.wit.base.rest.ccpm.service;

import com.alibaba.fastjson.JSON;
import com.google.api.client.util.ArrayMap;
import com.google.api.client.util.DateTime;
import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.IAtom;
import com.jfinal.plugin.activerecord.Record;
import com.wit.base.rest.ccpm.po.BaseThreadObject;
import com.wit.base.rest.ccpm.po.CcpDoc;
import com.wit.base.rest.ccpm.po.CcpDocReceive;
import com.wit.base.rest.ccpm.utils.BaseException;
import com.wit.base.rest.ccpm.utils.ObjectUtil;
import com.wit.base.rest.ccpm.utils.ThreadUtil;
import org.apache.log4j.Logger;

import java.sql.SQLException;
import java.util.*;

import static com.wit.base.rest.ccpm.config.DbConfig.JIANGSU_CONFIG;

/**
 * 公文线程处理类
 */
public class CcpDocThread extends BaseThreadObject {

    private Logger log = Logger.getLogger(CcpDocThread.class);

    /** 查询参数 **/
    private String userKey;//用户key
    private String orgCode;//组织code
    private CcpDoc doc;//公文对象
    private String docKeyCondition;//公文条件
    private List<String> docKeyConditionParam;//公文条件参数
    private String status;//状态
    private String receiveKey;//接收人
    private String docReceiveKey;//公文接收表key

    private String userKeysCondition;//人员key条件
    private String[] userKeysConditionParam;//人员key条件参数

    /** 结果集 **/
    private List<Record> docTypeRecords;//公文类型
    private List<Record> orgRecords;//组织信息
    private int docCount;//文档总数
    private Record docRecord;//公文
    private List<Record> fileRecords = new ArrayList<>();//文件
    private List<Record> userRecords = new ArrayList<>();//人员信息
    private Map<String,List<String>> relationMap = new HashMap<>();//人员组织关系map
    private List<Record> receiveStatusRecords;//接收公文状态
    private Record receiveStatistics;//接收记录统计
    private int receiveCount = 0;//接收记录总数
    private int transmitCount = 0;//转发总数
    private List<Record> multipleReceiveCount;//多个接收记录综合，转发
    private String timestamp;//时间戳

    public CcpDocThread(String userKey,String orgCode){
        this.userKey = userKey;
        this.orgCode = orgCode;
    }

    public CcpDocThread(String userKey){
        this.userKey = userKey;
    }

    public CcpDocThread(CcpDoc doc){
        this.doc = doc;
    }

    public CcpDocThread(){

    }

    /**
     * 修改接收记录状态为已读
     */
    public void updateReceiveByAlertRead(){
        try {
            String timestamp = ObjectUtil.getNowTimeStr();
            String sql = "update ccp_doc_receive set status = 1,timestamp = ? where `key` = ?" ;
            int update = Db.use(JIANGSU_CONFIG).update(sql, timestamp, docReceiveKey);
            if(update > 0){
                this.timestamp = timestamp;
            }
        }catch (Exception e){//修改为已读发生异常直接吞并，并不影响主流程
            log.error("修改接收记录为已读发送错误",e);
        }
    }

    /**
     * 查询接收总数(查询接收集合) 存入 receiveCount
     */
    public void queryReceiveByUserCount(){
        String sql = "select count(1) count from ccp_doc_receive where receive_key = ? "+
                (ObjectUtil.stringIsEmptyOrUndefined(status)?"":" and status = ?")+" and delete_time = 0 ";
        List<Object> list = new ArrayList<>();
        list.add(receiveKey);
        if(!ObjectUtil.stringIsEmptyOrUndefined(status)){
            list.add(status);
        }
        receiveCount = Db.use(JIANGSU_CONFIG).findFirst(sql,list.toArray()).getInt("count");
    }

    /**
     * 查询转发接收人数(多个)
     */
    public void queryMultipleReceiveCount(){
        String sql = "select count(1) count,doc_key from ccp_doc_receive where doc_key in("+docKeyCondition+") and delete_time = 0 group by `doc_key`";
        this.multipleReceiveCount = Db.use(JIANGSU_CONFIG).find(sql, docKeyConditionParam.toArray());
    }

    /**
     * 获取转发总数
     */
    public void queryTransmitCount(){
        String sql = "select count(1) count from ccp_doc where transmit_key = ? and delete_time = 0 and status != 6";
        transmitCount = Db.use(JIANGSU_CONFIG).findFirst(sql,doc.getKey()).getInt("count");
    }

    /**
     * 获取接收记录总数
     */
    public void queryReceiveCount(){
        String sql = "select count(1) count from ccp_doc_receive where doc_key = ?  and delete_time = 0";
        receiveCount = Db.use(JIANGSU_CONFIG).findFirst(sql, doc.getKey()).getInt("count");
    }

    /**
     * 获取接收记录统计
     */
    public void queryReceiveStatistics(){
        String sql = "select count(`status` > 0 or null) alertRead,count(callback_time is not null or null ) callback," +
                "count(`status` = 0 or null) unRead  from ccp_doc_receive where doc_key = ? and creator_key = ? and delete_time = 0";
        this.receiveStatistics = Db.use(JIANGSU_CONFIG).findFirst(sql, doc.getKey(), doc.getCreatorKey());
    }

    /**
     * 查询接收状态
     */
    public void queryReceiveStatus(){
        String sql  = "select status from ccp_doc_receive where doc_key = ? and delete_time = 0";
        this.receiveStatusRecords = Db.use(JIANGSU_CONFIG).find(sql, doc.getKey());
    }

    /**
     * 查询公文内容
     */
    public Record queryDocByKey(){
        String sql = "select `key`,content,title,doc_number,dict_key,dict_name,org_code,org_name,remark,handle_time,status,remind,send_main,carbon_copy " +
                ",creator_key,creator,timestamp from ccp_doc where `key` = ?  and delete_time = 0";
        this.docRecord = Db.use(JIANGSU_CONFIG).findFirst(sql, doc.getKey());
        return docRecord;
    }

    /**
     * 查询附件
     */
    public void queryDocFiles(){
        String sql = "select file_key from sys_file_relation where biz_table = 'ccp_doc' and biz_key = ? and delete_time = 0";
        List<Record> relationRecords = Db.use(JIANGSU_CONFIG).find(sql, doc.getKey());
        if(relationRecords.isEmpty()){
            return;
        }
        StringBuilder fileKey = new StringBuilder();
        for (Record record:relationRecords) {
            fileKey.append("'"+record.getStr("file_key")+"',");
        }
        fileKey.deleteCharAt(fileKey.length()-1);
        String fileSql = "select `key`,name,type,url from sys_file where `key` in("+fileKey+") and delete_time = 0";
        this.fileRecords = Db.use(JIANGSU_CONFIG).find(fileSql);
    }

    public void queryDocCount(){
        String sql = "select count(1) count from ccp_doc where creator_key = ? and delete_time = 0" +
                (doc.getStatus() == null?"":" and status = ?");
        List<Object> paramLit = new ArrayList<>();
        paramLit.add(doc.getCreatorKey());
        if(doc.getStatus() != null){
            paramLit.add(doc.getStatus());
        }
        docCount = Db.use(JIANGSU_CONFIG).findFirst(sql,paramLit.toArray(new Object[0])).getInt("count");
    }

    /**
     * 查询人员信息
     */
    public void queryUserInfo(){
        String userSql = "select name,phone,`key` from sys_user where `key` in("+this.userKeysCondition +") and status = 0 and delete_time = 0";//查询姓名电话
        this.userRecords = Db.use(JIANGSU_CONFIG).find(userSql, userKeysConditionParam);
    }


    /**
     * 查询人员信息
     * @param userKeysCondition
     * @param param
     */
    public List<Record> queryUserInfo(String userKeysCondition, String[] param){
        this.userKeysCondition = userKeysCondition;
        this.userKeysConditionParam = param;
        queryUserInfo();
        return this.userRecords;
    }

    /**
     * 查询组织 信息
     */
    public void queryOrgInfo(){
        String relationSql = "select user_key,sys_org_key from sys_org_user_correlation where user_key in("+this.userKeysCondition+") and delete_time = 0";//查询人员组织关系
        List<Record> relationRecords = Db.use(JIANGSU_CONFIG).find(relationSql, userKeysConditionParam);
        //将组织key存入map
        for (Record record:relationRecords) {
            List<String> orgKeyList = relationMap.get(record.getStr("user_key"));
            if(orgKeyList == null || orgKeyList.isEmpty()){
                orgKeyList = new ArrayList<>();
                relationMap.put(record.getStr("user_key"),orgKeyList);
            }
            orgKeyList.add(record.getStr("sys_org_key"));
        }
        StringBuilder orgKey = new StringBuilder();//组织key
        for (Record record:relationRecords) {
            orgKey.append("'"+record.getStr("sys_org_key")+"',");
        }
        orgKey.deleteCharAt(orgKey.length()-1);
        String orgSql = "select `key`,org_code,name from sys_org where `key` in ("+orgKey+") and delete_time = 0 ";
        this.orgRecords = Db.use(JIANGSU_CONFIG).find(orgSql);//组织信息
    }

    //设置查询人员信息条件
    public Map<String, Object> setQueryCondition(){
        Map<String,Object> map = new ArrayMap<>();
        //获取需要发送人员的key
        List<String> userKeyList = new ArrayList<>();
        String sendMain = doc.getSendMain();
        String[] sendMainArray = null;
        if(!ObjectUtil.stringIsEmpty(sendMain)){
            sendMainArray = sendMain.split(",");
        }
        String carbonCopy = doc.getCarbonCopy();
        String[] carbonCopyArray = null;
        if(!ObjectUtil.stringIsEmpty(carbonCopy)){
            carbonCopyArray = carbonCopy.split(",");
        }
        StringBuilder temp = new StringBuilder();
        if(sendMainArray != null){
            for (String str:sendMainArray) {
                userKeyList.add(str);
                temp.append("?,");
            }
        }
        if(carbonCopyArray != null) {
            for (String str : carbonCopyArray) {
                userKeyList.add(str);
                temp.append("?,");
            }
        }
        if(temp.length() < 1){
            return map;
        }
        //设置发送的人员条件和参数
        temp.deleteCharAt(temp.length()-1);
        userKeysConditionParam = userKeyList.toArray(new String[0]);
        this.userKeysCondition = temp.toString();
        map.put("userKeyList",userKeyList);
        map.put("sendMainArray",sendMainArray);
        map.put("carbonCopyArray",carbonCopyArray);
        return map;
    }

    /**
     * 发送公文
     */
    public void send() throws InterruptedException {
        Map<String, Object> resultMap = setQueryCondition();//设置查询人员信息条件
        List<String> userKeyList = (List<String>) resultMap.get("userKeyList");
        String[] sendMainArray = (String[]) resultMap.get("sendMainArray");
        //查询人员信息,存入 userRecords
        ThreadUtil queryUserInfo = new ThreadUtil(this,"queryUserInfo");
        queryUserInfo.start();
        queryOrgInfo();//查询组织信息 存入orgRecords
        try {
            queryUserInfo.join();
        }catch (Exception e){
            log.error("查询发送人员信息错误",e);
        }
        try {
            isError();//判断查询是否异常，异常不再进行发送
        } catch (BaseException e) {
            log.error("查询发送人员信息错误",e);
            return;
        }
        Map<String,Object> userMap = ObjectUtil.recordToMapMultipleValue(this.userRecords,"key");
        //将数据组装为收文表数据
        List<Record> receiveRecordList = new ArrayList<>();
        for (String userKey:userKeyList) {
            CcpDocReceive receive = new CcpDocReceive();
            try {
                ObjectUtil.copyObj(doc,receive);
            } catch (Exception e) {
                log.error("公文发送异常",e);
                return;//不再进行插入操作
            }
            receive.setDocKey(doc.getKey());
            receive.setSendPerson(doc.getCreatorKey());
            receive.setSendPersonName(doc.getCreator());
            //将接收人信息插入
            Map<String,Object> userTempMap= (Map<String, Object>) userMap.get(userKey);
            receive.setReceiveKey(userKey);
            receive.setReceiveName(userTempMap.get("name").toString());//用户姓名
            //判断是主送还是抄送
            for (String str:sendMainArray) {
                if(userKey.equals(str)){
                    receive.setType("0");
                    break;
                }
            }
            //如果不为主送，则为抄送
           if(ObjectUtil.stringIsEmpty(receive.getType())){
               receive.setType("1");
           }
            receive.setCreateTime(ObjectUtil.getNowTimeStr());
            receive.setSendOrgCode(doc.getOrgCode());
            receive.setSendOrgName(doc.getOrgName());
            receive.setKey(ObjectUtil.getUUID());
            receive.set_id(ObjectUtil.getUUID());
            //处理接收人单位
            StringBuilder orgCode = new StringBuilder();
            StringBuilder orgNames = new StringBuilder();
            //处理人接收人单位
            List<String> orgKeyList = relationMap.get(userKey);
            Map<String, Object> orgMap = ObjectUtil.recordToMapMultipleValue(this.orgRecords, "key");
            for (String orgKey:orgKeyList) {
                Object obj = orgMap.get(orgKey);
                if(obj != null){
                    Map<String,Object> map = (Map<String, Object>) obj;
                    orgCode.append(map.get("org_code")+",");
                    orgNames.append(map.get("name")+",");
                }
            }
            //清理最后的逗号
            orgCode.deleteCharAt(orgCode.length()-1);
            orgNames.deleteCharAt(orgNames.length()-1);
            receive.setOrgCode(orgCode.toString());
            receive.setOrgName(orgNames.toString());
            receive.setStatus(0);//状态默认为0，未读
            try {
                receiveRecordList.add(ObjectUtil.objectToRecord(receive));
            } catch (BaseException e) {
                log.error("公文发送，转为record异常",e);
            }
        }
        //事务处理
        boolean result = Db.tx(new IAtom() {
            @Override
            public boolean run() throws SQLException {
                int[] saveRow = Db.use(JIANGSU_CONFIG).batchSave("ccp_doc_receive", receiveRecordList, receiveRecordList.size());
                int update = Db.use(JIANGSU_CONFIG).update("update ccp_doc set status = 3 where `key` = ?", doc.getKey());
                return saveRow.length == receiveRecordList.size() && update > 0;
            }
        });
        if(!result){
            log.error("公文发送异常,异常数据:"+ JSON.toJSONString(receiveRecordList));
        }
    }

    /**
     * 查询下级组织
     */
    public void queryLowerLevelOrg(){
        //组织is_leaf默认为0，表示是叶子节点，只有人员不是叶子节点
        String sql = "select name org_name,org_code,is_leaf,`key` org_key from sys_org where org_code like ? and  delete_time = 0  and status = 0 ";
        //只查询下一级组织
        orgRecords = Db.use(JIANGSU_CONFIG).find(sql, orgCode + "___");
    }

    /**
     * 获取公文类型
     */
    public void queryDocType(){
        String sql = "select `key`,name from dict_doc where delete_time = 0 order by sort asc";
        docTypeRecords = Db.use(JIANGSU_CONFIG).find(sql);
    }

    public List<Record> getDocTypeRecords() {
        return docTypeRecords;
    }

    public List<Record> getOrgRecords() {
        return orgRecords;
    }

    public int getDocCount() {
        return docCount;
    }

    public List<Record> getFileRecords() {
        return fileRecords;
    }

    public List<Record> getUserRecords() {
        return userRecords;
    }

    public Map<String, List<String>> getRelationMap() {
        return relationMap;
    }

    public List<Record> getReceiveStatusRecords() {
        return receiveStatusRecords;
    }

    public Record getReceiveStatistics() {
        return receiveStatistics;
    }

    public int getReceiveCount() {
        return receiveCount;
    }

    public int getTransmitCount() {
        return transmitCount;
    }

    public List<Record> getMultipleReceiveCount() {
        return multipleReceiveCount;
    }

    public void setDocKeyCondition(String docKeyCondition) {
        this.docKeyCondition = docKeyCondition;
    }

    public void setDocKeyConditionParam(List<String> docKeyConditionParam) {
        this.docKeyConditionParam = docKeyConditionParam;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public void setReceiveKey(String receiveKey) {
        this.receiveKey = receiveKey;
    }

    public void setDocReceiveKey(String docReceiveKey) {
        this.docReceiveKey = docReceiveKey;
    }

    public String getTimestamp() {
        return timestamp;
    }
}
