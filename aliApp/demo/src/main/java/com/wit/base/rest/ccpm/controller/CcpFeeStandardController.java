package com.wit.base.rest.ccpm.controller;

import com.alibaba.fastjson.JSONObject;
import com.jfinal.aop.Before;
import com.jfinal.ext.interceptor.GET;
import com.jfinal.ext.interceptor.POST;
import com.wit.base.rest.ccpm.po.CcpFeeStandard;
import com.wit.base.rest.ccpm.service.fee.IFeeStandardService;
import com.wit.base.rest.ccpm.service.fee.impl.FeeStandardServiceImpl;
import com.wit.base.rest.ccpm.utils.BaseException;
import com.wit.base.rest.ccpm.utils.DataTemplate;
import com.wit.base.rest.ccpm.utils.ObjectUtil;
import io.jboot.web.controller.JbootController;
import io.jboot.web.controller.annotation.RequestMapping;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.math.BigDecimal;
import java.util.Map;

@RequestMapping("/api/v1/feeStandard")
public class CcpFeeStandardController extends JbootController {
    private Logger log = LoggerFactory.getLogger(CcpFeeStandardController.class);

    private IFeeStandardService standardService = new FeeStandardServiceImpl();

    /**
     * 添加党费标准
     */
    @Before(POST.class)
    public void addStandard(){
        JSONObject json = getRawObject();
        String memKey = json.getString("mem_key");
        String paidType = json.getString("paid_type");
        BigDecimal money = json.getBigDecimal("money");
        String startDate = json.getString("start_date");
        String endDate = json.getString("end_date");
        BigDecimal feeBase = json.getBigDecimal("fee_base");
        BigDecimal standardScale = json.getBigDecimal("standard_scale");
        String reason = json.getString("reason");
        String creatorKey = json.getString("creator_key");//TODO 创建人，此处暂时取值,获取登录状态下的user_key
        CcpFeeStandard standard = new CcpFeeStandard(memKey,paidType,money,startDate,endDate,feeBase,standardScale,reason,creatorKey);
        String attributeName = ObjectUtil.objAttributeIsEmpty(standard,false, "memKey", "paidType", "money", "startDate", "endDate");
        if(attributeName != null){
            renderJson(DataTemplate.wrapErrorData("参数"+attributeName+"不能为空"));
            return;
        }
        boolean result = false;
        try {
            result = standardService.addStandard(standard);
        } catch (BaseException e) {
            renderJson(DataTemplate.wrapErrorData(e.getMessage()));
            return;
        }
        if(result){
            renderJson(DataTemplate.wrapSuccessData("添加成功"));
        }else {
            renderJson(DataTemplate.wrapErrorData("添加失败"));
        }
    }

    /**
     * 获取fee记录
     */
    @Before(GET.class)
    public void queryFee(){
        String year = getPara("year");
        String orgCode = getPara("org_code");
        String page = getPara("page");
        String size = getPara("size");
        if(ObjectUtil.stringIsEmptyOrUndefined(orgCode)){
            renderJson(DataTemplate.wrapErrorData("orgCode不能为空"));
            return;
        }
        Map<String, Object> map = null;
        try {
            map = standardService.getFeeListByOrgCodeAndYear(year, orgCode,size,page);
        } catch (BaseException e) {
            renderJson(DataTemplate.wrapErrorData(e.getMessage()));
            return;
        }
        renderJson(DataTemplate.wrapSuccessData(map));
    }

    /**
     * 启用fee
     */
    @Before(POST.class)
    public void enablingFee(){
        JSONObject json = getRawObject();
        boolean result = false;//启动状态为0
        try {
            result = standardService.updateFeeStatus(json, "0");
        } catch (BaseException e) {
            renderJson(DataTemplate.wrapErrorData(e.getMessage()));
        }
        if(result){
            renderJson(DataTemplate.wrapSuccessData("启用成功"));
        }else{
            renderJson(DataTemplate.wrapErrorData("启用失败"));
        }
    }

    /**
     * 禁用fee
     */
    @Before(POST.class)
    public void noEnablingFee(){
        JSONObject json = getRawObject();
        boolean result = false;//禁用状态为1
        try {
            result = standardService.updateFeeStatus(json, "1");
        } catch (BaseException e) {
            renderJson(DataTemplate.wrapErrorData(e.getMessage()));
        }
        if(result){
            renderJson(DataTemplate.wrapSuccessData("禁用成功"));
        }else{
            renderJson(DataTemplate.wrapErrorData("禁用失败"));
        }
    }

}
