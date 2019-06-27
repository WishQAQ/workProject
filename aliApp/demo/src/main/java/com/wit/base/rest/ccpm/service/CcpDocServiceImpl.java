package com.wit.base.rest.ccpm.service;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.IAtom;
import com.jfinal.plugin.activerecord.Record;
import com.wit.base.rest.ccpm.po.CcpDoc;
import com.wit.base.rest.ccpm.po.SysFile;
import com.wit.base.rest.ccpm.utils.BaseException;
import com.wit.base.rest.ccpm.utils.DataTemplate;
import com.wit.base.rest.ccpm.utils.ObjectUtil;
import com.wit.base.rest.ccpm.utils.ThreadUtil;
import org.apache.log4j.Logger;

import javax.json.JsonObject;
import java.sql.SQLException;
import java.util.*;

import static com.wit.base.rest.ccpm.config.DbConfig.JIANGSU_CONFIG;
import static com.wit.base.rest.ccpm.utils.ObjectUtil.*;

public class CcpDocServiceImpl implements ICcpDocService {
    private Logger log = Logger.getLogger(CcpDocServiceImpl.class);
    private ICcpPersonnelChoicesService choicesService = new CcpPersonnelChoicesServiceImpl();

    @Override
    public Map<String, Object> init(String userKey) throws BaseException {
        Map<String, Object> map = new HashMap<>();
        //TODO 测试获取数据，需删除
        String sql = "select name,org_key,org_name from sys_user where `key` = ?";
        Record record = Db.use(JIANGSU_CONFIG).findFirst(sql, userKey);
        map.put("user_key",userKey);
        map.put("user_name",record.getStr("name"));
        map.put("dept_name",record.getStr("org_name"));

        CcpDocThread thread = new CcpDocThread(userKey);
        //获取公文类型,存入docTypeRecords
        ThreadUtil ccpDocThread = new ThreadUtil(thread,"queryDocType");
        ccpDocThread.start();
        List<Record> managerOrg = choicesService.getManagerOrg(userKey);//查询管辖的组织
        String orgCode = removeSubordinate(managerOrg);//去除子集组织
        //查询组织是否为页节点
        String orgSql = "select name org_name,is_leaf,org_code,`key` org_key from sys_org where org_code in("+orgCode+")";
        List<Record> records = Db.use(JIANGSU_CONFIG).find(orgSql);//管辖的组织信息
        if(managerOrg == null || managerOrg.isEmpty()){
            throw new BaseException("对不起，您没有权限进行发文操作");
        }
        try {
            ccpDocThread.join();
        }catch (Exception e){
            log.error("公文初始化异常",e);
            throw new BaseException("初始化异常");
        }
        thread.isError();//判断是否存在异常，存在则抛出
        map.put("doc_type_list", thread.getDocTypeRecords());//公文类型
        map.put("org_list",recordToList(records));//管辖组织
        return map;
    }

    @Override
    public boolean insertDoc(CcpDoc doc, List<SysFile> fileList) throws BaseException {
        provingJurisdiction(doc.getCreatorKey(),doc.getOrgCode());//验证权限
        doc.setKey(ObjectUtil.getUUID());
        doc.set_id(ObjectUtil.getUUID());
        boolean result = saveDoc(doc, fileList, doc.getCreatorKey(), true);//保存公文信息
        return result;
    }

    /**
     * 验证权限
     */
    private void provingJurisdiction(String userKey,String orgCode) throws BaseException {
        List<Record> managerOrg = choicesService.getManagerOrg(userKey);//查询管辖的组织
        if(managerOrg!=null && !managerOrg.isEmpty()){
            removeSubordinate(managerOrg);//移除子集组织
        }
        boolean include = false;//查询的组织是否在权限内
        for (Record record : managerOrg) {
            if (orgCode.contains(record.getStr("org_code"))) {
                include = true;
                break;
            }
        }
        if(!include){
            throw new BaseException("对不起，只能查询管辖的组织");
        }
    }

