package com.wit.base.rest.ccpm.controller;

import cn.hutool.core.util.StrUtil;
import com.alibaba.fastjson.JSONObject;
import com.jfinal.aop.Inject;
import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Record;
import com.jfinal.plugin.redis.Cache;
import com.jfinal.plugin.redis.Redis;
import com.wit.base.rest.ccpm.service.CcpStudyImpl;
import com.wit.base.rest.ccpm.utils.DataTemplate;
import com.wit.base.rest.ccpm.utils.study.AssembleJson;
import io.jboot.web.controller.JbootController;
import io.jboot.web.controller.annotation.RequestMapping;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.sql.Connection;
import java.util.List;
import java.util.Map;

//@RequestMapping("/api/v1/study")
public class CcpStudyController_old extends JbootController implements Runnable {
    private Logger log = LoggerFactory.getLogger(CcpStudyController_old.class);
    /**
     * 注入业务逻辑层
     */
    @Inject
    private CcpStudyImpl ccpStudyImpl;

    /**
     * redis为本地端口测试
     */
    Cache redis = Redis.use("study");

    /**
     * 每日一题
     */
    public void index() {
        if (redis.get("objects") == null) {  //当缓存为空就查询数据库
            Record records = ccpStudyImpl.init();//查询每日一题
            if (records == null) {
                renderJson(DataTemplate.wrapErrorData("查询失败"));
                return;
            }
            redis.set("answers", records.getStr("answers"));//将正确答案存入redis中
            redis.set("objects", records);//存入数据到redis中
            JSONObject jsonObjects = AssembleJson.json(records);//解析成jsonObject格式
            renderJson(DataTemplate.wrapSuccessData(jsonObjects));
            return;
        } else { //反之从redis中拿数据
            Record record = redis.get("objects");
            JSONObject jsonObjects = AssembleJson.json(record);//解析成jsonObject格式
            renderJson(DataTemplate.wrapSuccessData(jsonObjects));
        }
    }

    /**
     * 指定时间清除redis缓存
     */
    public void run() {
        Redis.use().getJedis().flushDB();
    }

    /**
     * 每日一题，提交
     */
    public void dailySubmit() {
        Db.tx(Connection.TRANSACTION_SERIALIZABLE, () -> {
            JSONObject jsnoval = getRawObject();
            String dailyKey = jsnoval.getString("key");//题目唯一标识
            String userKey = jsnoval.getString("user_key");//用户唯一标识
            String userChoose = jsnoval.getString("user_choose");//用户选项
            String[] user_choose = jsnoval.getString("user_answers").split(",");//用户答案
            if (StrUtil.isEmptyOrUndefined(dailyKey)) {
                renderJson(DataTemplate.wrapErrorData("题目标识不能为空"));
                return false;
            }
            if (StrUtil.isEmptyOrUndefined(userKey)) {
                renderJson(DataTemplate.wrapErrorData("用户标识不能为空"));
                return false;
            }
            if (StrUtil.isEmptyOrUndefined(userChoose)) {
                renderJson(DataTemplate.wrapErrorData("用户选项不能为空"));
                return false;
            }
            if (user_choose.length == 0) {
                renderJson(DataTemplate.wrapErrorData("用户答案不能为空"));
                return false;
            }
            String answers = redis.get("answers");//题目正确答案
            if (StrUtil.isEmptyOrUndefined(answers)) {//如果缓存为空就查询数据库
                Record record = Db.findFirst("select answers from ccp_study_daily where `key`=?", dailyKey);
                answers = record.getStr("answers");
            }
            Map<String, Object> map = ccpStudyImpl.addDaily(answers, jsnoval);//返回评分和评分状态
            if (map == null) {
                renderJson(DataTemplate.wrapErrorData("提交失败"));
                return false;
            }
            renderJson(DataTemplate.wrapSuccessData(map));
            return true;
        });
    }

    /**
     * 推荐
     */
    public void recommended() {
        Db.tx(Connection.TRANSACTION_SERIALIZABLE, () -> {
            JSONObject jsonObject = getRawObject();
            String userkey = jsonObject.getString("user_key");//用户唯一标识
            String name = jsonObject.getString("name");//题目标题
            String code = jsonObject.getString("cat_code");//题目类别
            String catname = jsonObject.getString("cat_name");//类别名
            String type = jsonObject.getString("type");//题目类型
            String answers = jsonObject.getString("answers");//题目正确答案
            String content = jsonObject.getString("item_count");//题目选项
            if (StrUtil.isEmptyOrUndefined(userkey)) {
                renderJson(DataTemplate.wrapErrorData("用户ID不能为空"));
                return false;
            }
            if (StrUtil.isEmptyOrUndefined(name)) {
                renderJson(DataTemplate.wrapErrorData("标题不能为空"));
                return false;
            }
            if (StrUtil.isEmptyOrUndefined(code)) {
                renderJson(DataTemplate.wrapErrorData("类别不能为空"));
                return false;
            }
            if (StrUtil.isEmptyOrUndefined(catname)) {
                renderJson(DataTemplate.wrapErrorData("类别名不能为空"));
                return false;
            }
            if (StrUtil.isEmptyOrUndefined(type)) {
                renderJson(DataTemplate.wrapErrorData("类型不能为空"));
                return false;
            }
            if (StrUtil.isEmptyOrUndefined(answers)) {
                renderJson(DataTemplate.wrapErrorData("正确答案不能为空"));
                return false;
            }
            if (StrUtil.isEmptyOrUndefined(content)) {
                renderJson(DataTemplate.wrapErrorData("题目选项答案不能为空"));
                return false;
            }

            int i = ccpStudyImpl.recommended(jsonObject);//添推荐题目
            if (i == 0) {
                renderJson(DataTemplate.wrapErrorData("推荐失败"));
                return false;
            }
            renderJson(DataTemplate.wrapSuccessData(i));
            return true;
        });
    }

