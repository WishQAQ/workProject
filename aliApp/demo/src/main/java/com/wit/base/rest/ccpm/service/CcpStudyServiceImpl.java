package com.wit.base.rest.ccpm.service;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.IAtom;
import com.jfinal.plugin.activerecord.Record;
import com.wit.base.rest.ccpm.utils.BaseException;
import com.wit.base.rest.ccpm.utils.ObjectUtil;
import com.wit.base.rest.ccpm.utils.ThreadUtil;
import io.jboot.Jboot;
import io.jboot.support.redis.JbootRedis;
import org.apache.log4j.Logger;

import java.sql.SQLException;
import java.text.ParseException;
import java.util.*;

import static com.wit.base.rest.ccpm.config.DbConfig.JIANGSU_CONFIG;

public class CcpStudyServiceImpl implements ICcpStudyService, Runnable {
    private Logger log = Logger.getLogger(CcpStudyServiceImpl.class);

    //    Cache redis = Redis.use("cache");
    JbootRedis redis = Jboot.getRedis();

    @Override
    public Map<String, Object> getTodayProblem(String userKey) throws BaseException {
        Record problemRecord = null;//获取redis中的今日问题
        boolean isAnswer = false;//是否已答题
        try {
            problemRecord = redis.get("study:problem_record");
        }catch (Exception e){
            log.error("学习redis连接异常",e);
        }
        //如果redis中没有今日一题或不是今日的，从数据库中获取
        if (problemRecord == null || !ObjectUtil.getNowTimeStr("yyyy-MM-dd").equals(problemRecord.getStr("use_date"))) {
            problemRecord = getTodayProblem4Db();
        }
        if (problemRecord == null) {
            Map<String, Object> map = new HashMap<>();
            return map;
        }
        //判断是否已经答题
        //获取redis中今日已答题人
        List<String> AlertAnswerList = null;
        String joinDate = null;//已答题记录设置时间
        Map<String,Object> map = null;//答题记录
        try {
            AlertAnswerList = redis.get("study:alertAnswerList");
            joinDate = redis.get("study:alertAnswerJoinDate");//已答题记录设置时间
            Map<String,Object> baseMap = redis.get("study:alertAnswerDetailMap");
            if(baseMap != null){
                map = (Map<String, Object>) baseMap.get(userKey);
                isAnswer = true;//已答题
            }else {
                map = new HashMap<>();
            }
        }catch (Exception e){
            log.error("学习redis连接异常",e);
        }
        //如果今日答题记录为空,获设置日期不是今天，查询数据库中的答题记录
        if (AlertAnswerList == null || !ObjectUtil.getNowTimeStr("yyyy-MM-dd").equals(joinDate)
                && !ObjectUtil.getNowTimeStr("yyyy-MM-dd").equals(map.get("answerDate"))) {
            AlertAnswerList = new ArrayList<>();
            //查询用户评论
            CcpStudyThread studyThread = new CcpStudyThread();
            studyThread.setUserKey(userKey);
            studyThread.setDailyKey(problemRecord.getStr("key"));
            //查询用户评论 存入 commentRecord
            ThreadUtil queryComment = new ThreadUtil(studyThread,"queryComment");
            queryComment.start();
            String sql = "select user_answer,user_choose from ccp_study_record where creator_key = ? and daily_key = ? and delete_time = 0";
            Record record = Db.use(JIANGSU_CONFIG).findFirst(sql, userKey, problemRecord.getStr("key"));
            if(record != null){
                isAnswer = true;
                map.put("userAnswer",record.getStr("user_answer"));
                map.put("userChoose",record.getStr("user_choose"));
            }
            try {
                queryComment.join();
            }catch (Exception e){
                throw new BaseException("查询答题情况异常");
            }
            studyThread.isError();//查看线程是否存在异常
            Record commentRecord = studyThread.getCommentRecord();
            if(commentRecord != null){
                map.put("userScore",record.getStr("score"));
            }
        }
        //将答题信息存入返回数据中
        problemRecord.set("is_answer",isAnswer);//是否已答题
        problemRecord.set("user_answer",map.get("userAnswers"));//用户答案
        problemRecord.set("user_choose",map.get("userChoose"));//用户选项
        problemRecord.set("user_score",map.get("userScore"));//用户评价
        //评价分保留两位小数
        problemRecord.set("average",String.format(problemRecord.getStr("average"),"%.2f"));
        //将答案清空再返回
        problemRecord.set("answers", null);
        //将选项转为数据
        problemRecord.set("content",JSON.parse(problemRecord.getStr("content")));
        return ObjectUtil.recordToMap(problemRecord);
    }

