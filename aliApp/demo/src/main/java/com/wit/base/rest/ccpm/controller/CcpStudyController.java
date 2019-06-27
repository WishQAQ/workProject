package com.wit.base.rest.ccpm.controller;

import cn.hutool.core.util.StrUtil;
import com.alibaba.fastjson.JSONObject;
import com.jfinal.aop.Before;
import com.jfinal.ext.interceptor.GET;
import com.jfinal.ext.interceptor.POST;
import com.wit.base.rest.ccpm.service.CcpStudyServiceImpl;
import com.wit.base.rest.ccpm.service.ICcpStudyService;
import com.wit.base.rest.ccpm.utils.BaseException;
import com.wit.base.rest.ccpm.utils.DataTemplate;
import com.wit.base.rest.ccpm.utils.ObjectUtil;
import io.jboot.web.controller.JbootController;
import io.jboot.web.controller.annotation.RequestMapping;
import org.apache.log4j.Logger;

import java.text.ParseException;
import java.util.Map;

@RequestMapping("/api/v1/study")
public class CcpStudyController extends JbootController {
    private Logger log = Logger.getLogger(CcpStudyController.class);

    private ICcpStudyService studyService = new CcpStudyServiceImpl();

    /**
     * 获取今日问题
     */
    @Before(GET.class)
    public void getTodayProblem(){
        String userKey = getPara("user_key");//TODO 登录key，需从登录信息获取
        Map<String, Object> map = null;
        try {
            map = studyService.getTodayProblem(userKey);
        } catch (BaseException e) {
            renderJson(DataTemplate.wrapErrorData(e.getMessage()));
            return;
        }
        renderJson(DataTemplate.wrapSuccessData(map));
    }

    /**
     * 用户提交答案 TODO 需要改回POST
     */
    @Before(GET.class)
    public void dailySubmit() {
        String dailyKey = getPara("key");//题目唯一标识
        String userKey = getPara("user_key");//用户唯一标识 TODO 登录key，需从登录信息获取
        String userChoose = getPara("user_choose");//用户选项
        String userAnswers = getPara("user_answers");//用户答案
        String userScore = getPara("user_score");//用户评分
//        JSONObject json = getRawObject();
//        String dailyKey = json.getString("key");//题目唯一标识
//        String userKey = json.getString("user_key");//用户唯一标识 TODO 登录key，需从登录信息获取
//        String userChoose = json.getString("user_choose");//用户选项
//        String userAnswers = json.getString("user_answers");//用户答案
//        String userScore = json.getString("user_score");//用户评分
        if (ObjectUtil.stringIsEmptyOrUndefined(dailyKey)) {
            renderJson(DataTemplate.wrapErrorData("题目标识不能为空"));
            return;
        }
        if (ObjectUtil.stringIsEmptyOrUndefined(userKey)) {
            renderJson(DataTemplate.wrapErrorData("用户标识不能为空"));
            return;
        }
        if (ObjectUtil.stringIsEmptyOrUndefined(userChoose)) {
            renderJson(DataTemplate.wrapErrorData("用户选项不能为空"));
            return;
        }
        if (ObjectUtil.stringIsEmptyOrUndefined(dailyKey)) {
            renderJson(DataTemplate.wrapErrorData("题目标识不能为空"));
            return;
        }
        if (ObjectUtil.stringIsEmptyOrUndefined(userAnswers)) {
            renderJson(DataTemplate.wrapErrorData("答案不能为空"));
            return;
        }
        Map<String, Object> map = null;
        try {
            map = studyService.addAnswer(dailyKey, userKey, userChoose, userAnswers, userScore);
        } catch (BaseException e) {
            renderJson(DataTemplate.wrapErrorData(e.getMessage()));
            return;
        }catch (Exception e){
            e.printStackTrace();
            log.error("添加用户答案错误",e);
            renderJson(DataTemplate.wrapErrorData("答题系统异常"));
            return;
        }
        renderJson(DataTemplate.wrapSuccessData(map));
    }