    @Override
    public List<Map<String,Object>> getLowerLevelOrg(String userKey, String orgCode) throws BaseException {
        CcpDocThread thread = new CcpDocThread(userKey,orgCode);
        //获取下级组织,存入 orgRecords
        ThreadUtil ccpDocThread = new ThreadUtil(thread,"queryLowerLevelOrg");
        ccpDocThread.start();
        provingJurisdiction(userKey,orgCode);//验证权限
        try {
            ccpDocThread.join();
        }catch (Exception e){
            log.error("公文获取下级组织异常",e);
            throw new BaseException("获取下级组织异常");
        }
        thread.isError();//判断是否存在异常，存在则抛出
        return ObjectUtil.recordToList(thread.getOrgRecords());
    }

    @Override
    public Map<String,Object> getDocList(String status, int page, int size,String userKey) throws BaseException {
        Map<String,Object> map = new HashMap<>();
        CcpDoc doc = new CcpDoc();
        doc.setCreatorKey(userKey);
        //处理查询参数
        List<Object> paramLit = new ArrayList<>();
        paramLit.add(userKey);
        paramLit.add((page-1)*size);
        paramLit.add(size);
        if(!ObjectUtil.stringIsEmptyOrUndefined(status)){
            paramLit.add(status);
            doc.setStatus(Integer.parseInt(status));
        }
        CcpDocThread docThread = new CcpDocThread(doc);//得到公文线程处理对象
        //查询发送公文总数，存入 docCount
        ThreadUtil queryCount = new ThreadUtil(docThread,"queryDocCount");
        queryCount.start();
        String sql = "select `key`,doc_number,title,handle_time,status from ccp_doc where creator_key = ? and delete_time = 0" +
                (ObjectUtil.stringIsEmptyOrUndefined(status)?"":" and status = ?")+" order by create_time desc limit ?,?";

        List<Record> records = Db.use(JIANGSU_CONFIG).find(sql, paramLit.toArray(new Object[0]));
        try {
            queryCount.join();
        }catch (Exception e){
            log.error("获取公文信息等待线程异常",e);
            throw new BaseException("获取公文信息异常");
        }
        docThread.isError();//存在异常则抛出
        int count = docThread.getDocCount();
        //计算分页信息
        int countPage = count%size==0?count/size:count/size+1;
        map.put("count",count);
        map.put("count_page",countPage);
        map.put("size",size);
        map.put("page",page);
        map.put("list",ObjectUtil.recordToList(records));
        return map;
    }

    @Override
    public boolean sendDoc(String userKey, String docKey) throws BaseException {
        //设置参数
        CcpDoc doc = new CcpDoc();
        doc.setCreatorKey(userKey);
        doc.setKey(docKey);
        CcpDocThread docThread = new CcpDocThread(doc);
        Record docRecord = docThread.queryDocByKey();//查询公文,存入docRecord
        provingJurisdiction(userKey,docRecord.getStr("org_code"));//验证权限
        if(!"0".equals(docRecord.getStr("status")) && !"-1".equals(docRecord.getStr("status")) ){
            throw new BaseException("请不要重复进行发送");
        }
        //将record转为实体
        Map<String, Object> map = recordToMap(docRecord);
        String jsonString = JSON.toJSONString(map);
        JSONObject jsonObject = JSONObject.parseObject(jsonString);
        CcpDoc newDoc = JSON.toJavaObject(jsonObject, CcpDoc.class);
        String message = ObjectUtil.objAttributeIsEmpty(newDoc,true,"key","_id","timestamp","carbonCopy","transmitKey");
        if(!ObjectUtil.stringIsEmpty(message)){
            throw new BaseException("请将数据填写完成才能进行发送");
        }
        boolean result = updateDocStatus(docKey, 2);//修改状态为发送中
        if(result){
            CcpDocThread ccpDoc = new CcpDocThread(newDoc);
            ThreadUtil thread = new ThreadUtil(ccpDoc,"send");//线程异步发送
            thread.start();
        }
        return result;
    }

