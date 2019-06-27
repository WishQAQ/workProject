package com.wit.base.rest.ccpm.service;

import cn.hutool.core.util.StrUtil;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Page;
import com.jfinal.plugin.activerecord.Record;
import com.wit.base.rest.ccpm.utils.study.Questions;

import java.math.BigInteger;
import java.text.SimpleDateFormat;
import java.util.*;

public class CcpStudyImpl {

    /**
     * 每日一题
     * @param
     * @return
     */
    public Record init() {
        String sql = "select a.`key`,a.`name`,a.content,a.cat_name,a.type,a.answers,a.prompt,a.average,a.create_time,b.user_name,b.user_head from ccp_study_daily a,ccp_study_user_del b where b.`key`=a.user_key and a.use_date=date_format(now(), '%Y-%m-%d') and a.delete_time=0 ORDER BY a.id asc limit 0,1";
        Record re = Db.findFirst(sql);
        return re;
    }
    /**
     * 每日一题提交
     * @param
     * @param o
     * @return
     */
    public Map<String, Object> addDaily(String answers, JSONObject o) {
        Map<String, Object> map = new HashMap<String, Object>();

        String dailyKey = o.getString("key");          //题目唯一标识
        String userKey = o.getString("user_key");      //用户唯一标识
        String userChoose = o.getString("user_choose");//用户选项
        String userScore = "0";   //用户评分
        int status = 0;     //评分状态 0未评分，1已评分
        if(!StrUtil.isEmptyOrUndefined(o.getString("user_score"))){  //判断评分是否为空
            userScore = o.getString("user_score");   //不为空就获取评分
            status = 1;  //修改评分状态为1
        }
        String[] arr = answers.split(","); //正确答案
        String userAnswers = o.getString("user_answers"); //用户答案
        userAnswers = userAnswers.replace(",","");
        String[] userAnswersArr = userAnswers.split(",");
        int isCorrect = 2;  //答案正确：0未答题，1正确，2错误
        int b = Questions.answerJudge(userAnswersArr, arr); //判断用户答案是否正确
        if (b != 0) { //不等于0
            isCorrect = 1; //修改正确状态为1
        }

        String sql = "select `type`,`name`,content,answers from ccp_study_daily where `key`= ?";//根据题目id获取信息
        Record c = Db.findFirst(sql,dailyKey);      //查询当前题目信息
        String dyType = c.getStr("type");   //题目类型
        String dyName = c.getStr("name");   //题目标题
        String dyContent = c.getStr("content");//题目选项
        String dyAnswers = c.getStr("answers");//题目答案
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");//当前时间
        String time = sdf.format(new Date());
        String uuid = UUID.randomUUID().toString(); //生成uuid


        //答题记录
        String recordSql = "INSERT into ccp_study_record(_id,`key`,daily_key,daily_type,daily_name,daily_choose,correct_answer,user_key,user_answer,user_choose,is_correct,create_time,creator_key) VALUES(1,?,?,?,?,?,?,?,?,?,?,?,?)";
        int i = Db.update(recordSql, uuid, dailyKey, dyType, dyName, dyContent, dyAnswers, userKey,userAnswers, userChoose, isCorrect, time, userKey);

        //答题记录扩展
        String extendes = "INSERT into ccp_study_record_extendes(_id,`key`,record_key,user_key,daily_key,daily_name,score,create_time,creator_key,status) VALUES(1,UUID(),?,?,?,?,?,?,?,?)";
        Db.update(extendes, uuid, userKey, dailyKey, dyName, userScore, time, userKey, status);

        //计算当前答题人数
        String numberans = "SELECT count(daily_key) as num from ccp_study_record where daily_key=?";
        Record record = Db.findFirst(numberans, dailyKey);
        String number = record.getStr("num");//答题人数

        //计算当前评价人数和平均分
        String evle = "select count(score) as eval,round(AVG(score),1) as ave from ccp_study_record_extendes where daily_key = ? and score!=0;";
        Record ce = Db.findFirst(evle, dailyKey);
        String evalNumber = ce.getStr("eval");//评价人数
        String avg = ce.getStr("ave");//平均分
        if(StrUtil.isEmptyOrUndefined(avg)){
            avg = "0";
        }

        //添加平均分和评价人数到当前题目数据列中
        String calculate = "update ccp_study_daily SET review_count=?, answer_count = ?, average = ? where `key` = ?";
        Db.update(calculate, evalNumber, number, avg, dailyKey);

        //返回评分和状态
        map.put("avg",avg);
        map.put("status", status);
        return map;
    }
    /**
     * 推荐人出题
     * @param jsonobj2
     * @return
     */
    public int recommended(JSONObject jsonobj2) {
        BigInteger userKey = jsonobj2.getBigInteger("user_key");//根据user_key查询名字，头像信息
        String username = "小明";
        String name = jsonobj2.getString("name");//题目
        String code = jsonobj2.getString("cat_code");//类别
        String catname = jsonobj2.getString("cat_name");//类别名
        String type = jsonobj2.getString("type");//类型
        String typeName ="单选";
        if("2".equals(type)){
            typeName = "多选";
        }
        String answers = jsonobj2.getString("answers");//答案
        answers = answers.replace(",","");//清除答案中的逗号
        String prompt = jsonobj2.getString("prompt");//提示
        JSONArray content = jsonobj2.getJSONArray("item_count");//选项（选项数量）
        String contentExten = ""; //选项扩展
        for(int i=0;i<content.size();i++){
            JSONObject object = content.getJSONObject(i);
            contentExten += (i+1)+":"+ object.getString("text")+" ";
        }
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        String time = sdf.format(new Date());//当前时间

        //保存推荐人题目
        String sql = "INSERT INTO ccp_study_advance(_id,`key`,user_key,user_name,cat_code,cat_name,`name`,`type`,type_name,item_count,content,content_exten,answers,prompt,create_time,creator_key) VALUES(1,UUID(),?,?,?,?,?,?,?,?,?,?,?,?,?,?);";
        int i = Db.update(sql,userKey,username,code,catname,name,type,typeName,content.size(),content.toString(),contentExten,answers,prompt,time,username);
        return i;
    }
    /**
     * 往期题库
     * @param page
     * @param pageSize
     * @return
     */
    public List<Record> review(Integer page, Integer pageSize) {
        String sqlStar = "select a.`key`,a.`name`,a.content,a.cat_name,a.type,a.answers,a.prompt,a.average,a.create_time,b.`key`,b.user_name,b.user_head";
        String sqlEnd = "from ccp_study_daily a,ccp_study_user_del b where a.user_key=b.`key` and a.use_date<date_format(now(), '%Y-%m-%d') and a.delete_time=0 ORDER BY a.id desc";
        Page<Record> paginate = Db.paginate(page,pageSize,sqlStar,sqlEnd);
        if(paginate == null){
            return null;
        }
        List<Record> records = paginate.getList();
        return records;
    }
    /**
     * 筛选
     * @param startTime
     * @param endtTime
     * @param catCode
     * @param name
     * @param page
     * @param pageSize
     */
    public List<Record> choose(String startTime, String endtTime, String catCode, String name, Integer page, Integer pageSize) {

        String sqlStar = "select a.`key`,a.`name`,a.content,a.cat_name,a.type,a.answers,a.prompt,a.average,a.create_time,b.`key`,b.user_name,b.user_head";
        String sqlEnd = "from ccp_study_daily a,ccp_study_user_del b where a.user_key=b.`key` and a.delete_time=0";

        //开始时间和结束时间
        if(!StrUtil.isEmptyOrUndefined(startTime) && !StrUtil.isEmptyOrUndefined(endtTime)){
            sqlEnd+=" and a.use_date between '"+startTime+"'and '" + endtTime+"'";
        }
        //类别code
        if(!StrUtil.isEmptyOrUndefined(catCode)){
            sqlEnd+=" and a.cat_code in ("+catCode+")";
        }
        //推荐人姓名
        if(!StrUtil.isEmptyOrUndefined(name)){
            sqlEnd+=" and b.user_name = '"+name+"'";
        }
        Page<Record> paginate = Db.paginate(page,pageSize,sqlStar,sqlEnd);
        if(paginate == null){
            return null;
        }
        List<Record> records = paginate.getList();
        return records;
    }

