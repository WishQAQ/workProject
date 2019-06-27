package com.wit.base.rest.ccpm.utils;

public enum Status {
    SUCCESS(0,"成功"),
    ERROR(-1,"失败"),
    DATAERROR(-2,"数据错误"),
    PASSWORDERROR(-100,"密码错误"),
    DENIED(-101,"拒绝访问"),
    UNKNOWACCOUNT(-99,"用户不存在"),
    USERISBINDED(-97,"该账号已被绑定,如要解除绑定,请与系统管理员联系"),
    LOCKED(-98,"账号被锁定"),
    UPLOADERROR(-200,"文件上传失败"),
    ORDERERROR(-201,"订单异常"),
    USERNOAUTH(-202,"用户未授权"),
    ADDRESSERROR(-203,"获取地理位置失败"),
    SIGNERROR(-204,"签名校验失败"),
    SENSITIVE_WORDS(-205,"包含敏感词汇"),
    BINDPAGEOVERDUE(-206,"绑定页面已过期,重新进入本页面!"),
    JOBSUBMITFAIL(-300,"任务提交失败");

    int code;
    String message;
    Object data;
    Status(int code, String message){
        this.code=code;
        this.message=message;
    }

    public int getCode() {
        return code;
    }

    public void setCode(int code) {
        this.code = code;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }
}
