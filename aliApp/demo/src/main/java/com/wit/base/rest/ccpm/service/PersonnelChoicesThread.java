package com.wit.base.rest.ccpm.service;

import com.jfinal.kit.PropKit;
import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Record;
import com.wit.base.rest.ccpm.dto.PersonnelChoicesDTO;
import com.wit.base.rest.ccpm.po.BaseThreadObject;
import com.wit.base.rest.ccpm.utils.BaseException;
import com.wit.base.rest.ccpm.utils.ObjectUtil;
import com.wit.base.rest.ccpm.utils.ThreadUtil;
import org.apache.commons.collections.CollectionUtils;
import org.apache.log4j.Logger;

import java.util.*;

import static com.wit.base.rest.ccpm.config.DbConfig.JIANGSU_CONFIG;
import static com.wit.base.rest.ccpm.utils.ObjectUtil.removeSubordinate;

public class PersonnelChoicesThread extends BaseThreadObject {
    private Logger log = Logger.getLogger(PersonnelChoicesThread.class);

    private boolean allowJurisdiction = false;//是否允许越权，默认为不允许，用于之后的查看上级的开发

    /**
     * 查询参数
     **/
    private PersonnelChoicesDTO dto;
    private List<Record> manageRecord;//管辖的组织

    StringBuilder orgKeys = new StringBuilder();//组织key条件，？问号
    List<String> keyParamList = new ArrayList<>();//条件参数

    /**
     * 结果
     **/
    private String orgStr;
    private List<Record> orgRecord;//组织信息
    private List<Record> personCountRecords = new ArrayList<>();//组织人员总数信息
    private String orgJurisdictionRestriction;//管辖组织权限限制
    private int lowerOrgCount = 0;//下级组织总数
    private List<Record> memRecords;//人员
    private int groupCount;//党小组个数
    private List<Record> groupPersonRecord;//小组人员
    private int groupPersonCount;//党小组人员总数
    private Map<String, Object> groupPersonNameMap = new HashMap<>();//党小组姓名map
    private List<Record> notInGroupPersonRecord;//不存在党小组的人员
    private int notInGroupPersonCount;//不存在党小组的人员总人数
    private Map<String,Object> orgMap = new HashMap<>();//组织map
    private String notOrgNameStr = "";//根据组织或者人员名查询人员时，没有组织名的组织code
    private int orgCount = 0;//党组织数量
    private List<Record> groupCountRecords;//多个党小组的人量总数

    /**
     * 查询条件
     **/
    private StringBuffer sqlFragment = new StringBuffer(" and org_code regexp ? ");//查询条件
    private List<Object> parameterList = new ArrayList<>();//查询条件的参数

    public PersonnelChoicesThread(PersonnelChoicesDTO dto, List<Record> manageRecord) throws BaseException {
        this.dto = dto;
        //消除存在上级的下级,并得到code连接的字符串
        String tempStr = removeSubordinate(manageRecord);
        this.orgStr = ObjectUtil.stringIsEmptyOrUndefined(dto.getOrg_code_range())?tempStr:dto.getOrg_code_range();
        this.manageRecord = manageRecord;
        initRestriction();//初始化能查询到的组织，权限控制,存入变量 orgJurisdictionRestriction
        parameterList.add(this.orgJurisdictionRestriction);
        //如果参数组织code不为空，判断权限
        if(!ObjectUtil.stringIsEmptyOrUndefined(dto.getOrg_code())){
            boolean include = false;//查询的组织是否在权限内
            for (Record record : manageRecord) {
                if (dto.getOrg_code().contains(record.getStr("org_code"))) {
                    include = true;
                    break;
                }
            }
            if (!include) {
                throw new BaseException("对不起，只能查看管辖组织下的人员");
            }
        }
    }

