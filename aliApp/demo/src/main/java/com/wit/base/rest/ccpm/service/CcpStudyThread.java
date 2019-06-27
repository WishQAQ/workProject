package com.wit.base.rest.ccpm.service;

import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Record;
import com.wit.base.rest.ccpm.po.BaseThreadObject;

import static com.wit.base.rest.ccpm.config.DbConfig.JIANGSU_CONFIG;

public class CcpStudyThread extends BaseThreadObject {

    /**  参数 **/
    private String userKey;//用户key
    private String dailyKey;//问题key

    /**  结果 **/
    private int reviewProblemCount = 0;//往期问题总数
    private int problemCount = 0;//问题总数
    private Record answerRecord;//答题记录
    private Record commentRecord;//评论记录

    /**
     * 查询用户答题情况
     */
    public void queryAnswerDetail(){
        String sql = "select user_answer,is_correct,user_choose from ccp_study_record where " +
                " user_key = ? and daily_key = ? and delete_time = 0 order by create_time asc";
        answerRecord = Db.use(JIANGSU_CONFIG).findFirst(sql, this.userKey, this.dailyKey);
    }

    /**
     * 查询评论
     */
    public void queryComment(){
        String sql = "select score,comments from ccp_study_record_extendes where creator_key = ? and daily_key = ? " +
                " and delete_time = 0 order by create_time desc";
        commentRecord = Db.use(JIANGSU_CONFIG).findFirst(sql, this.userKey, this.dailyKey);
    }

    /**
     * 获取问题总数
     */
    public void queryProblemCount(){
        String sql = "select count(1) count from ccp_study_daily where delete_time = 0 ";
        problemCount = Db.use(JIANGSU_CONFIG).findFirst(sql).getInt("count");
    }

    /**
     * 获取往期问题总数
     */
    public void queryReviewProblemCount(){
        String sql = "select count(1) count from ccp_study_daily where delete_time = 0 ";
        reviewProblemCount = Db.use(JIANGSU_CONFIG).findFirst(sql).getInt("count");
    }

    public int getReviewProblemCount() {
        return reviewProblemCount;
    }

    public int getProblemCount() {
        return problemCount;
    }

    public void setUserKey(String userKey) {
        this.userKey = userKey;
    }

    public void setDailyKey(String dailyKey) {
        this.dailyKey = dailyKey;
    }

    public Record getAnswerRecord() {
        return answerRecord;
    }

    public Record getCommentRecord() {
        return commentRecord;
    }
}