    /**
     * 用户答题记录
     */
    public List<Record> record(String userId, Integer page, Integer pageSize) {
        String sqlStar = "select b.is_correct,b.create_time";
        String sqlEnt = "from ccp_study_daily a,ccp_study_record b,ccp_study_user_del c where a.`key`=b.daily_key and a.user_key=c.`key` and a.create_time=date_format(now(), '%Y-%m-%d') and a.delete_time=0 and c.`key`=?";
        Page<Record> paginate = Db.paginate(page,pageSize,sqlStar,sqlEnt,userId);
        if(paginate == null){
            return null;
        }
        List<Record> objects =  paginate.getList();
        return objects;
    }

    /**
     * 用户答题记录详情
     * @param userKey
     * @param dailyKey
     * @return
     */
    public Record questionsDetails(String userKey, String dailyKey ,String star) {
        Record record = null;
        if ("0".equals(star)) {
            String nsql = "SELECT a.`key`,a.`name`,a.content,a.cat_name,a.type,a.answers,a.prompt,a.average,a.create_time,b.`key`,b.user_name,b.user_head from ccp_study_daily a,ccp_study_user_del b where b.`key`=? and a.`key`= ? and a.user_key=b.`key`";
            record = Db.findFirst(nsql,userKey,dailyKey);
        } else if ("1".equals(star)) {
            String hsql = "SELECT c.user_name,c.user_head,a.`key`,a.`name`,a.content,a.cat_name,a.type,a.answers,a.prompt,a.average,a.create_time,b.user_answer,b.is_correct,b.user_choose,d.score,d.status from ccp_study_daily a,ccp_study_record b,ccp_study_user_del c,ccp_study_record_extendes d where a.`key`= b.daily_key and a.user_key=c.`key` and b.`key`=d.record_key and a.`key`= ?  and c.`key`=? limit 1;";
            record = Db.findFirst(hsql,dailyKey,userKey);
        }
        return record;
    }

}
