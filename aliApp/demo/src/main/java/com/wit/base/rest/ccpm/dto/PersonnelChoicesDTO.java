package com.wit.base.rest.ccpm.dto;

import java.io.Serializable;
import java.util.List;
import java.util.Map;

public class PersonnelChoicesDTO implements Serializable {
    private int page = 1;//默认为第一页
    private int count = 0;//默认0条
    private int size = 10;//默认显示10条
    private int count_page = 0;//默认总页数为0
    private int page_excp_per = 1;//不在党小组的人员分页
    private int size_excp_per = 10;//不在党小组的人员分页
    private int count_excp_per = 0;//不在党小组的人员分页默认0条
    private int count_page_excp_per = 0;//不在党小组的人员分页,默认总页数为0
    private List<Map<String, Object>> list;//数据
    private List<Map<String, Object>> excp_per_list;//不在党小组的人员数据
    private String org_name;//组织名
    private String short_name;//组织名缩写
    private String type = "all";//前端需要的参数，固定
    /**
     * 查询条件
     **/
    private String org_group_key;//党小组key
    private String org_code;//组织code
    private String identity;//标识
    private String mem_name;//党员姓名
    private String join_party_time;//入党时间
    private Integer sex;//0为女，1为男
    private int[][] age;//年龄段
    private String education_level_key;//学历
    private String org_code_range;//业务模块需要选择的组织范围
    private String keyword;//组织或者人员名

    public PersonnelChoicesDTO(int page, int size, String orgCode, String identity, String memName, String joinPartyTime, Integer sex, int[][] age,
                               String educationLevelKey,String orgGroupKey,String orgCodeRange,int pagePer,int sizePer,String keyword) {
        this.page = page;
        this.size = size;
        this.org_code = orgCode;
        this.identity = identity;
        this.mem_name = memName;
        this.join_party_time = joinPartyTime;
        this.sex = sex;
        this.age = age;
        this.education_level_key = educationLevelKey;
        this.org_group_key = orgGroupKey;
        this.org_code_range = orgCodeRange;
        this.page_excp_per = pagePer;
        this.size_excp_per = sizePer;
        this.keyword = keyword;
    }

    public int getPage() {
        return page;
    }

    public void setPage(int page) {
        this.page = page;
    }

    public int getCount() {
        return count;
    }

    public void setCount(int count) {
        this.count = count;
    }

    public int getSize() {
        return size;
    }

    public void setSize(int size) {
        this.size = size;
    }


    public String getIdentity() {
        return identity;
    }

    public void setIdentity(String identity) {
        this.identity = identity;
    }

    public String getOrg_code() {
        return org_code;
    }

    public void setOrg_code(String org_code) {
        this.org_code = org_code;
    }

    public List<Map<String, Object>> getList() {
        return list;
    }

    public void setList(List<Map<String, Object>> list) {
        this.list = list;
    }

    public String getMem_name() {
        return mem_name;
    }

    public void setMem_name(String mem_name) {
        this.mem_name = mem_name;
    }

    public String getJoin_party_time() {
        return join_party_time;
    }

    public void setJoin_party_time(String join_party_time) {
        this.join_party_time = join_party_time;
    }

    public Integer getSex() {
        return sex;
    }

    public void setSex(Integer sex) {
        this.sex = sex;
    }

    public int[][] getAge() {
        return age;
    }

    public void setAge(int[][] age) {
        this.age = age;
    }

    public int getCount_page() {
        return count_page;
    }

    public void setCount_page(int count_page) {
        this.count_page = count_page;
    }

    public String getOrg_name() {
        return org_name;
    }

    public void setOrg_name(String org_name) {
        this.org_name = org_name;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getOrg_group_key() {
        return org_group_key;
    }

    public int getPage_excp_per() {
        return page_excp_per;
    }

    public void setPage_excp_per(int page_excp_per) {
        this.page_excp_per = page_excp_per;
    }

    public int getSize_excp_per() {
        return size_excp_per;
    }

    public void setSize_excp_per(int size_excp_per) {
        this.size_excp_per = size_excp_per;
    }

    public int getCount_excp_per() {
        return count_excp_per;
    }

    public void setCount_excp_per(int count_excp_per) {
        this.count_excp_per = count_excp_per;
    }

    public int getCount_page_excp_per() {
        return count_page_excp_per;
    }

    public void setCount_page_excp_per(int count_page_excp_per) {
        this.count_page_excp_per = count_page_excp_per;
    }

    public void setOrg_group_key(String org_group_key) {
        this.org_group_key = org_group_key;
    }

    public List<Map<String, Object>> getExcp_per_list() {
        return excp_per_list;
    }

    public void setExcp_per_list(List<Map<String, Object>> excp_per_list) {
        this.excp_per_list = excp_per_list;
    }

    public String getOrg_code_range() {
        return org_code_range;
    }

    public void setOrg_code_range(String org_code_range) {
        this.org_code_range = org_code_range;
    }

    public String getEducation_level_key() {
        return education_level_key;
    }

    public void setEducation_level_key(String education_level_key) {
        this.education_level_key = education_level_key;
    }

    public String getKeyword() {
        return keyword;
    }

    public void setKeyword(String keyword) {
        this.keyword = keyword;
    }

    public String getShort_name() {
        return short_name;
    }

    public void setShort_name(String short_name) {
        this.short_name = short_name;
    }
}
