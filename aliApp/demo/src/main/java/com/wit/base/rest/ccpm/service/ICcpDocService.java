package com.wit.base.rest.ccpm.service;

import com.wit.base.rest.ccpm.po.CcpDoc;
import com.wit.base.rest.ccpm.po.SysFile;
import com.wit.base.rest.ccpm.utils.BaseException;

import java.util.List;
import java.util.Map;

/**
 * 公文逻辑层接口
 */
public interface ICcpDocService {
    /**
     * 初始化新增数据，公文类型
     * @return
     */
    public Map<String,Object> init(String userKey) throws BaseException;

    /**
     * 插入公文
     * @param doc 公文对象
     * @param fileList 文件
     * @return
     */
    public boolean insertDoc(CcpDoc doc, List<SysFile> fileList) throws BaseException;

    /**
     * 获取下级组织
     * @param userKey 用户key
     * @param orgCode 组织code
     * @return
     */
    public List<Map<String,Object>> getLowerLevelOrg(String userKey, String orgCode) throws BaseException;

    /**
     * 查询发送的公文信息
     * @param status 状态
     * @param page
     * @param size
     * @return
     */
    public Map<String,Object> getDocList(String status,int page,int size,String userKey) throws BaseException;

    /**
     * 发送公文
     * @param userKey
     * @param docKey
     * @return
     */
    public boolean sendDoc(String userKey,String docKey) throws BaseException;

    /**
     * 根据key获取公文
     * @param userKey
     * @param docKey
     * @param isReceive 是否为接收者
     * @return
     */
    public Map<String,Object> getDocByKey(String userKey,String docKey,boolean isReceive) throws BaseException;

    /**
     * 修改公文状态
     * @return
     */
    public boolean updateDocStatus(String key,int status);

    /**
     * 修改公文
     * @param doc 公文
     * @param userKey
     * @param fileList 新增文件集合
     * @return
     * @throws BaseException
     */
    public boolean updateDoc(CcpDoc doc,String userKey,List<SysFile> fileList) throws BaseException;

    /**
     * 收回公文
     * @param docKey 公文key
     * @param userKey 用户key
     * @return
     */
    public boolean takeBack(String docKey,String userKey) throws BaseException;

    /**
     * 查询回执
     * @param docKey 公文key
     * @param userKey 用户key
     * @return
     */
    public Map<String,Object> queryCallback(String docKey,String userKey,int page,int size) throws BaseException;

    /**
     * 获取转发集合
     * @param docKey
     * @param page
     * @param size
     * @return
     */
    public Map<String,Object> queryTransmitList(String docKey,int page,int size) throws BaseException;

    /**
     * 获取转发详情
     * @param docKey
     * @param page
     * @param size
     * @return
     * @throws BaseException
     */
    public Map<String,Object> queryTransmitDetail(String docKey,int page,int size) throws BaseException;

    /**
     * 添加回执
     * @param userKey 用户key
     * @param receiveKey 接收公文key
     * @param content 回执内容
     * @param timestamp 时间戳，确定版本
     * @return
     */
    public boolean addCallback(String userKey,String receiveKey,String content,String timestamp);

    /**
     * 查询接收集合
     * @param userKey 用户key
     * @param page 当前页
     * @param size 当前页显示数
     * @param status 状态，0未读，1已读，2待办，3在办，4已办，5已办结
     * @return
     */
    public Map<String,Object> queryReceiveList(String userKey,String status,int page,int size) throws BaseException;

    /**
     * 公文转发
     * @param userKey 用户key
     * @param docKey 公文key
     * @param sendPersonKeys 转发的接收人
     * @param remind 是否短信提醒，0不提醒，1提醒
     * @return
     */
    public boolean transmitDoc(String userKey,String docKey,String sendPersonKeys,String remind) throws BaseException;
}
