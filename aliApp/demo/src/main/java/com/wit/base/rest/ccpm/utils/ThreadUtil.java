package com.wit.base.rest.ccpm.utils;


import org.apache.log4j.Logger;

import java.lang.reflect.Method;

/**
 * 线程工具类
 */
public class ThreadUtil extends  Thread {
    private Logger log = Logger.getLogger(ThreadUtil.class);
    private Object obj;
    private String methodName;

    public ThreadUtil(){}

    public ThreadUtil(Object obj, String methodName){
        this.obj = obj;
        this.methodName = methodName;
    }

    @Override
    public void run() {
        Class clzz = obj.getClass();
        try{
            Method method = clzz.getMethod(methodName);
            method.invoke(obj);
        }catch (Exception e){
            e.printStackTrace();
            log.error("多线程工具类，执行"+methodName+"方法时错误");
            String message = "系统错误";
            if(e instanceof BaseException){
                message = ((BaseException)e).getMessage();
            }
            try {
                Method method = clzz.getMethod("setErrorStatus",String.class);//固定的参数
                method.invoke(obj,message);
            } catch (Exception e1) {
                log.error("多线程工具类设置异常信息错误",e);
            }
        }
    }

    public Object getObj() {
        return obj;
    }

    public void setObj(Object obj) {
        this.obj = obj;
    }

    public String getMethodName() {
        return methodName;
    }

    public void setMethodName(String methodName) {
        this.methodName = methodName;
    }
}
