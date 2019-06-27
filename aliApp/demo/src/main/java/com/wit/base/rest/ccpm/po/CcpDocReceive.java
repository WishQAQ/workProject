package com.wit.base.rest.ccpm.po;

/**
 * 公文收文实体
 */
public class CcpDocReceive {
    private String key;
    private String _id;
    private String docKey;//公文key
    private String transmitKey;//转发的公文key
    private String content;//正文
    private String title;//标题
    private String sendPerson;//发送人key
    private String sendPersonName;//发送人姓名
    private String sendOrgCode;//发送人单位
    private String sendOrgName;//发送人单位名
    private String receiveKey;//接收人key
    private String receiveName;//接收人姓名
    private String orgCode;//接收人单位key
    private String orgName;//接收人单位名
    private String handleTime;//处理时限
    private String type;//接收类型，0主送，1抄送
    private Integer status;//状态,默认为未读  0未读，1已读，2待办，3在办，4已办，5已办结
    private String creatorKey;//创建人key
    private String createTime;///创建时间

    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }

    public String get_id() {
        return _id;
    }

    public void set_id(String _id) {
        this._id = _id;
    }

    public String getDocKey() {
        return docKey;
    }

    public void setDocKey(String docKey) {
        this.docKey = docKey;
    }

    public String getTransmitKey() {
        return transmitKey;
    }

    public void setTransmitKey(String transmitKey) {
        this.transmitKey = transmitKey;
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

    public String getSendPerson() {
        return sendPerson;
    }

    public void setSendPerson(String sendPerson) {
        this.sendPerson = sendPerson;
    }

    public String getSendPersonName() {
        return sendPersonName;
    }

    public void setSendPersonName(String sendPersonName) {
        this.sendPersonName = sendPersonName;
    }

    public String getSendOrgCode() {
        return sendOrgCode;
    }

    public void setSendOrgCode(String sendOrgCode) {
        this.sendOrgCode = sendOrgCode;
    }

    public String getSendOrgName() {
        return sendOrgName;
    }

    public void setSendOrgName(String sendOrgName) {
        this.sendOrgName = sendOrgName;
    }

    public String getReceiveKey() {
        return receiveKey;
    }

    public void setReceiveKey(String receiveKey) {
        this.receiveKey = receiveKey;
    }

    public String getReceiveName() {
        return receiveName;
    }

    public void setReceiveName(String receiveName) {
        this.receiveName = receiveName;
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

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
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

    public String getCreateTime() {
        return createTime;
    }

    public void setCreateTime(String createTime) {
        this.createTime = createTime;
    }
}
