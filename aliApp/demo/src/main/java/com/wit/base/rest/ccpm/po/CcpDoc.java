package com.wit.base.rest.ccpm.po;

import java.io.Serializable;

public class CcpDoc implements Serializable {
    private String key;
    private String _id;
    private String transmitKey;//转发的公文key
    private String content;//正文
    private String title;//标题
    private String dictKey;//公文类型key
    private String dictName;//公文类型名
    private String docNumber;//公文文号
    private String orgCode;//部门key
    private String orgName;//部门名
    private String handleTime;//处理时间
    private String remark;//备注
    private String sendMain;//主发
    private String carbonCopy;//抄送
    private Integer remind;//是否电话提醒
    private Integer status;//状态，0待发，1发送
    private String creatorKey;//创建人
    private String creator;//创建人姓名
    private String timestamp;//时间戳

    public CcpDoc() {
    }

    public CcpDoc(String key, String creatorKey) {
        this.key = key;
        this.creatorKey = creatorKey;
    }

    public String get_id() {
        return _id;
    }

    public void set_id(String _id) {
        this._id = _id;
    }

    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDictKey() {
        return dictKey;
    }

    public void setDictKey(String dictKey) {
        this.dictKey = dictKey;
    }

    public String getDictName() {
        return dictName;
    }

    public void setDictName(String dictName) {
        this.dictName = dictName;
    }

    public String getDocNumber() {
        return docNumber;
    }

    public void setDocNumber(String docNumber) {
        this.docNumber = docNumber;
    }

    public String getOrgCode() {
        return orgCode;
    }

    public void setOrgCode(String orgCode) {
        this.orgCode = orgCode;
    }

    public String getOrgName() {
        return orgName;
    }

    public void setOrgName(String orgName) {
        this.orgName = orgName;
    }

    public String getHandleTime() {
        return handleTime;
    }

    public void setHandleTime(String handleTime) {
        this.handleTime = handleTime;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    public String getSendMain() {
        return sendMain;
    }

    public void setSendMain(String sendMain) {
        this.sendMain = sendMain;
    }

    public String getCarbonCopy() {
        return carbonCopy;
    }

    public void setCarbonCopy(String carbonCopy) {
        this.carbonCopy = carbonCopy;
    }

    public Integer getRemind() {
        return remind;
    }

    public void setRemind(Integer remind) {
        this.remind = remind;
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public String getCreatorKey() {
        return creatorKey;
    }

    public void setCreatorKey(String creatorKey) {
        this.creatorKey = creatorKey;
    }

    public String getCreator() {
        return creator;
    }

    public void setCreator(String creator) {
        this.creator = creator;
    }

    public String getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(String timestamp) {
        this.timestamp = timestamp;
    }

    public String getTransmitKey() {
        return transmitKey;
    }

    public void setTransmitKey(String transmitKey) {
        this.transmitKey = transmitKey;
    }
}
