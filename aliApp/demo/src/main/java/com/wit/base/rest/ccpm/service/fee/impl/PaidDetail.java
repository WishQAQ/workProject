package com.wit.base.rest.ccpm.service.fee.impl;

import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Record;

import java.math.BigDecimal;
import java.util.List;

import static com.wit.base.rest.ccpm.config.DbConfig.JIANGSU_CONFIG;

//已支付订单详情
public class PaidDetail {
    private String money;//支付金额
    private int month;//支付月份
    private String fee_base;//缴纳基数
    private String paid_type;//党费缴纳标准

    public String getMoney() {
        return money;
    }

    public void setMoney(String money) {
        this.money = money;
    }

    public int getMonth() {
        return month;
    }

    public void setMonth(int month) {
        this.month = month;
    }

    public String getFee_base() {
        return fee_base;
    }

    public void setFee_base(String fee_base) {
        this.fee_base = fee_base;
    }

    public String getPaid_type() {
        return paid_type;
    }

    public void setPaid_type(String paid_type) {
        this.paid_type = paid_type;
    }
}