    /**
     * 根据组织名查询组织
     */
    public void queryOrgByName() throws BaseException {
        //查询组织总数 存入 orgCount
        ThreadUtil queryOrgByNameCount = new ThreadUtil(this,"queryOrgByNameCount");
        queryOrgByNameCount.start();
        String sql = "select `key`,name org_name,org_code,is_leaf+0 is_leaf,sys_org_type type,type_code org_type from sys_org where delete_time = 0 " + this.sqlFragment + " and name like ? limit ?,?";
        List<Object> newParameterList = new ArrayList<>();
        //复制参数
        CollectionUtils.addAll(newParameterList, new Object[this.parameterList.size()]);
        Collections.copy(newParameterList, this.parameterList);
        newParameterList.add("%" + dto.getKeyword() + "%");
        newParameterList.add((dto.getPage() - 1) * dto.getSize());
        newParameterList.add(dto.getSize());
        Object[] parameter = newParameterList.toArray();//转为查询需要用到的数据
        this.orgRecord = Db.use(JIANGSU_CONFIG).find(sql, parameter);
        StringBuilder orgCodes = new StringBuilder("(");
        List<String> codeParam = new ArrayList<>();
        StringBuilder orgKeys = new StringBuilder();
        List<String> keyParamList = new ArrayList<>();
        for (Record record:this.orgRecord) {
            orgCodes.append(" org_code like ? or");
            codeParam.add(record.getStr("org_code")+"%");
            if("org_group".equals(record.getStr("type"))){
                orgKeys.append("?,");
                keyParamList.add(record.getStr("key"));
            }
        }
        //查询党小组人数
        ThreadUtil queryMultipleGroupCount = null;
        if(orgKeys.length() > 0){
            orgKeys.deleteCharAt(orgKeys.length()-1);
            this.orgKeys = orgKeys;
            this.keyParamList = keyParamList;
            queryMultipleGroupCount = new ThreadUtil(this,"queryMultipleGroupCount");
            queryMultipleGroupCount.start();
        }
        //查询组织人数
        if(orgCodes.length()>1){
            String orgCodeStr = orgCodes.substring(0,orgCodes.length()-2)+")";
            //查询组织人数
            String orgPerCountSql = "select count(1) count,org_code from ccp_mem where  "+orgCodeStr+" and delete_time = 0";
            personCountRecords = Db.use(JIANGSU_CONFIG).find(orgPerCountSql, codeParam.toArray());
        }
        calculationPersonNumber();//计算人数
        try {
            queryOrgByNameCount.join();
            if(queryMultipleGroupCount!=null)queryMultipleGroupCount.join();
        }catch (Exception e){
            log.error("根据组织名查询组织错误",e);
            throw new BaseException("查询组织信息错误");
        }
        isError();//判断线程是否错误
        //将党小组人数设置入数据
        Map<String, Object> map = ObjectUtil.recordToMapAloneValue(this.groupCountRecords, "sys_org_key", "count");
        for (Record org : this.orgRecord) {
            Object count = map.get(org.getStr("key"));
            if(count != null){
                org.set("person_count",Integer.parseInt(count.toString()));
            }
        }
        setPaging(this.orgCount);//设置分页数据
        dto.setList(ObjectUtil.recordToList(orgRecord));
    }

    /**
     * 查询多个党小组人数
     */
    public void queryMultipleGroupCount(){
        String groupCountSql = "select count(1) count,sys_org_key from sys_org_user_correlation where sys_org_key in("+orgKeys+") and " +
                " sys_org_type = 'org_group' and delete_time = 0 group by sys_org_key";
        this.groupCountRecords = Db.use(JIANGSU_CONFIG).find(groupCountSql, keyParamList.toArray());
        System.out.println();
    }

    /**
     * 根据组织名查询组织总人数
     */
    public void queryOrgByNameCount(){
        String sql = "select count(1) count from sys_org where (sys_org_type = 'org' or sys_org_type = 'org_group') and " +
                "delete_time = 0 " + this.sqlFragment + " and name like ?";
        List<Object> newParameterList = new ArrayList<>();
        //复制参数
        CollectionUtils.addAll(newParameterList, new Object[this.parameterList.size()]);
        Collections.copy(newParameterList, this.parameterList);
        newParameterList.add("%" + dto.getKeyword() + "%");
        Object[] parameter = newParameterList.toArray();//转为查询需要用到的数据
        orgCount = Db.use(JIANGSU_CONFIG).findFirst(sql, parameter).getInt("count");
    }