    /**
     * 从数据库获取今日问题
     *
     * @return
     */
    private Record getTodayProblem4Db() {
        String sql = "select `key`,name,content,cat_name,type,answers,prompt,average,create_time ,user_key,use_date from ccp_study_daily " +
                " where use_date=date_format(now(), '%Y-%m-%d') and delete_time = 0 order by create_time desc";
        Record record = Db.use(JIANGSU_CONFIG).findFirst(sql);
        if (record == null) {
            return null;
        }
        //查询用户
        Record userRecord = Db.use(JIANGSU_CONFIG).findFirst("select name user_name,avatar user_head from " +
                "sys_user where `key` = ? and delete_time = 0", record.getStr("user_key"));
        if(userRecord != null){
            record.set("user_name", userRecord.getStr("user_name"));
            record.set("user_head", userRecord.getStr("user_head"));
        }
        try {
            redis.set("study:problem_record", record);
            redis.set("study:answers", record.getStr("answers"));
        }catch (Exception e){
            log.error("学习redis连接异常",e);
        }
        return record;
    }

    @Override
    public Map<String, Object> addAnswer(String dailyKey, String userKey, String userChoose, String userAnswers, String userScore) throws BaseException {
        //获取redis中今日已答题人
        List<String> AlertAnswerList = null;
        String joinDate = null;//已答题记录设置时间
        try {
            AlertAnswerList = redis.get("study:alertAnswerList");
            joinDate = redis.get("study:alertAnswerJoinDate");//已答题记录设置时间
        }catch (Exception e){
            log.error("学习redis连接异常",e);
        }
        //如果今日答题记录为空,获设置日期不是今天，查询数据库中的答题记录
        if (AlertAnswerList == null || !ObjectUtil.getNowTimeStr("yyyy-MM-dd").equals(joinDate)) {
            AlertAnswerList = new ArrayList<>();
            String sql = "select count(1) count from ccp_study_record where creator_key = ? and daily_key = ? and delete_time = 0";
            int count = Db.use(JIANGSU_CONFIG).findFirst(sql, userKey, dailyKey).getInt("count");
            if(count > 0){
                throw new BaseException("您已经答过该题，只能进行一次答题操作");
            }
        }
        if (AlertAnswerList.contains(userKey)) {
            throw new BaseException("您今日已答题，只能进行一次答题操作");
        }
        String answers = null;//题目正确答案
        try {
            answers = redis.get("answers");//题目正确答案
        }catch (Exception e){
            log.error("学习redis连接异常",e);
        }
        if (ObjectUtil.stringIsEmptyOrUndefined(answers)) {//如果缓存为空就查询数据库
            Record record = Db.use(JIANGSU_CONFIG).findFirst("select answers,use_date from ccp_study_daily where `key`=?", dailyKey);
            if(record == null){
                throw new BaseException("未找到题目信息");
            }
            answers = record.getStr("answers");
            try {
                //如果是今日答案，存入redis
                if(ObjectUtil.getNowTimeStr("yyyy-MM-dd").equals(record.getStr("use_date"))){
                    redis.set("study:answers", answers);
                }
            }catch (Exception e){
                log.error("学习redis连接异常",e);
            }
        }
        String[] answersArray = answers.split(","); //正确答案
        String[] userAnswersArray = userAnswers.split(",");//用户答案
        //判断答题是否正确 //答案正确：0未答题，1正确，2错误
        int isCorrect = Arrays.equals(answersArray, userAnswersArray) ? 1 : 2;
        //获取题目信息
        Record problemRecord = null;
        try {
            problemRecord = redis.get("study:problem_record");
        }catch (Exception e){
            log.error("学习redis连接异常",e);
        }
        if (problemRecord == null || !ObjectUtil.getNowTimeStr("yyyy-MM-dd").equals(problemRecord.getStr("use_date"))) {//redis中不存在题目信息，从数据库中获取
            problemRecord = getTodayProblem4Db();//从数据库获取题目
        }
        if(problemRecord == null){
            throw new BaseException("答题发生错误，没找到该题目信息");
        }
        if(!ObjectUtil.getNowTimeStr("yyyy-MM-dd").equals(problemRecord.getStr("use_date"))
            || !problemRecord.getStr("key").equals(dailyKey) ){
            throw new BaseException("答题的题目只能为今天的题目");
        }
        String nowTime = ObjectUtil.getNowTimeStr();
        Record studyRecord = new Record();//答题记录
        studyRecord.set("_id", ObjectUtil.getUUID())
                .set("key", ObjectUtil.getUUID())
                .set("daily_key", dailyKey)
                .set("daily_type", problemRecord.getStr("type"))
                .set("daily_name", problemRecord.getStr("name"))
                .set("daily_choose", problemRecord.getStr("content"))
                .set("correct_answer", problemRecord.getStr("answers"))
                .set("user_key", userKey)
                .set("user_choose", userChoose)
                .set("user_answer",userAnswers)
                .set("is_correct", isCorrect)
                .set("create_time", nowTime)
                .set("creator_key", userKey);
        //答题扩展，评价
        Record studyExtendRecord = new Record();
        if (!ObjectUtil.stringIsEmptyOrUndefined(userScore)) {  //判断评分是否为空
            studyExtendRecord.set("_id", ObjectUtil.getUUID())
                    .set("key", ObjectUtil.getUUID())
                    .set("record_key", studyRecord.getStr("key"))
                    .set("user_key", userKey)
                    .set("daily_key", dailyKey)
                    .set("daily_name", problemRecord.getStr("name"))
                    .set("score", userScore)
                    .set("create_time", nowTime)
                    .set("creator_key", userKey)
                    .set("status", 1);//1已评分
        }
        boolean result = Db.tx(new IAtom() {
            @Override
            public boolean run() throws SQLException {
                boolean recordResult = Db.use(JIANGSU_CONFIG).save("ccp_study_record", studyRecord);
                //如果存在数据，存入
                boolean extendResult = true;
                if(!ObjectUtil.stringIsEmpty(studyExtendRecord.getStr("key"))){
                    extendResult = Db.use(JIANGSU_CONFIG).save("ccp_study_record_extendes", studyExtendRecord);
                }
                return recordResult && extendResult;
            }
        });
        //计算当前评价人数和平均分
        String avgSql = "select round(AVG(score),1) as score_avg from ccp_study_record_extendes where daily_key = ? and score!=0;";
        Record ce = Db.findFirst(avgSql, dailyKey);
        String avg = ce.getStr("score_avg");//平均分
        if (result) {//修改评价分，评价人数，答题人数,将查询值作为修改，避免脏数据
            String sql = "update ccp_study_daily csd inner join (select count(score) as eval,case when round(AVG(score),1) is null " +
                    " then 0 else round(AVG(score),1) END  as score_avg,daily_key from ccp_study_record_extendes where " +
                    " daily_key = ? and score!=0)t1 on csd.key = t1.daily_key set " +
                    " csd.answer_count = case when csd.answer_count is null then 0+1 else csd.answer_count+1 end,csd.review_count = t1.eval,csd.average = t1.score_avg";
            int update = Db.use(JIANGSU_CONFIG).update(sql, dailyKey);
            //将答题记录存入redis，防止多次答题
            AlertAnswerList.add(userKey);
            try {
                //将答题信息存入redis
                Map<String,Object> map = new HashMap<>();
                map.put("userAnswers",userAnswers);
                map.put("userChoose",userChoose);
                map.put("userScore",userScore);
                map.put("answerDate",ObjectUtil.getNowTimeStr("yyyy-MM-dd"));
                Map<String,Object> baseMap = new HashMap<>();
                baseMap.put(userKey,map);//用userKey作为key，方便取值
                redis.set("study:alertAnswerDetailMap",baseMap);
                redis.set("study:alertAnswerList", AlertAnswerList);
                //如果答题记录日期不为今日将设置日期设置为今日
                if(!ObjectUtil.getNowTimeStr("yyyy-MM-dd").equals(joinDate)){
                    redis.set("study:alertAnswerJoinDate",ObjectUtil.getNowTimeStr("yyyy-MM-dd"));
                }
            }catch (Exception e){
                log.error("学习redis连接异常",e);
            }
        }
        //返回评分和状态
        Map<String, Object> map = new HashMap<String, Object>();
        map.put("avg", ObjectUtil.stringIsEmpty(avg) ? "0.0" : String.format(avg, "%.1f"));
        map.put("status", !ObjectUtil.stringIsEmpty(userScore));//是否评价
        return map;
    }