    @Override
    public Map<String, Object> getDocByKey(String userKey, String docKey,boolean isReceive) throws BaseException {
        CcpDoc doc = new CcpDoc();
        doc.setCreatorKey(userKey);
        doc.setKey(docKey);
        CcpDocThread docThread = new CcpDocThread(doc);
        //查询附件 存入 fileRecords
        ThreadUtil queryDocFiles = new ThreadUtil(docThread,"queryDocFiles");
        queryDocFiles.start();
        //查询公文内容
        Record record = docThread.queryDocByKey();
        //如果是接收者,根据公文key和用户key获取接收key
        if(isReceive){
            String sql = "select `key`,status from ccp_doc_receive where doc_key = ? and receive_key = ? and delete_time = 0";
            Record receiveRecord = Db.use(JIANGSU_CONFIG).findFirst(sql, docKey, userKey);
            if(receiveRecord == null){
                throw new BaseException("没有查询到您有接收到此公文的信息");
            }
            record.set("doc_receive_key",receiveRecord.getStr("key"));
            record.set("receive_status",receiveRecord.getStr("status"));
        }
        if(record == null){
            return null;
        }
        ThreadUtil updateReceiveByAlertRead = null;
        //如果为接收者，且为未读，异步修改状态为已读，并返回最新的时间戳
        if(isReceive && "0".equals(record.getStr("receive_status"))){
            docThread.setDocReceiveKey(record.get("doc_receive_key"));
            updateReceiveByAlertRead = new ThreadUtil(docThread,"updateReceiveByAlertRead");
            updateReceiveByAlertRead.start();
        }
        ThreadUtil queryOrgInfo = null;
        //将查询人员信息,不为接收信息才查询
        if(!isReceive){
            String sendMain = record.getStr("send_main");
            String carbonCopy = record.getStr("carbon_copy");
            //如果发送人员不为空，查询人员信息
            String[] mainKeys = null;//主送人员key
            if(!stringIsEmpty(sendMain) && !stringIsEmpty(carbonCopy)){
                doc.setSendMain(sendMain);
                doc.setCarbonCopy(carbonCopy);
                Map<String, Object> map = docThread.setQueryCondition();//设置查询条件
                //查询组织信息，存入 orgRecords
                queryOrgInfo = new ThreadUtil(docThread,"queryOrgInfo");
                queryOrgInfo.start();
                mainKeys = (String[]) map.get("sendMainArray");
                docThread.queryUserInfo();//查询人员信息
            }
        }
        try {
            queryDocFiles.join();
            if(queryOrgInfo!=null)queryOrgInfo.join();
            if(updateReceiveByAlertRead!=null)updateReceiveByAlertRead.join();
        }catch (Exception e){
            log.error("查询公文异常",e);
            throw new BaseException("查询公文异常");
        }
        //获取修改后更新的时间戳,设置入信息中,如果为空，则更新失败，不用管，不影响流程
        if(!ObjectUtil.stringIsEmpty(docThread.getTimestamp())){
            record.set("timestamp",docThread.getTimestamp());
            record.set("receive_status",1);//状态修改为已读
        }
        //组合人员信息
        List<Map<String,Object>> mainList = new ArrayList<>();//主送
        List<Map<String,Object>> copyList = new ArrayList<>();//抄送
        List<Record> userRecords = docThread.getUserRecords();
        List<Record> orgRecords = docThread.getOrgRecords();
        Map<String, List<String>> relationMap = docThread.getRelationMap();//人员组织关系map

        Map<String, Object> orgMap = ObjectUtil.recordToMapMultipleValue(orgRecords, "key");
        for (Record userRecord:userRecords) {
            //通过发送人员key获取组织key
            List<String> orgKeyList = relationMap.get(userRecord.getStr("key"));
            if(orgKeyList == null || orgKeyList.isEmpty()){
                continue;
            }
            //遍历组织key，获取组织信息
            List<Map<String,Object>> orgList = new ArrayList<>();
            for (String orgKey:orgKeyList) {
                Object obj = orgMap.get(orgKey);
                if(obj != null){
                    Map<String,Object> map = (Map<String, Object>) obj;
                    orgList.add(map);//将组织信息存入list
                }
            }
            Map<String,Object> map = new HashMap<>();//人员信息map
            map.put("user_key",userRecord.getStr("key"));
            map.put("name",userRecord.getStr("name"));
            map.put("orgList",orgList);
            boolean isMain = false;//是否主送人员
            //如果主送人员不为空，切包含当前key,为主送人员
            if(!ObjectUtil.stringIsEmpty(record.getStr("send_main")) && record.getStr("send_main").contains(userRecord.getStr("key"))){
                isMain = true;
            }
            if(isMain){//判断是否为主送人员，分别存储
                mainList.add(map);
            }else{
                copyList.add(map);
            }
        }
        record.set("send_main_list",mainList);
        record.set("carbon_copy_list",copyList);
        record.set("file_list",recordToList(docThread.getFileRecords()));
        return ObjectUtil.recordToMap(record);
    }

