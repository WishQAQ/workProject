package com.wit.base.rest.ccpm.po;

import com.wit.base.rest.ccpm.utils.BaseException;
import com.wit.base.rest.ccpm.utils.ObjectUtil;

public class BaseThreadObject {

    private boolean isError = false;//执行多线程返回的错误信息
    private String errorMessage;//执行多线程返回的错误信息

    public void isError() throws BaseException {
        if(isError){
            throw new BaseException(errorMessage);
        }
    }

    public String getErrorMessage() {
        return errorMessage;
    }


    /**
     * 多线程工具类通过此方法反馈是否发生异常
     */
    public void setErrorStatus(String errorMessage) {
        this.isError = true;
        this.errorMessage = errorMessage;
    }
}