    @Override
    public boolean addRecommended(String userKey, String userName, String catCode, String catName, String name,
                                  String type, String answers, String itemCount, String prompt) {
        String typeName = "单选";
        if ("2".equals(type)) {
            typeName = "多选";
        }
        String contentExten = ""; //选项扩展
        JSONArray itemArray = JSON.parseArray(itemCount);
        for (int i = 0; i < itemArray.size(); i++) {
            JSONObject object = itemArray.getJSONObject(i);
            contentExten += (i + 1) + ":" + object.getString("text") + " ";
        }
        Record record = new Record();
        record.set("_id", ObjectUtil.getUUID())
                .set("key", ObjectUtil.getUUID())
                .set("user_key", userKey)
                .set("user_name", userName)
                .set("cat_code", catCode)
                .set("cat_name", catName)
                .set("name", name)
                .set("type", type)
                .set("type_name", typeName)
                .set("item_count", itemArray.size())
                .set("content", itemArray.toJSONString())
                .set("content_exten", contentExten)
                .set("answers", answers)
                .set("prompt", prompt)
                .set("create_time", ObjectUtil.getNowTimeStr())
                .set("creator_key", userKey);
        boolean result = Db.use(JIANGSU_CONFIG).save("ccp_study_advance", record);
        return result;
    }