    /**
     * 根据组织查询
     */
    public void queryByAllOrg() throws BaseException {
        //查询管辖组织人数 存入personCountRecords
        ThreadUtil queryOrgPersonCount = new ThreadUtil(this, "queryOrgPersonCount");
        queryOrgPersonCount.start();
        queryOrgInfo();//查询组织信息 存入orgRecord
        try {
            queryOrgPersonCount.join();
        } catch (Exception e) {
            log.error("选择人员等待组织查询子线程异常", e);
            throw new BaseException("获取组织信息异常");
        }
        //设置分页返回数据
        int count = this.manageRecord.size();
        dto.setCount(count);
        dto.setCount_page(count % this.dto.getSize() == 0?count /this.dto.getSize():count /this.dto.getSize()+1);
        //多线程执行完毕，查询是否存在异常
        isError();//判断是否存在异常，存在则抛出
        calculationPersonNumber();//计算组织人数
        dto.setOrg_name(PropKit.use("common.properties","gbk").get("baseOrgName"));
        dto.setShort_name(PropKit.use("common.properties","gbk").get("baseOrgShortName"));
        dto.setList(ObjectUtil.recordToList(this.orgRecord));
    }

    //计算组织人数
    private void calculationPersonNumber() {
        //组织和人数组合
        //循环处理组织下的总人数
        for (Record record : this.orgRecord) {
            if(ObjectUtil.stringIsEmpty(record.getStr("person_count"))){
                record.set("person_count",0);//默认组织人数为0
            }
            for (Record count : this.personCountRecords) {
                if (count.getStr("org_code") != null && count.getStr("org_code").contains(record.getStr("org_code"))) {
                    int oldCount = record.getInt("person_count");
                    record.set("person_count", oldCount + count.getInt("count"));
                }
            }
        }
    }

    /**
     * 初始化管辖权限限制
     */
    private void initRestriction() throws BaseException {
        //如果业务选择范围不为空，缩小查询范围为业务模块传入的组织code
        if(!ObjectUtil.stringIsEmptyOrUndefined(dto.getOrg_code_range())){
            boolean include = false;//查询的组织是否在权限内
            for (Record record : manageRecord) {
                if (dto.getOrg_code_range().contains(record.getStr("org_code"))) {
                    include = true;
                    break;
                }
            }
            if (!include) {
                throw new BaseException("对不起，只能查看管辖组织下的人员");
            }
            this.orgJurisdictionRestriction = "^"+dto.getOrg_code_range();
        }else{
            StringBuilder queryCountParameter = new StringBuilder();//管辖的组织
            for (Record record : this.manageRecord) {
                queryCountParameter.append("^" + record.getStr("org_code") + "|");
            }
            this.orgJurisdictionRestriction = queryCountParameter.deleteCharAt(queryCountParameter.length() - 1).toString();
        }
    }

