package com.wit.base.rest.ccpm.service;

import com.jfinal.kit.PropKit;
import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Record;
import com.wit.base.rest.ccpm.dto.PersonnelChoicesDTO;
import com.wit.base.rest.ccpm.utils.BaseException;
import com.wit.base.rest.ccpm.utils.ObjectUtil;

import java.util.*;

import static com.wit.base.rest.ccpm.config.DbConfig.JIANGSU_CONFIG;

public class CcpPersonnelChoicesServiceImpl implements ICcpPersonnelChoicesService{
    @Override
    public String getQueryType(String userKey, String identity) throws BaseException {
        //查询是否为管理员
        List<Record> records = getManagerOrg(userKey);
        if(records == null || records.isEmpty()){
            throw new BaseException("对不起，只有管理员存在权限选择人员");
        }
        //获取选择类型 TODO 此处暂时用配置文件配置，待确定
        String choicesType = PropKit.use("common.properties", "gbk").get("choicesType");
        return choicesType;
    }

    @Override
    public PersonnelChoicesDTO query(String userKey, PersonnelChoicesDTO dto) throws BaseException {
        List<Record>  roleRecord = getManagerOrg(userKey);
        if(roleRecord == null || roleRecord.isEmpty()){
            throw new BaseException("对不起，只有管理员存在权限选择人员");
        }
        PersonnelChoicesThread choices = new PersonnelChoicesThread(dto,roleRecord);
        if(!ObjectUtil.stringIsEmpty(dto.getOrg_code()) && "org".equals(dto.getIdentity())){
            choices.queryByOrgCode();//查询指定组织
        }else if("condition".equals(dto.getIdentity())){
            //按角色(条件)查询,参数默认为false，表示不为组织机构选择调用，需要初始化查询条件
           choices.queryByCondition(false);
        }else if("org".equals(dto.getIdentity())){//组织为空，且标识为查询组织
            if(ObjectUtil.stringIsEmptyOrUndefined(dto.getKeyword())){
                choices.queryByAllOrg();//查询所有管辖的组织信息
            }else {
                //根据关键字查询组织
                choices.queryOrgByName();
            }

        }
        return dto;
    }

    /**
     * 获取管辖组织
     * @param userKey
     * @return
     */
    public List<Record> getManagerOrg(String userKey){
        //查询是否为管理员
        String sql = "select org_code from sys_user_role where user_key = ? and deleted_time = 0";
        List<Record> roleRecord = Db.use(JIANGSU_CONFIG).find(sql, userKey);
        return roleRecord;
    }



}