    @Override
    public Map<String, Object> reviewProblem(int page, int size, String catCode, String name, String startTime, String endTime,boolean removeNowDay) throws BaseException {
        Map<String, Object> map = new HashMap<>();
        List<Record> records = null;
        String joinDate = null;//redis记录加入时间
        try {
            records = redis.get("study:reviewsProblemList");
            joinDate = redis.get("study:reviewsJoinDate");//redis记录加入时间
        }catch (Exception e){
            log.error("学习redis连接异常",e);
        }
        int count = 0;
        //redis中不存入数据或者不是今天添加的数据，查询数据库，同时异步将所有历史问题存入redis
        if (records == null || records.isEmpty() || !ObjectUtil.getNowTimeStr("yyyy-MM-dd").equals(joinDate)) {
            CcpStudyThread studyThread = new CcpStudyThread();
            //查询往期问题总数，存入 reviewProblemCount
            ThreadUtil queryReviewProblemCount = new ThreadUtil(studyThread, "queryReviewProblemCount");
            queryReviewProblemCount.start();
            StringBuilder condition = new StringBuilder();
            List<Object> paramList = new ArrayList<>();//参数
            if (!ObjectUtil.stringIsEmptyOrUndefined(startTime)) {//开始时间
                condition.append(" and use_date >= ?");
                paramList.add(startTime);
            }
            if (!ObjectUtil.stringIsEmptyOrUndefined(endTime)) {//结束时间
                condition.append(" and use_date < ?");
                paramList.add(endTime);
            }
            if (!ObjectUtil.stringIsEmptyOrUndefined(catCode)) {//类别
                String[] catCodeArray = catCode.split(",");//可查询多个类别，逗号拆分
                StringBuilder temp = new StringBuilder();
                for (String str : catCodeArray) {
                    temp.append("?,");
                    paramList.add(str);
                }
                condition.append(" and cat_code in(" + temp.deleteCharAt(temp.length() - 1) + ") ");
            }
            if (!ObjectUtil.stringIsEmptyOrUndefined(name)) {//推荐人姓名
                String sql = "select `key` from sys_user where name like ? and delete_time = 0";
                List<Record> userRecords = Db.use(JIANGSU_CONFIG).find(sql, "%" + name + "%");
                if(userRecords != null && !userRecords.isEmpty()){
                    StringBuilder temp = new StringBuilder();
                    for (Record record : userRecords) {
                        temp.append("?,");
                        paramList.add(record.getStr("key"));
                    }
                    condition.append(" and creator_key in(" + temp.deleteCharAt(temp.length() - 1) + ") ");
                }
            }
            String sql = "select `key`,name,content,cat_name,type,answers,prompt,average,create_time ,user_key,use_date from ccp_study_daily " +
                    " where delete_time = 0  " + condition + " order by create_time desc limit ?,?";
            paramList.add((page - 1) * size);
            paramList.add(size);
            records = Db.use(JIANGSU_CONFIG).find(sql, paramList.toArray());
            if (records != null && !records.isEmpty()) {
                setCreatorInfo(records);//将每日一题的创建人存入集合
                try {
                    queryReviewProblemCount.join();
                } catch (Exception e) {
                    log.error("获取往期问题错误", e);
                    throw new BaseException("获取问题发生错误");
                }
                studyThread.isError();//判断线程是否发送异常
                count = studyThread.getReviewProblemCount();
                for (Record record:records) {
                    //将选项转为对象
                    record.set("content",JSONObject.parse(record.getStr("content")));
                }
                //开启线程，异步将历史问题存入redis
                ThreadUtil setReviewsProblem = new ThreadUtil(this, "setReviewsProblem");
                setReviewsProblem.start();
            }
        } else {
            List<Record> tempRecords = new ArrayList<>();
            int startIndex = (page - 1) * 10;
            //进行条件赛选
            for (int i = 0; i < records.size(); i++) {
                //判断是否移除今日题目
                if(removeNowDay){
                    //如果使用日期为今日，移除
                    if (ObjectUtil.getNowTimeStr("yyyy-MM-dd").equals(records.get(i).getStr("use_date"))) {
                        records.remove(i);
                        i--;
                        continue;
                    }
                }

                long useDate = 0;
                try {
                    useDate = ObjectUtil.strToDate(records.get(i).getStr("use_date"), "yyyy-MM-dd").getTime();
                } catch (ParseException e) {
                    //数据异常，移除
                    log.error("每日一题使用时间异常", e);
                    records.remove(i);
                    i--;
                    continue;
                }
                if (!ObjectUtil.stringIsEmptyOrUndefined(startTime)) {//开始时间
                    try {
                        if (useDate < ObjectUtil.strToDate(startTime, "yyyy-MM-dd").getTime()) {
                            records.remove(i);//不满足条件，剔除
                            i--;
                            continue;
                        }
                    } catch (Exception e) {
                        log.error("查询历史题库开始时间格式错误", e);
                        throw new BaseException("开始时间格式错误");
                    }
                }
                if (!ObjectUtil.stringIsEmptyOrUndefined(endTime)) {//结束时间
                    try {
                        if (useDate >= ObjectUtil.strToDate(endTime, "yyyy-MM-dd").getTime()) {
                            records.remove(i);//不满足条件，剔除
                            i--;
                            continue;
                        }
                    } catch (Exception e) {
                        log.error("查询历史题库结束时间格式错误", e);
                        throw new BaseException("结束时间格式错误");
                    }
                }
                if (!ObjectUtil.stringIsEmptyOrUndefined(catCode)) {//类别
                    String[] catCodeArray = catCode.split(",");//可查询多个类别，逗号拆分
                    StringBuilder temp = new StringBuilder();
                    boolean isRemove = true;//是否删除
                    for (String str : catCodeArray) {
                        if (records.get(i).get("cat_code") == null ||records.get(i).getStr("cat_code").equals(str)) {
                            isRemove = false;
                            break;
                        }
                    }
                    if (isRemove) {
                        records.remove(i);//不满足条件，剔除
                        i--;
                        continue;
                    }
                }
                if (!ObjectUtil.stringIsEmptyOrUndefined(name)) {//推荐人姓名
                    if (!records.get(i).getStr("user_name").contains(name)) {
                        records.remove(i);//不满足条件，剔除
                        i--;
                    }
                }
            }
            count = records.size();
            //将redis数据进行分页
            for (int i = 0; i < records.size(); i++) {
                if (i >= startIndex && i < page * size) {
                    //将选项转为对象
                    records.get(i).set("content",JSONObject.parse(records.get(i).getStr("content")));
                    tempRecords.add(records.get(i));
                }
            }
            records = tempRecords;
        }
        int countPage = count % size == 0 ? count / size : count / size + 1;
        map.put("list", records);
        map.put("count", count);
        map.put("count_page", countPage);
        map.put("page", page);
        map.put("size", size);
        return map;
    }

