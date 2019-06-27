package com.wit.base.rest.ccpm.utils;

import java.io.Serializable;

/**
 * Created by jy on 2017/4/13 0013.
 * 用于承载数据库返回的数据
 */
public class DataEntity implements Serializable{

    private Object data;
    private long total = -1;
    /**
     * @param data 数据,主要是返回给前端的数据
     * @param total 总数,-1代表不分页
     * */
    public DataEntity(Object data, long total) {
        this.data = data;
        this.total = total;
    }

    public DataEntity() {
    }

    public DataEntity(Object data) {
        this.data = data;
    }
    @SuppressWarnings("unchecked")
    public <T>T getData() {
        return (T)data;
    }

    public DataEntity setData(Object data) {
        this.data = data;
        return this;
    }

    public long getTotal() {
        return total;
    }

    public DataEntity setTotal(long total) {
        this.total = total;
        return this;
    }
}