    @Override
    public boolean updateDocStatus(String key,int status) {
        String sql = "update ccp_doc set status = ? where `key` = ? and delete_time = 0";
        int update = Db.use(JIANGSU_CONFIG).update(sql, status, key);
        return update > 0;
    }

    /**
     * 保存文档
     * @param isAdd 是否为新增
     * @return
     */
    private boolean saveDoc(CcpDoc doc,List<SysFile> fileList,String userKey,boolean isAdd) throws BaseException {
        if(doc.getStatus() == 1){
            //将公文状态改为发送中
            doc.setStatus(2);
        }
        Record record = ObjectUtil.objectToRecord(doc);//得到Record对象
        if(isAdd){
            record.set("create_time",ObjectUtil.getNowTimeStr());
        }else{
            record.set("update_time",ObjectUtil.getNowTimeStr());
            record.set("update_key",userKey);
        }
        List<Record> fileRecords = new ArrayList<>();
        List<Record> fileRelationRecords = new ArrayList<>();
        //将文件转为record
        for (SysFile file:fileList) {
            file.setKey(ObjectUtil.getUUID());
            file.setCreateTime(ObjectUtil.getNowTimeStr());
            file.setDeleteTime(0);
            fileRecords.add(ObjectUtil.objectToRecord(file));
            Record fileRelation = new Record();
            fileRelation.set("file_key",file.getKey())
                    .set("biz_table","ccp_doc")
                    .set("biz_key",doc.getKey())
                    .set("delete_time",0);
            fileRelationRecords.add(fileRelation);
        }
        boolean result = Db.tx(new IAtom() {
            @Override
            public boolean run() throws SQLException {
                boolean docResult ;
                if(isAdd){
                    docResult = Db.use(JIANGSU_CONFIG).save("ccp_doc", record);
                }else{
                    docResult = Db.use(JIANGSU_CONFIG).update("ccp_doc","key,timestamp", record);//将主键和时间戳作为联合主键修改
                }
                if(fileRecords.size() > 0){
                    int[] fileResult = Db.use(JIANGSU_CONFIG).batchSave("sys_file", fileRecords, fileRecords.size());
                    int[] fileRelationResult = Db.use(JIANGSU_CONFIG).batchSave("sys_file_relation", fileRelationRecords, fileRelationRecords.size());
                    if(fileResult.length != fileRecords.size() || fileRelationResult.length != fileRelationRecords.size()){
                        return  false;
                    }
                }
                return docResult;
            }
        });
        if(result && doc.getStatus() == 2){//存入收文表
            CcpDocThread ccpDoc = new CcpDocThread(doc);
            ThreadUtil thread = new ThreadUtil(ccpDoc,"send");//线程异步发送
            thread.start();
        }
        return result;
    }