    /**
     * 设置每日一题设置人
     *
     * @param records
     */
    private void setCreatorInfo(List<Record> records) {
        StringBuilder userKeys = new StringBuilder();
        List<String> paramList = new ArrayList<>();
        for (Record record : records) {
            userKeys.append("?,");
            paramList.add(record.getStr("user_key"));
        }
        userKeys.deleteCharAt(userKeys.length() - 1);
        //查询用户
        List<Record> userRecords = Db.use(JIANGSU_CONFIG).find("select name user_name,avatar user_head,`key` from " +
                "sys_user where `key` in(" + userKeys + ") and delete_time = 0", paramList.toArray());
        Map<String, Object> userMap = ObjectUtil.recordToMapMultipleValue(userRecords, "key");
        for (Record record : records) {
            Map<String, Object> map = (Map<String, Object>) userMap.get(record.getStr("user_key"));
            if(map != null){
                record.set("user_name", map.get("user_name"));
                record.set("user_head", map.get("user_head"));
            }
        }
    }

    /**
     * 清理redis中每日一题,将历史问题存入redis
     */
    @Override
    public void run() {
        redis.del("study:problem_record", "study:answers","study:alertAnswerList");
        setReviewsProblem();//将历史问题设置入redis
    }

    /**
     * 设置问题入redis,异步调用
     */
    public List<Record> setReviewsProblem() {
        //将所有题目存入redis
        String sql = "select cs.`key`,cs.name,cs.content,cs.cat_name,cs.type,cs.answers,cs.prompt,cs.average,cs.create_time,cat_code " +
                ",cs.user_key,cs.use_date, su.name user_name,su.avatar user_head " +
                "from ccp_study_daily cs left join sys_user su on cs.creator_key = su.key where  cs.delete_time = 0 order by cs.use_date desc";
        //将荐题人设置入数据
        List<Record> records = Db.use(JIANGSU_CONFIG).find(sql);
        if (records == null) {
            return null;
        }
        setCreatorInfo(records);//将每日一题的创建人存入集合
        redis.set("study:reviewsProblemList", records);
        redis.set("study:reviewsJoinDate", ObjectUtil.getNowTimeStr("yyyy-MM-dd"));
        return records;
    }