    /**
     * 推荐题目 TODO 需要改回POST
     */
    @Before(GET.class)
    public void recommended() {
        String userKey = getPara("user_key");//用户唯一标识
        String userName = getPara("user_name");
        String name = getPara("name");//题目标题
        String catCode = getPara("cat_code");//题目类别
        String catName = getPara("cat_name");//类别名
        String type = getPara("type");//题目类型
        String answers = getPara("answers");//题目正确答案
        String itemCount = getPara("item_count");//题目选项
        String prompt = getPara("prompt");//提示

//        JSONObject jsonObject = getRawObject();
        // TODO 从登录状态获取
//        String userKey = jsonObject.getString("user_key");//用户唯一标识
//        String userName = jsonObject.getString("user_name");
//
//        String name = jsonObject.getString("name");//题目标题
//        String catCode = jsonObject.getString("cat_code");//题目类别
//        String catName = jsonObject.getString("cat_name");//类别名
//        String type = jsonObject.getString("type");//题目类型
//        String answers = jsonObject.getString("answers");//题目正确答案
//        String itemCount = jsonObject.getString("item_count");//题目选项
//        String prompt = jsonObject.getString("prompt");//提示
        if (StrUtil.isEmptyOrUndefined(userKey)) {
            renderJson(DataTemplate.wrapErrorData("用户ID不能为空"));
            return;
        }
        if (StrUtil.isEmptyOrUndefined(name)) {
            renderJson(DataTemplate.wrapErrorData("标题不能为空"));
            return;
        }
        if (StrUtil.isEmptyOrUndefined(catCode)) {
            renderJson(DataTemplate.wrapErrorData("类别不能为空"));
            return;
        }
        if (StrUtil.isEmptyOrUndefined(catName)) {
            renderJson(DataTemplate.wrapErrorData("类别名不能为空"));
            return;
        }
        if (StrUtil.isEmptyOrUndefined(type)) {
            renderJson(DataTemplate.wrapErrorData("类型不能为空"));
            return;
        }
        if (StrUtil.isEmptyOrUndefined(answers)) {
            renderJson(DataTemplate.wrapErrorData("正确答案不能为空"));
            return;
        }
        if (StrUtil.isEmptyOrUndefined(itemCount)) {
            renderJson(DataTemplate.wrapErrorData("题目选项答案不能为空"));
            return;
        }
        boolean result = studyService.addRecommended(userKey, userName, catCode, catName, name, type, answers, itemCount, prompt);
        if(result){
            renderJson(DataTemplate.wrapSuccessData("推荐成功"));
        }else {
            renderJson(DataTemplate.wrapErrorData("推荐失败"));
        }
    }

    /**
     * 往期题库
     */
    @Before(GET.class)
    public void review() {
        String pageStr= getPara("page");//当前页
        String sizeStr = getPara("page_size");//显示数
        String startTime = getPara("start_time");//开始时间
        String endTime = getPara("end_time");//结束时间
        String catCode = getPara("cat_code");//类别标识
        String name = getPara("creator");//推荐人
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
            map = studyService.reviewProblem(page, size,catCode,name,startTime,endTime,true);
        } catch (BaseException e) {
            renderJson(DataTemplate.wrapErrorData(e.getMessage()));
            return;
        }catch (Exception e){
            log.error("查询往期题库错误",e);
            renderJson(DataTemplate.wrapErrorData("查询历史题库异常"));
            return;
        }
        renderJson(DataTemplate.wrapSuccessData(map));
    }

    /**
     * 用户答题记录
     */
    @Before(GET.class)
    public void questionsRecord() {
        String userKey = getPara("user_key");//用户唯一标识 TODO 从登录状态获取
        String queryDate = getPara("queryDate");//查询的时间，格式yyyy-MM
        //如果查询时间为空，默认为当前月份
        int year;
        int month;
        if(ObjectUtil.stringIsEmptyOrUndefined(queryDate)){
            year = ObjectUtil.getNowYear();
            month = ObjectUtil.getNowMonth();
        }else{
            try {
                Map<String, Integer> map = ObjectUtil.timeStrToMap(queryDate, "yyyy-MM");
                year = map.get("year");
                month = map.get("month");
            } catch (ParseException e) {
                renderJson(DataTemplate.wrapErrorData("查询答题记录时间格式错误"));
                return;
            }
        }
        Map<String,Object> map = null;
        try {
            map = studyService.questionsRecord(userKey, year, month);
        } catch (BaseException e) {
            renderJson(DataTemplate.wrapErrorData(e.getMessage()));
            return;
        }
        renderJson(DataTemplate.wrapSuccessData(map));
    }

    /**
     * 用户答题详情
     */
    @Before(GET.class)
    public void questionsDetails() {
        String userKey = getPara("user_key");//用户唯一标识 TODO 从登录信息中获取
        String dailyKey = getPara("daily_key");//题目唯一标识
        Map<String, Object> map = null;
        try {
            map = studyService.questionsDetails(userKey, dailyKey);
        } catch (BaseException e) {
            renderJson(DataTemplate.wrapErrorData(e.getMessage()));
            return;
        }
        renderJson(DataTemplate.wrapSuccessData(map));
    }

}