    /**
     * 根据组织code查询人员
     */
    public void queryByOrgCode() throws BaseException {
        getQueryCondition();//得到查询条件
        //查询需要查询的组织的人数
        ThreadUtil queryOrgPersonCount = new ThreadUtil(this, "queryOrgPersonCount");
        queryOrgPersonCount.start();//开启子线程
        //查询当前组织是否是支部，支部则查询所有人员
        String sql = "select is_leaf,name org_name,short_name short_name from ccp_org where org_code = ? and delete_time = 0";
        Record record = Db.use(JIANGSU_CONFIG).findFirst(sql, dto.getOrg_code());
        if(record == null){
            throw new BaseException("没有查询到该组织信息");
        }
        dto.setOrg_name(record.getStr("org_name"));//将当期组织名返回
        dto.setShort_name(record.getStr("short_name"));
        try {
            queryOrgPersonCount.join();
        } catch (Exception e) {
            log.error("选择人员等待查询组织人数子线程异常", e);
            throw new BaseException("获取组织人数异常");
        }
        //多线程执行完毕，查询是否存在异常
        isError();//判断是否存在异常，存在则抛出
        if (!record.getBoolean("is_leaf")) {//查询组织
            //查询下级组织总数  存入lowerOrgCount
            ThreadUtil queryOrgLowerCount = new ThreadUtil(this,"queryOrgLowerCount");
            queryOrgLowerCount.start();
            queryOrgLower();//查询下级组织,存入全局变量 orgRecord
            try {
                queryOrgLowerCount.join();
            }catch (Exception e){
                log.error("选择人员获取下级总数异常",e);
                throw new BaseException("获取下级组织总数异常");
            }
            //多线程执行完毕，查询是否存在异常
            isError();//判断是否存在异常，存在则抛出
            calculationPersonNumber();//计算组织人数
            //将分页数据返回
            dto.setCount(this.lowerOrgCount);
            dto.setCount_page(this.lowerOrgCount%dto.getSize()==0?this.lowerOrgCount/dto.getSize():this.lowerOrgCount/dto.getSize()+1);
            dto.setList(ObjectUtil.recordToList(this.orgRecord));
        } else {//为支部
            //查询党小组总数
            ThreadUtil queryGroupCount = new ThreadUtil(this,"queryGroupCount");
            queryGroupCount.start();
            //查询是否存在党小组
            String groupSql = "select `key` org_group_key,name org_name,0 is_leaf,'group' type,4 org_type from sys_org where sys_org_type = 'org_group' and " +
                    "org_code like ? and delete_time = 0  and status = 0 limit ?,?";
            List<Record> groupRecord = Db.use(JIANGSU_CONFIG).find(groupSql, dto.getOrg_code() + "%",(dto.getPage()-1)*dto.getSize(),dto.getSize());
            if(groupRecord != null && !groupRecord.isEmpty()){//存在党小组，查询党小组信息
                StringBuffer groupKey = new StringBuffer();
                boolean groupKeyExist = false;//默认不存
                for (Record group:groupRecord) {
                    //查看需要查找的党小组是否存在管辖下
                    if(group.getStr("org_group_key").equals(dto.getOrg_group_key())){
                        //将当期党小组名赋值如dto，返回
                        dto.setOrg_name(group.getStr("org_name"));
                        dto.setShort_name(group.getStr("org_name"));
                        groupKeyExist = true;
                    }
                    groupKey.append("'"+group.getStr("org_group_key")+"',");
                    group.set("org_code",dto.getOrg_code());//将组织层级码原因，返回，前端查询党小组下的人员信息带入org_group_key
                }
                if(ObjectUtil.stringIsEmptyOrUndefined(dto.getOrg_group_key())){//如果当小组是空的，查询党小组
                    //查询不在党小组的人员信息 存入 notInGroupPersonRecord
                    ThreadUtil queryNoInGroupPerson = new ThreadUtil(this,"queryNoInGroupPerson");
                    queryNoInGroupPerson.start();
                    //查询不在党小组的人员总数 存入 notInGroupPersonCount
                    ThreadUtil queryNoInGroupPersonCount = new ThreadUtil(this,"queryNoInGroupPersonCount");
                    queryNoInGroupPersonCount.start();
                    groupKey.deleteCharAt(groupKey.length()-1);
                    queryGroup(groupRecord,queryGroupCount,groupKey);//查询党小组信息
                    try {
                        queryNoInGroupPerson.join();
                        queryNoInGroupPersonCount.join();
                    }catch (Exception e){
                        log.error("查询未在党小组人员信息发生错误，等待子线程异常",e);
                        throw new BaseException("查询党小组人员信息发生错误");
                    }
                    //多线程执行完毕，查询是否存在异常
                    isError();//判断是否存在异常，存在则抛出
                    setAvatarOrOrgName(this.notInGroupPersonRecord);//设置用户头像
                    //处理不在党小组的人员信息
                    int count = notInGroupPersonCount;
                    dto.setCount_excp_per(count);
                    int size = dto.getSize_excp_per();
                    dto.setCount_page_excp_per(count%size==0?count/size:count/size+1);
                    dto.setExcp_per_list(ObjectUtil.recordToList(this.notInGroupPersonRecord));
                }else{//查询党小组下的人员
                    if(!groupKeyExist){
                        throw new BaseException("对不起，您没有权限查看该党小组的权限");
                    }
                    //查询党小组下的党员，存入 groupPersonRecord
                    ThreadUtil queryGroupPerson = new ThreadUtil(this,"queryGroupPerson");
                    queryGroupPerson.start();
                    //查询党小组党员姓名，存入 groupPersonNameMap
                    ThreadUtil queryGroupPersonName = new ThreadUtil(this,"queryGroupPersonName");
                    queryGroupPersonName.start();
                    queryGroupPersonCount();//查询党小组人员总数，存入 groupPersonCount
                    try {
                        queryGroupPerson.join();
                        queryGroupPersonName.join();
                    }catch (Exception e){
                        log.error("查询党小组人员信息发生错误，等待子线程异常",e);
                        throw new BaseException("查询党小组人员信息发生错误");
                    }
                    //多线程执行完毕，查询是否存在异常
                    isError();//判断是否存在异常，存在则抛出
                    setAvatarOrOrgName(this.groupPersonRecord);//设置用户头像
                    //处理党员姓名
                    for (Record person:this.groupPersonRecord) {
                        Object mapObj = groupPersonNameMap.get(person.getStr("user_key"));
                        if(mapObj != null){
                            Map<String,Object> map = (Map<String, Object>) mapObj;
                            person.set("mem_name",map.get("name"));
                            person.set("mem_key",map.get("mem_key"));
                            person.set("phone",map.get("phone"));
                            try {
                                person.set("sex",Integer.parseInt(map.get("sex").toString()));
                            }catch (Exception e){
                                person.set("sex",map.get("sex"));
                            }
                            person.set("age",map.get("age"));
                            person.set("org_code",map.get("org_code"));
                            person.set("org_name",record.getStr("org_name"));//插入支部名
                        }
                    }
                    //分页返回数据
                    setPaging(this.groupPersonCount);
                    dto.setList(ObjectUtil.recordToList(this.groupPersonRecord));
                }

            }else{//直接查询支部下的人员信息
                queryByCondition(true);//这里为组织调用，区分是否还需初始化条件
            }
        }
    }