    @Override
    public boolean updateDoc(CcpDoc doc, String userKey,List<SysFile> fileList) throws BaseException {
        provingJurisdiction(userKey,doc.getOrgCode());//验证权限
        if(doc.getStatus() == 1){
            //将公文状态改为发送中
            doc.setStatus(2);
        }
        //将不需要更改的字段设为空
        doc.setCreator(null);
        doc.set_id(null);
        doc.setDocNumber(null);
        boolean result = saveDoc(doc, fileList, doc.getCreatorKey(), false);//保存公文信息
        return result;
    }

    @Override
    public boolean takeBack(String docKey, String userKey) throws BaseException {
        //查询公文状态和已发送的状态
        CcpDoc ccpDoc = new CcpDoc(docKey,userKey);
        CcpDocThread docThread = new CcpDocThread(ccpDoc);
        //查询公文接收处理状态  存入 receiveStatusRecords
        ThreadUtil queryReceiveStatus = new ThreadUtil(docThread,"queryReceiveStatus");
        queryReceiveStatus.start();
        String sql = "select status from ccp_doc where `key` = ? and creator_key = ? and delete_time = 0";
        Record docRecord = Db.use(JIANGSU_CONFIG).findFirst(sql, docKey, userKey);
        if(docRecord == null){
            throw new BaseException("当前用户不存在此公文信息");
        }
        try {
            queryReceiveStatus.join();
        }catch (Exception e){
            log.error("收回公文错误",e);
            throw new BaseException("查询已发送公文信息错误");
        }
        docThread.isError();//查询线程是否存在异常
        //如果公文状态为4在办或5已办，不可收回
        if("4".equals(docRecord.getStr("status") ) || "5".equals(docRecord.getStr("status") )){
            throw new BaseException("收回失败，人员已受理");
        }
        List<Record> receiveStatusRecords = docThread.getReceiveStatusRecords();
        for (Record record:receiveStatusRecords) {
            if(Integer.parseInt(record.getStr("status")) > 1){//接收表状态0未读，1已读，2待办，3在办，4已办，5已办结
                throw new BaseException("收回失败，人员已受理");
            }
        }
        //进行收回操作,6为退回
        boolean result = Db.tx(new IAtom() {
            @Override
            public boolean run() throws SQLException {
                boolean docResult = updateDocStatus(docKey, 6);
                String sql = "update ccp_doc_receive set delete_time = ?  where doc_key = ?";
                int update = Db.use(JIANGSU_CONFIG).update(sql, new Date().getTime(),docKey);
                return docResult && update > 0;
            }
        });
        return result;
    }

    @Override
    public Map<String, Object> queryCallback(String docKey, String userKey,int page,int size) throws BaseException {
        CcpDoc ccpDoc = new CcpDoc(docKey,userKey);
        CcpDocThread docThread = new CcpDocThread(ccpDoc);
        //查询统计 已读，回执，未读数  存入 receiveStatistics
        ThreadUtil queryReceiveStatistics = new ThreadUtil(docThread,"queryReceiveStatistics");
        queryReceiveStatistics.start();
        ThreadUtil queryReceiveCount = new ThreadUtil(docThread,"queryReceiveCount");
        queryReceiveCount.start();
        Map<String, Object> map = queryUserInfo(ccpDoc, docKey, docThread, page, size);//查询接收表中的人员信息
        try {
            queryReceiveStatistics.join();
            queryReceiveCount.join();
        }catch (Exception e){
            log.error("查询公文统计信息错误",e);
            throw new BaseException("统计数量错误");
        }
        docThread.isError();//查询是否发生错误
        Record receiveStatistics = docThread.getReceiveStatistics();
        map.put("alertRead",receiveStatistics.getInt("alertRead"));
        map.put("callback",receiveStatistics.getInt("callback"));
        map.put("unRead",receiveStatistics.getInt("unRead"));
        return map;
    }

