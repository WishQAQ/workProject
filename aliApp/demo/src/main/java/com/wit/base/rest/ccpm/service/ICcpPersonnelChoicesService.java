package com.wit.base.rest.ccpm.service;

import com.jfinal.plugin.activerecord.Record;
import com.wit.base.rest.ccpm.dto.PersonnelChoicesDTO;
import com.wit.base.rest.ccpm.utils.BaseException;

import java.util.List;

/**
 * 人员选择器逻辑层
 */
public interface ICcpPersonnelChoicesService {

    /**
     * 获取查询类型
     * @param userKey 用户key
     * @param identity 标识
     */
    public String getQueryType(String userKey,String identity) throws BaseException;


    /**
     *  查询人员
     * @param userKey
     * @param dto 人员选择实体
     */
    public PersonnelChoicesDTO query(String userKey, PersonnelChoicesDTO dto) throws BaseException;

    /**
     * 获取管辖组织
     * @param userKey
     * @return
     */
    public List<Record> getManagerOrg(String userKey);

}