    /**
     * 查询不在党小组的人员，调用前已做权限控制
     */
    public void queryNoInGroupPerson(){
        String sql = "select cm.user_key,cm.name mem_name,cm.key mem_key,so.sys_org_key,1 is_leaf,'person' type,cm.phone,cm.sex_code+0 sex,cm.age,cm.org_code " +
                "from ccp_mem cm left join sys_org_user_correlation so on cm.user_key = so.user_key " +
                "where org_code like ? and cm.delete_time = 0 and (so.sys_org_key is null  or sys_org_type != 'org_group') limit ?,?";
        this.notInGroupPersonRecord = Db.use(JIANGSU_CONFIG).find(sql,dto.getOrg_code()+"%",(dto.getPage_excp_per()-1)*dto.getSize_excp_per(),dto.getSize_excp_per());
        System.out.println();
    }

    /**
     * 查询不在党小组的人员总人数，调用前已做权限控制
     */
    public void queryNoInGroupPersonCount(){
        String sql = "select count(1) count from ccp_mem cm left join sys_org_user_correlation so on cm.user_key = so.user_key " +
                "where org_code like ? and cm.delete_time = 0 and (so.sys_org_key is null  or sys_org_type != 'org_group')";
        this.notInGroupPersonCount = Db.use(JIANGSU_CONFIG).findFirst(sql,dto.getOrg_code()+"%").getInt("count");
    }

    //设置分页信息
    private void setPaging(int count){
        dto.setCount(count);
        dto.setCount_page(count%dto.getSize()==0?count/dto.getSize():count/dto.getSize()+1);
    }

    /**
     * 查询党小组人员,调用前已做权限控制
     */
    public void queryGroupPerson(){
        String sql = "select user_key,user_name mem_name,1 is_leaf,'person' type from sys_org_user_correlation where sys_org_key = ? and " +
                "sys_org_type = 'org_group' and delete_time = 0 limit ?,?";
        this.groupPersonRecord = Db.use(JIANGSU_CONFIG).find(sql, dto.getOrg_group_key(),(dto.getPage()-1)*dto.getSize(),dto.getSize());
    }

    /**
     * 查询党小组人员姓名
     */
    public void queryGroupPersonName(){
        String sql = "select user_key,`key` mem_key,name,phone,sex_code+0 sex,age,org_code from ccp_mem where org_code like ?  and delete_time = 0";
        List<Record> records = Db.use(JIANGSU_CONFIG).find(sql, dto.getOrg_code() + "%");
        this.groupPersonNameMap = ObjectUtil.recordToMapMultipleValue(records, "user_key");
    }

