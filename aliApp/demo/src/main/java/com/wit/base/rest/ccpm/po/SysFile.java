package com.wit.base.rest.ccpm.po;

public class SysFile {
    private String key;
    private String name;
    private String type;//文件类型
    private String url;//文件路径
    private String createTime;//创建时间
    private int deleteTime;//删除时间

    public SysFile() {
    }

    public SysFile(String name, String type, String url) {
        this.name = name;
        this.type = type;
        this.url = url;
    }

    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getCreateTime() {
        return createTime;
    }

    public void setCreateTime(String createTime) {
        this.createTime = createTime;
    }

    public int getDeleteTime() {
        return deleteTime;
    }

    public void setDeleteTime(int deleteTime) {
        this.deleteTime = deleteTime;
    }
}
