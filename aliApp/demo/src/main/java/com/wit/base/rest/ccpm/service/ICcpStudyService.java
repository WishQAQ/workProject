package com.wit.base.rest.ccpm.service;

import com.jfinal.plugin.activerecord.Record;
import com.wit.base.rest.ccpm.utils.BaseException;

import java.util.List;
import java.util.Map;

public interface ICcpStudyService {
    /**
     * 获取今日问题
     * @return
     */
    public Map<String,Object> getTodayProblem(String userKey) throws BaseException;

    /**
     * 添加答题
     * @param dailyKey 每日一题key
     * @param userKey 用户key
     * @param user_choose 用户选择
     * @param userAnswers 用户答案
     * @param userScore 用户评分
     * @return
     */
    public Map<String,Object> addAnswer(String dailyKey,String userKey,String user_choose,String userAnswers,String userScore) throws BaseException;

    /**
     * 推荐人出题
     * @param userKey 用户key
     * @param userName 用户姓名
     * @param catCode 类别code
     * @param catName  类别名
     * @param name 题目名
     * @param type 类型
     * @param answers 正确答案
     * @param itemCount 题目选项答案
     * @param prompt 提示
     * @return
     */
    public boolean addRecommended(String userKey,String userName,String catCode,String catName,String name,String type,
                                  String answers,String itemCount,String prompt);

    /**
     * 往期题库
     * @param page 当前页
     * @param size 当前页显示数
     * @param catCode 类别code
     * @param name 创建人姓名
     * @param startTime 开始时间
     * @param endTime 结束时间
     * @return
     * @throws BaseException
     */
    public Map<String,Object> reviewProblem(int page,int size,String catCode,String name,String startTime,String endTime,boolean removeNowDay) throws BaseException;

    /**
     * 设置历史问题入redis
     */
    public List<Record> setReviewsProblem();

    /**
     * 查询答题记录
     * @param userKey 用户key
//     * @param page 当前页
//     * @param size 当前页显示数
     * @return
     */
    public Map<String,Object> questionsRecord(String userKey,int year, int month) throws BaseException;

    /**
     * 获取答题详情
     * @param userKey 用户key
     * @param dailyKey 问题key
     * @return
     */
    public Map<String,Object> questionsDetails(String userKey,String dailyKey) throws BaseException;
}