    //查询党小组人员总数
    public void queryGroupPersonCount(){
        String sql = "select count(1) count from sys_org_user_correlation where sys_org_key = ? and " +
                "sys_org_type = 'org_group' and delete_time = 0 ";
        this.groupPersonCount = Db.use(JIANGSU_CONFIG).findFirst(sql, dto.getOrg_group_key()).getInt("count");
    }

    /**
     * 查询党小组
     */
    private void queryGroup(List<Record> groupRecord,ThreadUtil queryGroupCount,StringBuffer groupKey) throws BaseException {
        String groupPersonCountSql = "select sys_org_key,count(1) count from sys_org_user_correlation where sys_org_type = 'org_group' " +
                " and sys_org_key in("+groupKey+") and delete_time = 0";
        List<Record> personCountRecord = Db.use(JIANGSU_CONFIG).find(groupPersonCountSql);
        Map<String, Object> personCountMap = ObjectUtil.recordToMapAloneValue(personCountRecord, "sys_org_key", "count");
        //将人员数加入党小组中
        for (Record group:groupRecord) {
            Object countObj = personCountMap.get(group.getStr("org_group_key"));
            int count = 0;
            if(countObj != null){
                count = Integer.parseInt(countObj.toString());
            }
            group.set("person_count",count);
        }
        try {
            queryGroupCount.join();//等待子线程查询结果，党小组总数  groupCount
        }catch (Exception e){
            throw new BaseException("查询党小组总数异常");
        }
        //多线程执行完毕，查询是否存在异常
        isError();//判断是否存在异常，存在则抛出
        //分页返回数据
        setPaging(this.groupCount);
        dto.setList(ObjectUtil.recordToList(groupRecord));
    }

    /**
     * 查询党小组总数，调用方法前已做权限验证，不用验证
     */
    public void queryGroupCount(){
        String sql = "select count(1) count from sys_org where sys_org_type = 'org_group' and " +
                "org_code like ? and delete_time = 0  and status = 0";
        groupCount = Db.use(JIANGSU_CONFIG).findFirst(sql, dto.getOrg_code() + "%").getInt("count");
    }

    /**
     * 根据条件查询
     */
    public void queryByCondition(boolean isOrg) throws BaseException {
        ThreadUtil queryOrgPersonCount = null;
        if(!isOrg){//不是上列组织机构选择调用，需初始化条件
            getQueryCondition();//得到查询条件
            //查询需要查询的组织的人数
            queryOrgPersonCount = new ThreadUtil(this, "queryOrgPersonCount");
            queryOrgPersonCount.start();//开启子线程
        }
        queryPerson();//查询支部人员,存入全局变量 memRecords
        try {
            if(queryOrgPersonCount !=null){
                queryOrgPersonCount.join();
            }
        }catch (Exception e){
            log.error("按角色选择，等待查询总人数子线程异常",e);
            throw new BaseException("查询总人数异常");
        }
        //多线程执行完毕，查询是否存在异常
        isError();//判断是否存在异常，存在则抛出
        setAvatarOrOrgName(this.memRecords);//设置用户头像
        int count = 0;
        for (Record record:this.personCountRecords) {
            count += record.getInt("count");//循环累积所以总数，按角色查询时存在多个支部
        }
        setPaging(count);
        dto.setList(ObjectUtil.recordToList(this.memRecords));
    }

