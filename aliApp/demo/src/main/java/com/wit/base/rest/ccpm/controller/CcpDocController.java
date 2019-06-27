package com.wit.base.rest.ccpm.controller;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.jfinal.aop.Before;
import com.jfinal.ext.interceptor.GET;
import com.jfinal.ext.interceptor.POST;
import com.wit.base.rest.ccpm.po.CcpDoc;
import com.wit.base.rest.ccpm.po.SysFile;
import com.wit.base.rest.ccpm.service.CcpDocServiceImpl;
import com.wit.base.rest.ccpm.service.ICcpDocService;
import com.wit.base.rest.ccpm.utils.BaseException;
import com.wit.base.rest.ccpm.utils.DataTemplate;
import com.wit.base.rest.ccpm.utils.ObjectUtil;
import io.jboot.web.controller.JbootController;
import io.jboot.web.controller.annotation.RequestMapping;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * 公文控制层
 */
@RequestMapping("/api/v1/doc")
public class CcpDocController extends JbootController {

    /**
     * 公文逻辑层
     */
    ICcpDocService docService = new CcpDocServiceImpl();

    /**
     * 初始化新增界面数据
     */
    @Before(GET.class)
    public void init(){
        String userKey = getPara("user_key");//TODO 测试获取user_key，需更换登录数据
        if(ObjectUtil.stringIsEmptyOrUndefined(userKey)){
            renderJson(DataTemplate.wrapErrorData("请传入user_key"));
            return;
        }

        Map<String, Object> map = null;
        try {
            map = docService.init(userKey);
        } catch (BaseException e) {
            renderJson(DataTemplate.wrapErrorData(e.getMessage()));
            return;
        }
        //TODO 需更换为登录数据
//        map.put("user_name","张小平");
//        map.put("user_key","a14e673c-38ac-11e9-9a12-6c92bf562db0");
//        map.put("dept_name","实验小学党支部");
        renderJson(DataTemplate.wrapSuccessData(map));
    }

    /**
     * 添加公文
     */
    @Before(POST.class)
    public void addDoc(){
        JSONObject json = getRawObject();
        CcpDoc ccpDoc = JSON.toJavaObject(json, CcpDoc.class);
        //判断status是否为规范数据
        if(ccpDoc.getStatus() != 0 && ccpDoc.getStatus() != 1){
            renderJson(DataTemplate.wrapErrorData("status数据错误，请按规定传数"));
            return;
        }
        List<SysFile> fileList = getFileList(json);//得到文件集合数据
        //TODO 需从登录信息获取
        ccpDoc.setCreator("张小平");//
        ccpDoc.setCreatorKey("a14e673c-38ac-11e9-9a12-6c92bf562db0");
        if(ccpDoc.getStatus() == 1){//如果状态为发送，验证数据是否为空
            String message = ObjectUtil.objAttributeIsEmpty(ccpDoc,true,"key","_id","timestamp","carbonCopy","transmitKey");
            if(!ObjectUtil.stringIsEmpty(message)){
                renderJson(DataTemplate.wrapErrorData(message+"不能为空"));
                return;
            }
        }
        try {
            boolean result = docService.insertDoc(ccpDoc,fileList);
            if(ccpDoc.getStatus() == 0){
                renderJson(DataTemplate.wrapSuccessData("保存成功"));
            }else{
                renderJson(DataTemplate.wrapSuccessData("正在发送"));
            }
        } catch (BaseException e) {
            renderJson(DataTemplate.wrapErrorData(e.getMessage()));
            return;
        }
    }

    /**
     * 获取下级组织
     */
    @Before(GET.class)
    public void queryLowerLevelOrg(){
        String userKey = getPara("user_key");//TODO 测试获取user_key，需更换登录数据
        String orgCode = getPara("org_code");//组织code
        if(ObjectUtil.stringIsEmptyOrUndefined(userKey)){
            renderJson(DataTemplate.wrapErrorData("请传入user_key"));
            return;
        }
        if(ObjectUtil.stringIsEmptyOrUndefined(orgCode)){
            renderJson(DataTemplate.wrapErrorData("请传入org_code"));
            return;
        }
        List<Map<String,Object>> list = null;
        try {
            list = docService.getLowerLevelOrg(userKey,orgCode);
        } catch (BaseException e) {
            renderJson(DataTemplate.wrapErrorData(e.getMessage()));
            return;
        }
        renderJson(DataTemplate.wrapSuccessData(list));
    }