    /**
     * 往期题库
     */
    public void review() {
        Integer page = getParaToInt("page");//当前页
        Integer pageSize = getParaToInt("page_size");//分页数
        if (page == null || pageSize == null) {
            return;
        }
        if (redis.get("reviews") == null) {
            List<Record> records = ccpStudyImpl.review(page, pageSize);//分页查询
            if (records == null) {
                renderJson(DataTemplate.wrapErrorData("往期题库查询失败"));
                return;
            }
            redis.set("reviews", records);
            List<JSONObject> jsonObjects = AssembleJson.json(records);//解析成jsonObject格式
            renderJson(DataTemplate.wrapSuccessData(jsonObjects));
            return;
        }else{
            List<Record> records = redis.get("reviews");
            List<JSONObject> jsonObjects = AssembleJson.json(records);//解析成jsonObject格式
            renderJson(DataTemplate.wrapSuccessData(jsonObjects));
        }
    }

    /**
     * 筛选
     */
    public void screening() {
        JSONObject jsonObject = getRawObject();
        String startTime = jsonObject.getString("start_time");//开始时间
        String endtTime = jsonObject.getString("end_time");//结束时间
        String catCode = jsonObject.getString("cat_code");//类别标识
        String name = jsonObject.getString("name");//推荐人
        Integer page = jsonObject.getIntValue("page");//当前页
        Integer pageSize = jsonObject.getIntValue("page_size");//分页数

        if (StrUtil.isEmptyOrUndefined(startTime) || StrUtil.isEmptyOrUndefined(endtTime)) {
            renderJson(DataTemplate.wrapErrorData("请准确输入完整的开始时间和结束时间"));
            return;
        }
        if (page == null || pageSize == null) {
            return;
        }
        List<Record> records = ccpStudyImpl.choose(startTime, endtTime, catCode, name, page, pageSize);//分页查询
        if (records == null) {
            renderJson(DataTemplate.wrapErrorData("筛选查询失败"));
            return;
        }
        List<JSONObject> jsonObjects = AssembleJson.json(records);//解析成jsonObject格式
        renderJson(DataTemplate.wrapSuccessData(jsonObjects));
    }

    /**
     * 用户答题记录
     */
    public void questionsRecord() {
        String userId = getPara("user_key");//用户唯一标识
        Integer page = getParaToInt("page");//当前页
        Integer pageSize = getParaToInt("page_size");//分页数
        if (StrUtil.isEmptyOrUndefined(userId)) {
            renderJson(DataTemplate.wrapErrorData("用户标识为空"));
            return;
        }
        if (page == null || pageSize == null) {
            return;
        }
        List<Record> objects = ccpStudyImpl.record(userId, page, pageSize);//分页查询
        if (objects == null) {
            renderJson(DataTemplate.wrapErrorData("答题记录查询失败"));
            return;
        }
        List<JSONObject> jsonObjects = AssembleJson.json(objects);//解析成jsonObject格式
        renderJson(DataTemplate.wrapSuccessData(jsonObjects));
    }

    /**
     * 用户答题记录详情
     */
    public void questionsDetails() {
        String userKey = getPara("user_key");//用户唯一标识
        String dailyKey = getPara("daily_key");//题目唯一标识
        String star = getPara("star");//答题状态0未答，(1正确，2错误--->已答题)
        if (StrUtil.isEmptyOrUndefined(userKey)) {
            renderJson(DataTemplate.wrapErrorData("用户标识不能为空"));
            return;
        }
        if (StrUtil.isEmptyOrUndefined(dailyKey)) {
            renderJson(DataTemplate.wrapErrorData("题目标识不能为空"));
            return;
        }
        if (StrUtil.isEmptyOrUndefined(star)) {
            renderJson(DataTemplate.wrapErrorData("题目状态不能为空"));
            return;
        }
        /**
         * star
         * 0代表未答题
         * 1代表已答题
         */
        Record record = ccpStudyImpl.questionsDetails(userKey, dailyKey, star);
        if (record == null) {
            renderJson(DataTemplate.wrapErrorData("查询失败"));
            return;
        }
        JSONObject jsonObjects = AssembleJson.json(record);
        renderJson(DataTemplate.wrapSuccessData(jsonObjects));
    }
}