    /**
     * 设置人员头像
     * @param list 人员结果集
     */
    private void setAvatarOrOrgName(List<Record> list) throws BaseException {
        StringBuffer str = new StringBuffer();
        //将用户的key拼接，用于查询用户头像
        StringBuffer orgTemp = new StringBuffer();
        for (Record record:list) {
            if(!ObjectUtil.stringIsEmpty(record.getStr("user_key"))){
                str.append("'"+record.getStr("user_key")+"',");
            }
            Object orgName = this.orgMap.get(record.getStr("org_code"));
            if(orgName != null){
                record.set("org_name",orgName.toString());
            }else{
                orgTemp.append("'"+record.getStr("org_code")+"',");
            }
        }
        ThreadUtil queryOrgName = null;//查询组织名
        if(orgTemp.length() > 0){
            this.notOrgNameStr = orgTemp.deleteCharAt(orgTemp.length()-1).toString();
            queryOrgName = new ThreadUtil(this,"queryOrgName");
            queryOrgName.start();
        }
        List<Record> avatarRecords = null;
        if(str.length()>0){
            str.deleteCharAt(str.length()-1);
            String sql = "select avatar,`key` from sys_user where delete_time = 0 and `key` in ("+str+")";
            avatarRecords = Db.use(JIANGSU_CONFIG).find(sql);
        }
        try {
            if(queryOrgName!=null)
            queryOrgName.join();
        }catch (Exception e){
            log.error("查询组织名异常",e);
            throw new BaseException("查询组织名异常");
        }
        //判断子线程是否出现异常
        isError();//判断是否存在异常，存在则抛出
        if(avatarRecords != null){
            //将头像的结果集转为map，存入用户集合
            Map<String, Object> avatarMap = ObjectUtil.recordToMapAloneValue(avatarRecords, "key", "avatar");
            for (Record record:list) {
                if(!ObjectUtil.stringIsEmpty(record.getStr("user_key"))){
                    record.set("avatar",avatarMap.get(record.getStr("user_key")));
                }else{
                    record.set("avatar","");
                }
                Object orgName = this.orgMap.get(record.getStr("org_code"));
                if(orgName != null){
                    record.set("org_name",orgName.toString());
                }
            }
        }else{
            for (Record record:list) {
                record.set("avatar","");
                Object orgName = this.orgMap.get(record.getStr("org_code"));
                if(orgName != null){
                    record.set("org_name",orgName.toString());
                }
            }
        }
    }

    /**
     * 查询组织名
     */
    public void queryOrgName(){
        String sql1 = "select org_code,name org_name from ccp_org where ";
        String sql = "select org_code,name org_name from ccp_org where org_code REGEXP ? and org_code in("+this.notOrgNameStr+") and delete_time = 0";
        List<Record> records = Db.use(JIANGSU_CONFIG).find(sql, this.orgJurisdictionRestriction);
        this.orgMap = ObjectUtil.recordToMapAloneValue(records,"org_code","org_name");
    }

    /**
     * 查询人员
     */
    public void queryPerson() {
        String sql = "select name mem_name,`key` mem_key,1 is_leaf,org_code,user_key,'person' type,phone,sex_code+0 sex,age" +
                " from ccp_mem where delete_time = 0  " + sqlFragment + " limit ?,?";
        List<Object> newParameterList = new ArrayList<>();
        //复制参数
        CollectionUtils.addAll(newParameterList, new Object[this.parameterList.size()]);
        Collections.copy(newParameterList, this.parameterList);
        //将本查询需要用到的参数添加入list
        newParameterList.add((dto.getPage() - 1) * dto.getSize());
        newParameterList.add(dto.getSize());
        Object[] parameter = newParameterList.toArray();//转为查询需要用到的数据
        this.memRecords = Db.use(JIANGSU_CONFIG).find(sql, parameter);
    }