    /**
     * 查询接收表人员信息
     * @param ccpDoc
     * @param docKey
     * @param docThread
     * @param page
     * @param size
     * @return
     * @throws BaseException
     */
    private Map<String,Object> queryUserInfo(CcpDoc ccpDoc,String docKey,CcpDocThread docThread,int page,int size) throws BaseException {
        Map<String,Object> map = new HashMap<>();
        //查询列表信息
        String sql = "select doc_key,`key`,status,read_time,callback_content,callback_time,receive_key,org_code " +
                "from ccp_doc_receive where doc_key = ?  and delete_time = 0 limit ?,?";
        List<Record> records = Db.use(JIANGSU_CONFIG).find(sql, docKey, (page - 1) * size, size);
        StringBuilder receiveKeys = new StringBuilder();
        List<String> orgCodeList = new ArrayList<>();//组织code
        StringBuilder condition = new StringBuilder();//组织查询条件,问号
        for (Record record:records) {
            receiveKeys.append(record.getStr("receive_key")+",");
            String orgCode = record.getStr("org_code");
            String[] orgCodeArray = orgCode.split(",");
            for (String str:orgCodeArray) {
                orgCodeList.add(str);
                condition.append("?,");
            }
        }
        receiveKeys.deleteCharAt(receiveKeys.length()-1);
        ccpDoc.setSendMain(receiveKeys.toString());//将人员key存入发送人员
        //查询人员信息，存入 userRecords
        docThread.setQueryCondition();//设置查询条件
        ThreadUtil queryUserInfo = new ThreadUtil(docThread,"queryUserInfo");
        queryUserInfo.start();
        //查询组织名
        condition.deleteCharAt(condition.length()-1);
        String orgSql = "select name,org_code from sys_org where org_code in("+condition+") and delete_time = 0";
        List<Record> orgRecords = Db.use(JIANGSU_CONFIG).find(orgSql,orgCodeList.toArray());
        try {
            queryUserInfo.join();
        }catch (Exception e){
            log.error("查询公文统计信息错误",e);
            throw new BaseException("统计数量错误");
        }
        docThread.isError();//查询是否发生错误
        //将人员、组织信息存入接收记录中
        List<Record> userRecords = docThread.getUserRecords();
        Map<String, Object> userMap = recordToMapAloneValue(userRecords, "key", "name");
        Map<String, Object> orgMap = recordToMapAloneValue(orgRecords, "org_code", "name");
        for (Record record:records) {
            String key = record.getStr("receive_key");
            record.set("receive_name",userMap.get(key));//姓名
            String orgCodeStr = record.getStr("org_code");
            String[] orgCodeArray = orgCodeStr.split(",");
            List<Object> orgNameList = new ArrayList<>();//组织名集合
            for (String orgCode:orgCodeArray) {
                orgNameList.add(orgMap.get(orgCode));
            }
            record.set("org_nameList",orgNameList);
        }
        map.put("list",recordToList(records));
        //计算分页数据
        int count = docThread.getReceiveCount();
        int countPage = count%size == 0 ? count/size:count/size+1;
        map.put("page",page);
        map.put("size",size);
        map.put("count",count);
        map.put("count_page",countPage);
        return map;
    }

