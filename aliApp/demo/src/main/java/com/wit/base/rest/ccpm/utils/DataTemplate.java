package com.wit.base.rest.ccpm.utils;

import java.util.HashMap;
import java.util.Map;

public class DataTemplate {

    //表示不进行分页
    private static final long NO_TOTAL = -1L;

    //封装数据
    private static Map<String, Object> wrapData(boolean success, int code, String message, Object data, long total, String token) {

        Map<String, Object> warp = new HashMap<>();
        if (success) {
            warp.put("code", 200);
        } else {
            //错误返回500
            warp.put("code", 500);
        }
        // 请求失败时, 返回错误信息; 请求成功时, 可以没有这个字段或为空
        warp.put("msg", message);
        if (data != null) {
            //如果有分页参数，则构造为分页的数据结构
            if (total > NO_TOTAL) {
                warp.put("data", data);
                warp.put("total", total);
            } else {
                // 具体的数据, 格式是根据前端约定好的, 不一定是个对象, 也可能是数组/字符串之类的
                warp.put("data", data);
            }
        }

        //jwt的token
        if(token!=null){
            warp.put("_token", token);
        }
        warp.put("v", "20190319");
        return warp;
    }

    public static Map<String, Object> wrapSuccessData(DataEntity dataBasePO) {
        return wrapData(true, Status.SUCCESS.getCode(), Status.SUCCESS.getMessage(), dataBasePO.getData(), dataBasePO.getTotal(), null);
    }

    public static Map<String, Object> wrapSuccessData() {
        return wrapData(true, Status.SUCCESS.getCode(), Status.SUCCESS.getMessage(), null, NO_TOTAL, null);
    }

    public static Map<String, Object> wrapSuccessData(Object data) {
        return wrapData(true, Status.SUCCESS.getCode(), Status.SUCCESS.getMessage(), data, NO_TOTAL, null);
    }

    public static Map<String, Object> wrapSuccessData(Object data, String token) {
        return wrapData(true, Status.SUCCESS.getCode(), Status.SUCCESS.getMessage(), data, NO_TOTAL, token);
    }

    public static Map<String, Object> wrapErrorData(int code, String message) {
        return wrapData(false, code, message, null, NO_TOTAL, null);
    }

    public static Map<String, Object> wrapErrorData(int code, Object message) {
        return wrapData(false, code, message.toString(), null, NO_TOTAL, null);
    }

    public static Object wrapErrorData(String message) {
        return wrapData(false, 500, message, null, NO_TOTAL, null);
    }

    public static Object wrapErrorData(Object message) {
        return wrapData(false, 500, message.toString(), null, NO_TOTAL, null);
    }

    public static Object wrapErrorData(Status status) {
        return wrapData(false, status.getCode(), status.getMessage(), null, NO_TOTAL, null);
    }
}
