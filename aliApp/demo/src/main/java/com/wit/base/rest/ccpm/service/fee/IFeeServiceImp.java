package com.wit.base.rest.ccpm.service.fee;


import com.wit.base.rest.ccpm.service.fee.impl.PaidOrder;
import com.wit.base.rest.ccpm.utils.BaseException;

import java.math.BigDecimal;
import java.util.Map;

public interface IFeeServiceImp {

    /**
     * 获取支付功能状态
     * @return
     */
    public Map<String,Object> getPayFunctionState();

    /**
     * 获取党费党员信息
     * @param key 党员key
     * @return
     */
    public Map<String,Object>  getMemInfo4Costs(String key) throws BaseException;

    /**
     * 获取个人党费缴纳信息
     * @param memKey 党员key
     * @param year 查询年
     * @return
     * @throws BaseException
     */
    public Map<String, Object> getPartyCostsInfo(String memKey, String year) throws BaseException;

    /**
     * 获取当前需要缴纳党费的金额
     * @param memKey 人员key
     * @param year 年
     * @param month 月
     * @return
     * @throws BaseException
     */
    public Map<String,String> getPayMoney(String memKey, String year, String month) throws BaseException;

    /**
     * 修改订单状态为支付成功
     * @param feeOrder 订单号
     * @param weixinOrder 微信订单号
     * @return
     */
    public boolean updateOrderStatusToPaySuccess(String feeOrder, String weixinOrder);

    /**
     * 生成订单
     * @param money 前端传入的金额，不做为订单金额，用于参考
     * @param payType 支付类型1：支付宝，2：微信，3：银联
     * @param otherPayMoney 额外缴纳的费用
     * @param yearStr 需要缴纳的年份，可为空
     * @param monthStr 需要缴纳的月份，可为空
     * @param memKey 人员key
     * @param orderType 订单类型 1个人，2代缴
     * @param payerKey 付款人key
     * @return
     */
    public Map<String,Object> produceOrder(BigDecimal money, String payType, BigDecimal otherPayMoney, String yearStr, String monthStr,
                                           String memKey, String orderType, String payerKey) throws BaseException;


    /**
     * 获取管理员电话
     * @param memKey
     * @return
     */
    public Map<String,String> getAdminPhone(String memKey);

    /**
     * 订单完成，微信回调
     * @param feeOrder 订单号
     * @param complateTime 完成时间
     * @param wechatOrder 微信订单号
     * @param payMoney 支付金额，订单金额
     * @param retryIndex 失败重试控制，重试2次，5分钟一次
     * @return
     */
    public boolean complatePayCallback4WeChat(String feeOrder,String complateTime,String wechatOrder,BigDecimal payMoney,int retryIndex);

    /**
     * 根据订单号查询订单
     * @param feeOrder
     * @return
     * @throws BaseException
     */
    public Map<String,Object> getOrderByFeeOrder(String feeOrder) throws BaseException;

    /**
     * 查询该年月已缴纳的订单信息
     * @param memKey 党员key
     * @param year
     * @param month
     * @return
     */
    public PaidOrder getPaidOrder(String memKey,String year,String month) throws BaseException;
}