    @Override
    public Map<String,Object> questionsRecord(String userKey, int year, int month) throws BaseException {
        CcpStudyThread studyThread = new CcpStudyThread();
        //查询问题总数，存入 problemCount
        ThreadUtil queryProblemCount = null;
        int count = 0;
        //计算结束时间
        int endYear = month == 12 ?year += 1:year;
        int endMonth = month == 12 ? 1:month+1;
        //获取当月所有问题
        Map<String, Object> problemMap = reviewProblem(1, 31, null, null,
                year + "-" + month+"-01", endYear + "-" + endMonth+"-01",false);
        List<Record> problemRecords = problemMap.get("list")==null?null:(List<Record>)problemMap.get("list");
        Map<String,Map<String,Object>> tempMap = new HashMap<>();
        StringBuilder dailyKeys = new StringBuilder();
        List<String> paramList = new ArrayList<>();//返回的数据
        for (Record record:problemRecords) {
            //添加返回数据
            Map<String,Object> map = new HashMap<>();
            map.put("use_date",record.getStr("use_date"));
            map.put("daily_key",record.getStr("key"));
            map.put("have_topic",true);//是否有设置题目
            dailyKeys.append("?,");
            paramList.add(record.getStr("key"));//问题key，参数
            try {
                tempMap.put(ObjectUtil.timeStrToMap(record.getStr("use_date"),"yyyy-MM-dd").get("day")+"",map);
            } catch (ParseException e) {
                log.error("题目日期格式错误",e);
                throw new BaseException("题目日期格式错误");
            }
        }
        Map<String, Object> answerMap = null;//答题记录
        if(dailyKeys.length()>0){
            dailyKeys.deleteCharAt(dailyKeys.length()-1);
            //查询用户答题记录
            String sql = "select daily_key from ccp_study_record where daily_key in("+dailyKeys+") and creator_key = ? and delete_time = 0";
            paramList.add(userKey);//将需要查询答题记录的用户key存入参数中
            List<Record> records = Db.use(JIANGSU_CONFIG).find(sql, paramList.toArray());
            answerMap = ObjectUtil.recordToMapAloneValue(records, "daily_key", "null");//valueName随意传入，无实际意义
        }
        //将用户答题状态存入返回数据中
        int monthDays = 31;//需要返回的天数
        if(month ==  ObjectUtil.getNowMonth() && year == ObjectUtil.getNowYear()){//如果是当年月，只循环到当前天
            monthDays = ObjectUtil.getNowDay();
        }else if(month == 2){
            if((year %4 == 0 && year % 100!=0)||year % 400 == 0){
                monthDays = 29;
            }else{
                monthDays = 28;
            }
        }else if(month%2 == 0){
            monthDays = 30;
        }
        List<Map<String,Object>> resultList = new ArrayList<>();
        //循环将存入的题目加入返回集合，不存在则自动补齐
        for (int i = 1;i<= monthDays ; i++){
            Map<String, Object> map = tempMap.get(i + "");
            if(map == null){
                map = new HashMap<>();
                map.put("have_topic",false);//是否有设置题目
                map.put("is_answer",false);
            }else if(answerMap.containsKey(map.get("daily_key"))){
                map.put("is_answer",true);
            }else{
                map.put("is_answer",false);
            }
            map.put("day",i);
            resultList.add(map);
        }
        try {
            if(queryProblemCount!=null)queryProblemCount.join();
        } catch (Exception e) {
            log.error("获取答题记录错误", e);
            throw new BaseException("获取答题记录发生错误");
        }
        studyThread.isError();//查看线程是否发生错误
        Map<String,Object> resultMap = new HashMap<>();
        resultMap.put("year",year);
        resultMap.put("month",month);
        resultMap.put("month_day",monthDays);
        resultMap.put("list",resultList);
        return resultMap;
    }

