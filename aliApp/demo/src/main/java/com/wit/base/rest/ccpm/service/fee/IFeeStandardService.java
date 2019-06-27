package com.wit.base.rest.ccpm.service.fee;

import com.alibaba.fastjson.JSONObject;
import com.wit.base.rest.ccpm.po.CcpFeeStandard;
import com.wit.base.rest.ccpm.utils.BaseException;

import java.util.List;
import java.util.Map;

public interface IFeeStandardService {
    /**
     * 添加缴费标准
     * @param standard
     * @return
     */
    public boolean addStandard(CcpFeeStandard standard) throws BaseException;

    /**
     * 查询标准表信息是否存在
     * @param memKey
     * @param startDate
     * @param endDate
     * @return
     */
    public boolean existsStandard(String memKey,String startDate,String endDate);

    /**
     * 根据年和组织层级码获取fee信息
     * @param year 年
     * @param orgCode 组织层级码
     * @param size 页面显示数量
     * @param page 当前页
     * @return
     */
    public Map<String, Object> getFeeListByOrgCodeAndYear(String year,String orgCode,String size,String page) throws BaseException;

    /**
     * 修改fee状态
     * @param json mem_key 党员key，year，修改的年
     * @param status 状态
     * @return
     */
    public boolean updateFeeStatus(JSONObject json, String status) throws BaseException;
}
