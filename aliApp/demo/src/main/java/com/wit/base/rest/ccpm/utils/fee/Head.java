package com.wit.base.rest.ccpm.utils.fee;

import com.thoughtworks.xstream.annotations.XStreamAlias;

public class Head {

    public String getMerPtcId() {
        return MerPtcId;
    }

    public void setMerPtcId(String merPtcId) {
        MerPtcId = merPtcId;
    }

    public String getReqTime() {
        return ReqTime;
    }

    public void setReqTime(String reqTime) {
        ReqTime = reqTime;
    }

    public String getTranCode() {
        return TranCode;
    }

    public void setTranCode(String tranCode) {
        TranCode = tranCode;
    }

    public String getVersion() {
        return Version;
    }

    public void setVersion(String version) {
        Version = version;
    }

    @XStreamAlias("MerPtcId")
    private String MerPtcId;

    @XStreamAlias("ReqTime")
    private String ReqTime;

    @XStreamAlias("TranCode")
    private String TranCode;

    @XStreamAlias("Version")
    private String Version;


    @Override
    public String toString() {
        return "Head{" +
                "MerPtcId='" + MerPtcId + '\'' +
                ", ReqTime='" + ReqTime + '\'' +
                ", TranCode='" + TranCode + '\'' +
                ", Version='" + Version + '\'' +
                '}';
    }
}