    /**
     * 查询发送的公文
     */
    @Before(GET.class)
    public void queryDoc(){
        String status = getPara("status");
        String pageStr = getPara("page");
        String sizeStr = getPara("page_size");
        String userKey = getPara("user_key");//TODO 测试时传入,需删除
        int page = 1;
        int size = 10;
        if(!ObjectUtil.stringIsEmptyOrUndefined(pageStr)){
            page = Integer.parseInt(pageStr);
        }
        if(!ObjectUtil.stringIsEmptyOrUndefined(sizeStr)){
            size = Integer.parseInt(sizeStr);
        }
        Map<String,Object> map = null;
        try {
            map = docService.getDocList(status,page,size,userKey);
        } catch (BaseException e) {
            renderJson(DataTemplate.wrapErrorData(e.getMessage()));
            return;
        }
        renderJson(DataTemplate.wrapSuccessData(map));
    }

    /**
     * 发送公文
     */
    @Before(POST.class)
    public void sendDoc(){
        JSONObject json = getRawObject();
        String userKey = json.getString("user_key");//TODO 测试时传入,需删除
        String docKey = json.getString("doc_key");
        boolean result;
        try {
            result = docService.sendDoc(userKey,docKey);
        } catch (BaseException e) {
            renderJson(DataTemplate.wrapErrorData(e.getMessage()));
            return;
        }
        if(result){
            renderJson(DataTemplate.wrapSuccessData("正在发送中"));
        }else{
            renderJson(DataTemplate.wrapErrorData("发送失败"));
        }
    }

    /**
     * 根据公文key获取公文
     */
    @Before(GET.class)
    public void queryDocByKey(){
        String userKey = getPara("user_key");//TODO 测试时传入,需删除
        String docKey = getPara("doc_key");
        String isReceiveStr = getPara("is_receive");//是否接收者
        if(ObjectUtil.stringIsEmptyOrUndefined(docKey)){
            renderJson(DataTemplate.wrapErrorData("公文key不能为空"));
            return;
        }
        boolean isReceive = false;
        if(ObjectUtil.stringIsEmptyOrUndefined(isReceiveStr)){
            renderJson(DataTemplate.wrapErrorData("是否为接收公文不能为空"));
            return;
        }else{
            isReceive = Boolean.valueOf(isReceiveStr);
        }
        Map<String, Object> map = null;
        try {
            map = docService.getDocByKey(userKey, docKey, isReceive);
        } catch (BaseException e) {
            renderJson(DataTemplate.wrapErrorData(e.getMessage()));
            return;
        }
        renderJson(DataTemplate.wrapSuccessData(map));
    }

    /**
     * 修改公文
     */
    @Before(POST.class)
    public void updateDoc(){
        JSONObject json = getRawObject();
        CcpDoc ccpDoc = JSON.toJavaObject(json, CcpDoc.class);
        String userKey = ccpDoc.getCreatorKey();//TODO 当前登录账户key，需要获取登录信息
        //判断status是否为规范数据
        if(ccpDoc.getStatus() != 0 && ccpDoc.getStatus() != 1){
            renderJson(DataTemplate.wrapErrorData("status数据错误，请按规定传数"));
            return;
        }
        if(ObjectUtil.stringIsEmptyOrUndefined(ccpDoc.getTimestamp())){
            renderJson(DataTemplate.wrapErrorData("timestamp不能为空"));
            return;
        }
        if(ccpDoc.getStatus() == 1){//如果状态为发送，验证数据是否为空
            String message = ObjectUtil.objAttributeIsEmpty(ccpDoc,true,"key","_id","carbonCopy","transmitKey","transmitKey");
            if(!ObjectUtil.stringIsEmpty(message)){
                renderJson(DataTemplate.wrapErrorData(message+"不能为空"));
                return;
            }
        }
        List<SysFile> fileList = getFileList(json);//获取文件集合
        boolean result = false;
        try {
            result = docService.updateDoc(ccpDoc, userKey,fileList);
        } catch (BaseException e) {
            renderJson(DataTemplate.wrapErrorData(e.getMessage()));
            return;
        }
        if(result){
            renderJson(DataTemplate.wrapSuccessData("修改成功"));
        }else {
            renderJson(DataTemplate.wrapErrorData("修改失败"));
        }
    }