    @Override
    public Map<String, Object> questionsDetails(String userKey, String dailyKey) throws BaseException {
        //获取所有问题
        List<Record> problemRecords = null;
        try {
            problemRecords = redis.get("study:reviewsProblemList");
        }catch (Exception e){
            log.error("学习redis连接异常",e);
        }
        Record problemRecord = null;//需要查询的记录
        CcpStudyThread studyThread = new CcpStudyThread();
        studyThread.setUserKey(userKey);
        studyThread.setDailyKey(dailyKey);
        //查询用户该题答题情况 answerRecord
        ThreadUtil queryAnswerDetail = new ThreadUtil(studyThread,"queryAnswerDetail");
        queryAnswerDetail.start();
        //查询用户评价 commentRecord
        ThreadUtil queryComment = new ThreadUtil(studyThread,"queryComment");
        queryComment.start();
        //如果为空，从数据库中查询
        if (problemRecords == null || problemRecords.isEmpty()) {
            String sql = "select `key`,name,content,cat_name,type,answers,prompt,average,create_time ,user_key,use_date from ccp_study_daily " +
                    " where `key` = ? delete_time = 0";
            problemRecord = Db.use(JIANGSU_CONFIG).findFirst(sql,dailyKey);
            if(problemRecord == null){
                throw new BaseException("没有查询到该题记录");
            }
            //查询荐题人头像、姓名
            String userSql = "select name user_name,avatar user_head from sys_user where `key` = ? and delete_time = 0";
            Record userRecord = Db.use(JIANGSU_CONFIG).findFirst(userSql, problemRecord.getStr("user_key"));
            if(userRecord != null){
                problemRecord.set("user_name",userRecord.getStr("user_name"));
                problemRecord.set("user_head",userRecord.getStr("user_head"));
            }
        }else{
            for (Record record:problemRecords) {
                if(record.getStr("key").equals(dailyKey)){
                    problemRecord = record;
                    break;
                }
            }
        }
        if(problemRecord == null){
            throw new BaseException("没有查询到该题记录");
        }
        try {
            queryAnswerDetail.join();
            queryComment.join();
        }catch (Exception e){
            log.error("查询答题详情错误",e);
            throw new BaseException("查询答题详情错误");
        }
        studyThread.isError();//查看线程是否发生异常
        //将评价和答题情况设置入返回信息
        Record answerRecord = studyThread.getAnswerRecord();
        Record commentRecord = studyThread.getCommentRecord();
        if(answerRecord != null){
            problemRecord.set("user_answer",answerRecord.getStr("user_answer"));
            problemRecord.set("user_choose",answerRecord.getStr("user_choose"));
            int isCorrect = Integer.parseInt(answerRecord.getStr("is_correct"));
            //如果是当天的题目，不公布答题状况
            if(ObjectUtil.getNowTimeStr("yyyy-MM-dd").equals(problemRecord.getStr("use_date"))){
                isCorrect = 3;
                //将正确答案去除
                problemRecord.set("answers",null);
            }
            problemRecord.set("is_correct",isCorrect);
        }else{
            problemRecord.set("is_correct",0);//未答题
        }
        if(commentRecord != null){
            problemRecord.set("score",commentRecord.getStr("score"));
            problemRecord.set("comments",commentRecord.getStr("comments"));
        }
        //如果redis历史问题为空，异步将数据存入redis
        if (problemRecords == null || problemRecords.isEmpty()) {
            //开启线程，异步将历史问题存入redis
            ThreadUtil setReviewsProblem = new ThreadUtil(this, "setReviewsProblem");
            setReviewsProblem.start();
        }
        //将内容设为对象
        problemRecord.set("content",JSONObject.parse(problemRecord.getStr("content")));
        return ObjectUtil.recordToMap(problemRecord);
    }
}
