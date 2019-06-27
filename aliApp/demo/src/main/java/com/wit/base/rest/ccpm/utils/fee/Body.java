package com.wit.base.rest.ccpm.utils.fee;

import com.thoughtworks.xstream.annotations.XStreamAlias;

public class Body {

    @XStreamAlias("PayMerTranNo")
    private String PayMerTranNo;

    @XStreamAlias("Location")
    private String Location;

    @XStreamAlias("TranScene")
    private String TranScene;

    @XStreamAlias("Amount")
    private String amount;

    @XStreamAlias("Currency")
    private String currency;

    @XStreamAlias("TranContent")
    private String TranContent;

    @XStreamAlias("MerMemo")
    private String MerMemo;

    @XStreamAlias("TranOptions")
    private TranOptions tranOptions;

    @XStreamAlias("ValidPeriod")
    private String ValidPeriod;

    @XStreamAlias("NotifyURL")
    private String NotifyURL;

    public String getPayMerTranNo() {
        return PayMerTranNo;
    }

    public void setPayMerTranNo(String payMerTranNo) {
        PayMerTranNo = payMerTranNo;
    }

    public String getLocation() {
        return Location;
    }

    public void setLocation(String location) {
        Location = location;
    }

    public String getTranScene() {
        return TranScene;
    }

    public void setTranScene(String tranScene) {
        TranScene = tranScene;
    }

    public String getAmount() {
        return amount;
    }

    public void setAmount(String amount) {
        this.amount = amount;
    }

    public String getCurrency() {
        return currency;
    }

    public void setCurrency(String currency) {
        this.currency = currency;
    }

    public String getTranContent() {
        return TranContent;
    }

    public void setTranContent(String tranContent) {
        TranContent = tranContent;
    }

    public String getMerMemo() {
        return MerMemo;
    }

    public void setMerMemo(String merMemo) {
        MerMemo = merMemo;
    }

    public TranOptions getTranOptions() {
        return tranOptions;
    }

    public void setTranOptions(TranOptions tranOptions) {
        this.tranOptions = tranOptions;
    }

    public String getValidPeriod() {
        return ValidPeriod;
    }

    public void setValidPeriod(String validPeriod) {
        ValidPeriod = validPeriod;
    }

    public String getNotifyURL() {
        return NotifyURL;
    }

    public void setNotifyURL(String notifyURL) {
        NotifyURL = notifyURL;
    }

    @Override
    public String toString() {
        return "Body{" +
                "PayMerTranNo='" + PayMerTranNo + '\'' +
                ", Location='" + Location + '\'' +
                ", TranScene='" + TranScene + '\'' +
                ", amount='" + amount + '\'' +
                ", currency='" + currency + '\'' +
                ", TranContent='" + TranContent + '\'' +
                ", MerMemo='" + MerMemo + '\'' +
                ", tranOptions=" + tranOptions +
                ", ValidPeriod='" + ValidPeriod + '\'' +
                ", NotifyURL='" + NotifyURL + '\'' +
                '}';
    }
}