    /**
     * 得到文件集合数据
     * @param json
     * @return
     */
    private List<SysFile> getFileList(JSONObject json){
        //处理文件数据
        String files = json.getString("files");
        List<SysFile> fileList = new ArrayList<>();
        if(!ObjectUtil.stringIsEmptyOrUndefined(files)){
            JSONArray fileArray = JSON.parseArray(files);
            for (Object obj:fileArray) {
                JSONObject jsonObj = (JSONObject) obj;
                String fileName = jsonObj.getString("file_name");
                String fileType = jsonObj.getString("file_type");
                String fileUrl = jsonObj.getString("file_url");
                SysFile file = new SysFile(fileName,fileType,fileUrl);
                fileList.add(file);
            }
        }
        return fileList;
    }

    /**
     * 收回公文
     */
    @Before(POST.class)
    public void takeBack(){
        JSONObject json = getRawObject();
        String docKey = json.getString("doc_key");//公文key
        String userKey = json.getString("user_key");//用户key TODO 测试时传入，需从登录信息中获取
        boolean result = false;
        try {
            result = docService.takeBack(docKey, userKey);
        } catch (BaseException e) {
            renderJson(DataTemplate.wrapErrorData(e.getMessage()));
            return;
        }
        if(result){
            renderJson(DataTemplate.wrapSuccessData("收回成功"));
        }else{
            renderJson(DataTemplate.wrapErrorData("收回失败"));
        }
    }

    /**
     * 查询回执
     */
    @Before(GET.class)
    public void queryCallback(){
        String docKey = getPara("doc_key");//公文key
        String userKey = getPara("user_key");//用户key TODO 测试时传入，需删除，从登录状态中获取
        String pageStr= getPara("page");//当前页
        String sizeStr = getPara("page_size");//显示数
        int page = 1;
        int size = 10;
        if(!ObjectUtil.stringIsEmptyOrUndefined(pageStr)){
            page = Integer.parseInt(pageStr);
        }
        if(!ObjectUtil.stringIsEmptyOrUndefined(sizeStr)){
            size = Integer.parseInt(sizeStr);
        }
        Map<String, Object> map = null;
        try {
            map = docService.queryCallback(docKey, userKey, page, size);
        } catch (BaseException e) {
            renderJson(DataTemplate.wrapErrorData(e.getMessage()));
            return;
        }
        renderJson(DataTemplate.wrapSuccessData(map));
    }

    /**
     * 获取转发集合
     */
    @Before(GET.class)
    public void queryTransmitList(){
        String docKey = getPara("doc_key");//公文key
        String pageStr= getPara("page");//当前页
        String sizeStr = getPara("page_size");//显示数
        int page = 1;
        int size = 10;
        if(!ObjectUtil.stringIsEmptyOrUndefined(pageStr)){
            page = Integer.parseInt(pageStr);
        }
        if(!ObjectUtil.stringIsEmptyOrUndefined(sizeStr)){
            size = Integer.parseInt(sizeStr);
        }
        Map<String, Object> map = null;
        try {
            map = docService.queryTransmitList(docKey, page, size);
        } catch (BaseException e) {
            renderJson(DataTemplate.wrapErrorData(e.getMessage()));
            return;
        }
        renderJson(DataTemplate.wrapSuccessData(map));
    }

