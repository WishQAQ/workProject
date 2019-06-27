package com.wit.base.rest.ccpm.utils.fee;

import com.thoughtworks.xstream.annotations.XStreamAlias;

public class TranOptions {
    @Override
    public String toString() {
        return "TranOptions{" +
                "AppID='" + AppID + '\'' +
                ", IP='" + IP + '\'' +
                '}';
    }

    public String getAppID() {
        return AppID;
    }

    public void setAppID(String appID) {
        AppID = appID;
    }

    public String getIP() {
        return IP;
    }

    public void setIP(String IP) {
        this.IP = IP;
    }

    @XStreamAlias("AppID")
    private String AppID;

    @XStreamAlias("IP")
    private String IP;

}
