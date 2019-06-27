package com.wit.base.rest.ccpm.service.fee.impl;

import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Record;
import com.wit.base.rest.ccpm.po.BaseThreadObject;
import com.wit.base.rest.ccpm.utils.BaseException;
import com.wit.base.rest.ccpm.utils.ObjectUtil;
import com.wit.base.rest.ccpm.utils.ThreadUtil;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static com.wit.base.rest.ccpm.config.DbConfig.JIANGSU_CONFIG;

public class FeeInfo extends BaseThreadObject {
    /** 参数 **/
    private String year;
    private String orgCode;
    private int page;
    private int size;

    /** 结果值 **/
    private int count = 0;//总条数
    private List<Record> feeRecordList;//fee表数据
    private Map<String, List<Record>> memMap;//党员map
    private Map<String,Object> orgMap;//组织map
    private Map<String,Object> resultMap = new HashMap<>();//返回结果，将标准进行排序
    private String memKeyStr = "";//党员key集合逗号分隔


    public FeeInfo(String year,String orgCode,int page,int size){
        this.orgCode = orgCode;
        this.year = year;
        this.page = page;
        this.size = size;
    }

    /**
     * 查询所以信息
     */
    public void queryAll() throws BaseException {
        //查询党员信息
        queryMem();//需要提前查询出该组织下的党员，筛选出当年在该组织又转移组织的人员
        if(memMap.size() < 1){
            loadData();//装载数据
            //当前组织不存在人员，直接返回
            return;
        }
        ThreadUtil queryMem = new ThreadUtil(this,"queryMem");
        //查询组织信息
        ThreadUtil queryOrg = new ThreadUtil(this,"queryOrg");
        queryOrg.start();
        //查询总条数
        ThreadUtil queryFeePageCount = new ThreadUtil(this,"queryFeePageCount");
        queryFeePageCount.start();
        queryFee();//查询Fee表信息
        try {
            queryOrg.join();
            queryFeePageCount.join();
        }catch (Exception e){
            throw new BaseException("查询费用信息异常");
        }
        isError();//判断是否存在异常，存在则抛出
        loadData();//装载数据
    }

    /**
     * 装载数据
     */
    private void loadData(){
        List<Map<String,Object>> list = new ArrayList<>();
        if(this.feeRecordList != null){
            for (Record fee:this.feeRecordList) {
                Map<String,Object> map = new HashMap<>();
                for (int i = 1; i <= 12; i++) {
                    if(fee.getBigDecimal("standard"+i) != null){
                        map.put(i+"",String.format("%.2f",fee.getBigDecimal("standard"+i)));
                    }else{
                        map.put(i+"","");
                    }
                }
                //memMap使用mem_key作为map的key，只会存在一个，取下标0
                String orgCode = this.memMap.get(fee.getStr("mem_key")).get(0).getStr("org_code");
                map.put("mem_name",this.memMap.get(fee.getStr("mem_key")).get(0).getStr("name"));//党员姓名
                map.put("org_name",this.orgMap.get(orgCode));//组织名
                map.put("mem_key",fee.getStr("mem_key"));
                map.put("status",fee.getStr("status"));
                map.put("org_code",orgCode);
                list.add(map);
            }
        }
        resultMap.put("year",this.year);
        resultMap.put("page",this.page);
        resultMap.put("size",this.size);
        resultMap.put("count",this.count);
        resultMap.put("count_page",this.count%size==0?this.count/size:this.count/size+1);
        resultMap.put("list",list);
    }

    /**
     * 查询组织信息
     */
    public void queryOrg(){
        String sql = "select name,org_code from ccp_org where org_code like ? and delete_time = 0";
        List<Record> records = Db.use(JIANGSU_CONFIG).find(sql, orgCode + "%");
        orgMap = ObjectUtil.recordToMapAloneValue(records,"org_code","name");
    }

    /**
     * 查询党员信息
     */
    public void queryMem(){
        String sql = "select `key`,name,org_code from ccp_mem where org_code like ? and delete_time = 0";
        List<Record> records = Db.use(JIANGSU_CONFIG).find(sql, orgCode + "%");
        memMap = ObjectUtil.recordExtractKey(records, "key");
        StringBuffer sqlStr = new StringBuffer("(");
        for (Record record:records) {
            sqlStr.append("'"+record.getStr("key")+"',");
        }
        if(sqlStr.length() > 1){
            sqlStr.deleteCharAt(sqlStr.length()-1);
            memKeyStr = sqlStr.toString()+")";
        }
    }

    /**
     * 查询Fee表信息
     */
    public void queryFee(){
        String sql = "select max(standard1) standard1,max(standard2) standard2,max(standard3) standard3," +
                "max(standard4) standard4,max(standard5) standard5,max(standard6) standard6," +
                "max(standard7) standard7,max(standard8) standard8,max(standard9) standard9," +
                "max(standard10) standard10,max(standard11) standard11,max(standard12) standard12 " +
                ",mem_key,max(status) status from ccp_fee where mem_key in "+this.memKeyStr+" and year = ? and delete_time = 0 group by mem_key order by create_time desc limit ?,?";
        feeRecordList = Db.use(JIANGSU_CONFIG).find(sql,  year,(page-1)*size,size);
    }

    /**
     * 获取fee总条数
     */
    public void queryFeePageCount(){
        String sql = "select count(1) count from (select 1 from ccp_fee where mem_key in "+this.memKeyStr+" and year = ? and delete_time = 0 group by mem_key)t1 ";
        count = Db.use(JIANGSU_CONFIG).findFirst(sql,  year).getInt("count");
    }

    public Map<String, Object> getResultMap() {
        return resultMap;
    }
}