    /**
     * 获取转发详情
     */
    @Before(GET.class)
    public void queryTransmitDetail(){
        String docKey = getPara("doc_key");//公文key
        String pageStr= getPara("page");//当前页
        String sizeStr = getPara("page_size");//显示数
        int page = 1;
        int size = 10;
        if(ObjectUtil.stringIsEmptyOrUndefined(docKey)){
            renderJson(DataTemplate.wrapErrorData("doc_key不能为空"));
            return;
        }
        if(!ObjectUtil.stringIsEmptyOrUndefined(pageStr)){
            page = Integer.parseInt(pageStr);
        }
        if(!ObjectUtil.stringIsEmptyOrUndefined(sizeStr)){
            size = Integer.parseInt(sizeStr);
        }
        Map<String, Object> map = null;
        try {
            map = docService.queryTransmitDetail(docKey, page, size);
        } catch (BaseException e) {
            renderJson(DataTemplate.wrapErrorData(e.getMessage()));
            return;
        }
        renderJson(DataTemplate.wrapSuccessData(map));
    }

    /**
     * 查询接收集合
     */
    @Before(GET.class)
    public void queryReceiveList(){
        String userKey = getPara("user_key");//TODO 测试传入，需要从登录信息获取
        String pageStr= getPara("page");//当前页
        String sizeStr = getPara("page_size");//显示数
        String status = getPara("status");//状态，0未读，1已读，2待办，3在办，4已办，5已办结
        int page = 1;
        int size = 10;
        if(!ObjectUtil.stringIsEmptyOrUndefined(pageStr)){
            page = Integer.parseInt(pageStr);
        }
        if(!ObjectUtil.stringIsEmptyOrUndefined(sizeStr)){
            size = Integer.parseInt(sizeStr);
        }
        Map<String, Object> map = null;
        try {
            map = docService.queryReceiveList(userKey, status, page, size);
        } catch (BaseException e) {
            renderJson(DataTemplate.wrapErrorData(e.getMessage()));
            return;
        }
        renderJson(DataTemplate.wrapSuccessData(map));
    }

    /**
     * 回执
     */
    @Before(POST.class)
    public void callback(){
        JSONObject json = getRawObject();
        String userKey = json.getString("user_key");//TODO 测试传入，需要从登录信息获取
        String receiveKey = json.getString("receive_key");//接收key
        String content = json.getString("content");//回执内容
        String timestamp = json.getString("timestamp");//时间戳
        if(ObjectUtil.stringIsEmptyOrUndefined(receiveKey)){
            renderJson(DataTemplate.wrapErrorData("receiveKey不能为空"));
            return;
        }
        if(ObjectUtil.stringIsEmptyOrUndefined(content)){
            renderJson(DataTemplate.wrapErrorData("回执内容不能为空"));
            return;
        }
        if(ObjectUtil.stringIsEmptyOrUndefined(timestamp)){
            renderJson(DataTemplate.wrapErrorData("timestamp不能为空"));
            return;
        }
        boolean result = docService.addCallback(userKey, receiveKey, content,timestamp);
        if (result){
            renderJson(DataTemplate.wrapSuccessData("回执成功"));
        }else{
            renderJson(DataTemplate.wrapErrorData("回执失败"));
        }
    }

    /**
     * 转发公文
     */
    @Before(POST.class)
    public void transmitDoc(){
        JSONObject json = getRawObject();
        String userKey = json.getString("user_key");//TODO 测试传入，需要从登录信息获取
        String docKey = json.getString("doc_key");//需要转发的公文key
        String sendPersonKeys = json.getString("send_person_keys");//获取需要转发的人员,逗号隔开
        String remind = json.getString("remind");//是否短信提醒，0不提醒，1提醒
        if(ObjectUtil.stringIsEmptyOrUndefined(docKey)){
            renderJson(DataTemplate.wrapErrorData("请选择需要转发的公文信息"));
            return;
        }
        if(ObjectUtil.stringIsEmptyOrUndefined(sendPersonKeys)){
            renderJson(DataTemplate.wrapErrorData("请选择转发接收人员"));
            return;
        }
        boolean result = false;
        try {
            result = docService.transmitDoc(userKey, docKey, sendPersonKeys, remind);
        } catch (BaseException e) {
            renderJson(DataTemplate.wrapErrorData(e.getMessage()));
            return;
        }
        if(result){
            renderJson(DataTemplate.wrapSuccessData("公文正在转发中"));
        }else{
            renderJson(DataTemplate.wrapErrorData("公文转发失败"));
        }
    }

}