    @Override
    public Map<String, Object> queryTransmitList(String docKey, int page, int size) throws BaseException {
        Map<String, Object> map = new HashMap<>();
        CcpDoc ccpDoc = new CcpDoc(docKey,null);
        CcpDocThread docThread = new CcpDocThread(ccpDoc);
        //查询转发总数 存入 transmitCount
        ThreadUtil queryTransmitCount = new ThreadUtil(docThread,"queryTransmitCount");
        queryTransmitCount.start();
        String sql = "select creator_key,create_time,`key` from ccp_doc where transmit_key = ? and delete_time = 0 and status != 6 limit ?,?";
        List<Record> transmitRecords = Db.use(JIANGSU_CONFIG).find(sql, docKey,(page-1)*size,size);//得到转发的集合
        if(transmitRecords == null || transmitRecords.isEmpty()){
            throw new BaseException("当前公文无转发记录");
        }
        StringBuilder userKeys = new StringBuilder();//转发人员key集合
        StringBuilder docKeys = new StringBuilder();//转发公文key
        List<String> userKeyList = new ArrayList<>();
        List<String> docKeyList = new ArrayList<>();
        for (Record record:transmitRecords) {
            userKeys.append("?,");
            docKeys.append("?,");
            userKeyList.add(record.getStr("creator_key"));
            docKeyList.add(record.getStr("key"));
        }
        userKeys.deleteCharAt(userKeys.length()-1);
        docKeys.deleteCharAt(docKeys.length()-1);
        //查询转发总人数 存入 multipleReceiveCount
        //设置查询条件和参数
        docThread.setDocKeyCondition(docKeys.toString());
        docThread.setDocKeyConditionParam(docKeyList);
        ThreadUtil queryMultipleReceiveCount = new ThreadUtil(docThread,"queryMultipleReceiveCount");
        queryMultipleReceiveCount.start();
        List<Record> userRecords = docThread.queryUserInfo(userKeys.toString(), userKeyList.toArray(new String[0]));
        try {
            queryTransmitCount.join();
            queryMultipleReceiveCount.join();
        }catch (Exception e){
            log.error("查询转发记录错误",e);
            throw new BaseException("查询转发记录发生错误");
        }
        docThread.isError();//查询是否发生错误
        //将接收总数和人员名字插入数据中
        List<Record> multipleReceiveCount = docThread.getMultipleReceiveCount();
        Map<String, Object> userMap = recordToMapAloneValue(userRecords, "key", "name");
        Map<String, Object> countMap = recordToMapAloneValue(multipleReceiveCount, "doc_key", "count");
        for (Record record:transmitRecords) {
            record.set("name",userMap.get(record.getStr("creator_key")));
            record.set("count",countMap.get(record.getStr("key")));
        }
        map.put("list",transmitRecords);
        //计算总数
        int count = docThread.getTransmitCount();
        int countPage = count%size == 0 ? count/size:count/size+1;
        map.put("page",page);
        map.put("size",size);
        map.put("count",count);
        map.put("count_page",countPage);
        return map;
    }

    @Override
    public Map<String, Object> queryTransmitDetail(String docKey, int page, int size) throws BaseException {
        CcpDoc ccpDoc = new CcpDoc(docKey,null);
        CcpDocThread docThread = new CcpDocThread(ccpDoc);
        Map<String, Object> map = queryUserInfo(ccpDoc,docKey,docThread,page,size);
        //查询转发接收人
        String sql = "select creator_key,create_time from ccp_doc where `key` = ? and delete_time = 0";
        Record record = Db.use(JIANGSU_CONFIG).findFirst(sql, docKey);
        //查询转发人姓名
        String userSql = "select name from sys_user where `key` = ? and delete_time = 0";
        String userName = Db.use(JIANGSU_CONFIG).findFirst(userSql, record.getStr("creator_key")).getStr("name");
        map.put("create_time",record.getStr("create_time"));
        map.put("name",userName);
        return map;
    }

    @Override
    public boolean addCallback(String userKey, String receiveKey, String content,String timestamp) {
        String sql = "update ccp_doc_receive set callback_content = ?,callback_time=? where `key` = ? and timestamp = ? and receive_key = ?";
        int update = Db.use(JIANGSU_CONFIG).update(sql, content, getNowTimeStr(), receiveKey, timestamp, userKey);
        return update > 0;
    }

