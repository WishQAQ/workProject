package com.wit.base.rest.ccpm.po;

import java.math.BigDecimal;

public class CcpFeeStandard {
    private String key;//主键
    private String _id;
    private String memKey;//党员key
    private String memName;//党员名字
    private String paidType;//缴费类型（1：按标准交纳2：按工资比例3：少交党费4：免交党费）
    private String orgZbCode;//组织zbcode
    private String orgName;//组织名字
    private String orgCode;//组织code
    private String orgKey;//组织key
    private BigDecimal money;//党费标准
    private String startDate;//开始时间
    private String endDate;//结束时间
    private BigDecimal feeBase;//党费缴纳基数
    private BigDecimal standardScale;//标准比例（选按比例交纳时存）
    private String reason;//少交或免交原因
    private String status;//状态：1：启用，0：未启用
    private String creatorKey;//创建人key
    private String createTime;//创建时间

    public CcpFeeStandard(String memKey, String paidType, BigDecimal money, String startDate, String endDate, BigDecimal feeBase,
                          BigDecimal standardScale, String reason, String creatorKey) {
        this.memKey = memKey;
        this.paidType = paidType;
        this.money = money;
        this.startDate = startDate;
        this.endDate = endDate;
        this.feeBase = feeBase;
        this.standardScale = standardScale;
        this.reason = reason;
        this.creatorKey = creatorKey;
    }

    public CcpFeeStandard(){}

    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }

    public String getMemKey() {
        return memKey;
    }

    public void setMemKey(String memKey) {
        this.memKey = memKey;
    }

    public String getMemName() {
        return memName;
    }

    public void setMemName(String memName) {
        this.memName = memName;
    }

    public String getPaidType() {
        return paidType;
    }

    public void setPaidType(String paidType) {
        this.paidType = paidType;
    }

    public String getOrgZbCode() {
        return orgZbCode;
    }

    public void setOrgZbCode(String orgZbCode) {
        this.orgZbCode = orgZbCode;
    }

    public String getOrgName() {
        return orgName;
    }

    public void setOrgName(String orgName) {
        this.orgName = orgName;
    }

    public String getOrgCode() {
        return orgCode;
    }

    public void setOrgCode(String orgCode) {
        this.orgCode = orgCode;
    }

    public String getOrgKey() {
        return orgKey;
    }

    public void setOrgKey(String orgKey) {
        this.orgKey = orgKey;
    }

    public BigDecimal getMoney() {
        return money;
    }

    public void setMoney(BigDecimal money) {
        this.money = money;
    }

    public String getStartDate() {
        return startDate;
    }

    public void setStartDate(String startDate) {
        this.startDate = startDate;
    }

    public String getEndDate() {
        return endDate;
    }

    public void setEndDate(String endDate) {
        this.endDate = endDate;
    }

    public BigDecimal getFeeBase() {
        return feeBase;
    }

    public void setFeeBase(BigDecimal feeBase) {
        this.feeBase = feeBase;
    }

    public BigDecimal getStandardScale() {
        return standardScale;
    }

    public void setStandardScale(BigDecimal standardScale) {
        this.standardScale = standardScale;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(String reason) {
        this.reason = reason;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getCreatorKey() {
        return creatorKey;
    }

    public void setCreatorKey(String creatorKey) {
        this.creatorKey = creatorKey;
    }

    public String getCreateTime() {
        return createTime;
    }

    public void setCreateTime(String createTime) {
        this.createTime = createTime;
    }

    public String get_id() {
        return _id;
    }

    public void set_id(String _id) {
        this._id = _id;
    }
}