    /**
     * 得到查询条件
     */
    public void getQueryCondition() {
        if (!ObjectUtil.stringIsEmptyOrUndefined(dto.getOrg_code())) {//查询组织
            sqlFragment.append(" and org_code like ? ");
            this.parameterList.add(dto.getOrg_code()+"%");
        }
        if (!ObjectUtil.stringIsEmptyOrUndefined(dto.getMem_name())) {//查询人员姓名
            sqlFragment.append(" and name like ? ");
            this.parameterList.add("%" + dto.getMem_name() + "%");
        }
        if (dto.getSex() != null) {//查询人员姓名
            sqlFragment.append(" and sex_code = ? ");
            this.parameterList.add(dto.getSex());
        }
        if (!ObjectUtil.stringIsEmptyOrUndefined(dto.getEducation_level_key())) {//查询学历
            StringBuffer temp = new StringBuffer();
            String[] getEducationLevelKeyArray = dto.getEducation_level_key().split(",");
            for (int i = 0; i < getEducationLevelKeyArray.length; i++) {
                temp.append("?,");
                this.parameterList.add(getEducationLevelKeyArray[i]);
            }
            temp.deleteCharAt(temp.length()-1);
            sqlFragment.append(" and education_code in ("+temp+") ");
        }
        if (dto.getAge() != null) {//查询年龄段
            int[][] age = dto.getAge();
            StringBuffer tempStr = new StringBuffer(" and (");
            for (int[] array : age) {
                tempStr.append("(age >= ? and age <= ?) or ");
                for (int i = 0; i < 2; i++) {
                    this.parameterList.add(array[i]);
                }
            }
            String tempFragment = tempStr.substring(0, tempStr.length() - 3) + ") ";//删除最后的or
            sqlFragment.append(tempFragment);
        }
        if(!ObjectUtil.stringIsEmptyOrUndefined(dto.getKeyword())){//查询组织名或者人员名
            String sql = "select org_code,name org_name from ccp_org where org_code REGEXP ? and name like ? and delete_time = 0";
            List<Record> records = Db.use(JIANGSU_CONFIG).find(sql, this.orgJurisdictionRestriction, "%" + dto.getKeyword() + "%");
            if(records != null){
                this.orgMap = ObjectUtil.recordToMapAloneValue(records,"org_code","org_name");
            }
            StringBuffer temp = new StringBuffer();
            for (Record record:records) {
                temp.append("?,");
                this.parameterList.add(record.getStr("org_code"));
            }
            if(temp.length() > 0){
                temp.deleteCharAt(temp.length()-1);
                sqlFragment.append(" and (org_code in("+temp+") or name like ?)");
                this.parameterList.add("%"+dto.getKeyword()+"%");
            }else{
                sqlFragment.append(" and  name like ? ");
                this.parameterList.add("%"+dto.getKeyword()+"%");
            }
        }
    }

    //查询下级组织,调用此方法时已做权限控制，此处不再多余
    public void queryOrgLower() {
        //组织is_leaf默认为0，表示是叶子节点，只有人员不是叶子节点
        String sql = "select name org_name,org_code,0 is_leaf,'org' type,org_type+0 org_type from ccp_org where org_code like ? and delete_time = 0 limit ?,?";
        //只查询下一级组织
        this.orgRecord = Db.use(JIANGSU_CONFIG).find(sql, dto.getOrg_code() + "___",(dto.getPage()-1)*dto.getSize(),dto.getSize());
    }

    /**
     * 获取下级组织总数,调用此方法时已做权限控制，此处不再多余
     */
    public void queryOrgLowerCount() {
        //组织is_leaf默认为0，表示是叶子节点，只有人员不是叶子节点
        String sql = "select count(1) count from ccp_org where org_code like ? and delete_time = 0";
        //只查询下一级组织
        Record record = Db.use(JIANGSU_CONFIG).findFirst(sql, dto.getOrg_code() + "___");
        this.lowerOrgCount = record.getInt("count");
    }

    //查询组织信息,调用此方法时已做权限控制，此处不再多余
    public void queryOrgInfo() {
        //查询所管辖的组织,组织is_leaf默认为0，表示是叶子节点，只有人员不是叶子节点
        String sql = "select org_code,name org_name,0 is_leaf,'org' type,org_type+0 org_type from ccp_org where delete_time = 0 and org_code in(" + orgStr + ") limit ?,?";
        this.orgRecord = Db.use(JIANGSU_CONFIG).find(sql, (dto.getPage() - 1) * dto.getSize(),dto.getSize());
    }

    /**
     * 获取组织总人数
     */
    public void queryOrgPersonCount() {
        String countSql = "select org_code,count(1) count from ccp_mem where  delete_time = 0 " + this.sqlFragment + "  group by org_code";
        List<Object> newParameterList = new ArrayList<>();
        //复制参数
        CollectionUtils.addAll(newParameterList, new Object[this.parameterList.size()]);
        Collections.copy(newParameterList, this.parameterList);
        Object[] parameter = newParameterList.toArray();//转为查询需要用到的数据
        this.personCountRecords = Db.use(JIANGSU_CONFIG).find(countSql, parameter);
        System.out.println();
    }

}