    @Override
    public Map<String, Object> queryReceiveList(String userKey, String status, int page, int size) throws BaseException {
        Map<String, Object> map = new HashMap<>();
        CcpDocThread docThread = new CcpDocThread();
        docThread.setReceiveKey(userKey);
        docThread.setStatus(status);
        //查询接收集合总数,存入 receiveCount
        ThreadUtil queryReceiveByUserCount = new ThreadUtil(docThread,"queryReceiveByUserCount");
        queryReceiveByUserCount.start();
        String sql = "select doc_key,doc_number,title,handle_time,status,type from ccp_doc_receive where receive_key = ? "+
                (ObjectUtil.stringIsEmptyOrUndefined(status)?"":" and status = ?")+" and delete_time = 0 order by create_time desc limit ?,?";
        List<Object> list = new ArrayList<>();
        list.add(userKey);
        if(!ObjectUtil.stringIsEmptyOrUndefined(status)){
            list.add(status);
        }
        list.add((page-1)*size);
        list.add(size);
        List<Record> records = Db.use(JIANGSU_CONFIG).find(sql, list.toArray());
        //查询转发的key
        StringBuilder docKeys = new StringBuilder();
        for (Record record:records) {
            if(ObjectUtil.stringIsEmpty(record.getStr("doc_key"))){
                continue;
            }
            docKeys.append("'"+record.getStr("doc_key")+"',");
        }
        if(docKeys.length()>0){
            docKeys.deleteCharAt(docKeys.length()-1);
            String docSql = "select `key`,transmit_key from ccp_doc where transmit_key in ("+docKeys+") and creator_key = ? and delete_time = 0";
            List<Record> docRecords = Db.use(JIANGSU_CONFIG).find(docSql, userKey);
            Map<String, Object> docMap = recordToMapAloneValue(docRecords, "transmit_key", "key");
            //将转发记录存入接收记录中
            for (Record record:records) {
                Object docKey = docMap.get(record.getStr("doc_key"));
                if(docKey != null){
                    record.set("transmit_doc_key",docKey);//转发生成的公文key
                    record.set("is_transmit",true);//设置是否有转发为true
                }else{
                    record.set("is_transmit",false);
                }
            }
        }
        try {
            queryReceiveByUserCount.join();
        }catch (Exception e){
            log.error("查询接收数据错误",e);
            throw new BaseException("查询公文数据错误");
        }
        docThread.isError();//判断线程查询是否出错
        //处理分页数据
        int count = docThread.getReceiveCount();
        int countPage = count%size==0?count/size:count/size+1;
        map.put("page",page);
        map.put("size",size);
        map.put("count_page",countPage);
        map.put("count",count);
        map.put("list",ObjectUtil.recordToList(records));
        return map;
    }

    @Override
    public boolean transmitDoc(String userKey, String docKey,String sendPersonKeys,String remind) throws BaseException {
        CcpDoc doc = new CcpDoc();
        doc.setKey(docKey);
        CcpDocThread docThread = new CcpDocThread(doc);
        Record docRecord = docThread.queryDocByKey();//获取需要转发的信息
        if(docRecord == null){
            throw new BaseException("不存在的公文");
        }
        //将公文key设置为转发key
        docRecord.set("transmit_key",docRecord.getStr("key"));
        //重新生成id
        docRecord.set("key",getUUID());
        docRecord.set("_id",getUUID());
        docRecord.set("create_time",getNowTimeStr());//转发创建时间
        docRecord.set("creator_key",userKey);//转发人
        docRecord.set("send_main",sendPersonKeys);//转发接收人
        docRecord.set("carbon_copy",null);//将抄送人员清空
        if(!ObjectUtil.stringIsEmptyOrUndefined(remind)){//是否短信提醒,0否，1是
            docRecord.set("remind",remind);
        }
        //将record转为实体
        Map<String, Object> map = recordToMap(docRecord);
        String jsonString = JSON.toJSONString(map);
        JSONObject jsonObject = JSONObject.parseObject(jsonString);
        CcpDoc newDoc = JSON.toJavaObject(jsonObject, CcpDoc.class);
        //将转发的公文存入数据库
        boolean result = Db.use(JIANGSU_CONFIG).save("ccp_doc", docRecord);
        if(result){
            CcpDocThread ccpDoc = new CcpDocThread(newDoc);
            ThreadUtil thread = new ThreadUtil(ccpDoc,"send");//线程异步发送
            thread.start();
        }
        return result;
    }
}
