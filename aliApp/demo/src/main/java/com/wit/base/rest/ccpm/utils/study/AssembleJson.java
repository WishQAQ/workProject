package com.wit.base.rest.ccpm.utils.study;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.jfinal.plugin.activerecord.Record;

import java.util.ArrayList;
import java.util.List;

public class AssembleJson {
    public static List<JSONObject> json(List<Record> records){
        List<JSONObject> list = new ArrayList<>();
        /**
         * Record集合
         */
        for(int i=0;i<records.size();i++){
            JSONObject jsonObject = new JSONObject();
            jsonObject.put("create_time", records.get(i).getStr("create_time"));
            jsonObject.put("name",records.get(i).getStr("name"));
            jsonObject.put("user_key",records.get(i).getStr("user_key"));
            jsonObject.put("type",records.get(i).getStr("type"));
            jsonObject.put("prompt",records.get(i).getStr("prompt"));
            jsonObject.put("key",records.get(i).getStr("key"));
            jsonObject.put("cat_name",records.get(i).getStr("cat_name"));
            jsonObject.put("answers",records.get(i).getStr("answers"));
            jsonObject.put("average",records.get(i).getStr("average"));
            jsonObject.put("user_name",records.get(i).getStr("user_name"));
            jsonObject.put("user_head",records.get(i).getStr("user_head"));
            jsonObject.put("content", JSON.parseArray(records.get(i).get("content")));
            if(!jsonObject.containsKey("star")){
                jsonObject.put("star",records.get(i).getStr("star"));
            }
            if(!jsonObject.containsKey("user_answer")){
                jsonObject.put("user_answer",records.get(i).getStr("user_answer"));
            }
            if(!jsonObject.containsKey("is_correct")){
                jsonObject.put("is_correct",records.get(i).getStr("is_correct"));
            }
            if(!jsonObject.containsKey("user_choose")){
                jsonObject.put("user_choose",records.get(i).getStr("user_choose"));
            }
            if(!jsonObject.containsKey("score")){
                jsonObject.put("score",records.get(i).getStr("score"));
            }
            list.add(jsonObject);
        }
        return list;
    }

    /**
     * Record对象
     * @param records
     * @return
     */
    public static JSONObject json(Record records){
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("create_time", records.getStr("create_time"));
        jsonObject.put("name",records.getStr("name"));
        jsonObject.put("user_key",records.getStr("user_key"));
        jsonObject.put("type",records.getStr("type"));
        jsonObject.put("prompt",records.getStr("prompt"));
        jsonObject.put("key",records.getStr("key"));
        jsonObject.put("cat_name",records.getStr("cat_name"));
        jsonObject.put("answers",records.getStr("answers"));
        jsonObject.put("average",records.getStr("average"));
        jsonObject.put("user_name",records.getStr("user_name"));
        jsonObject.put("user_head",records.getStr("user_head"));
        jsonObject.put("content", JSON.parseArray(records.get("content")));
        if(!jsonObject.containsKey("star")){
            jsonObject.put("star",records.getStr("star"));
        }
        if(!jsonObject.containsKey("user_answer")){
            jsonObject.put("user_answer",records.getStr("user_answer"));
        }
        if(!jsonObject.containsKey("is_correct")){
            jsonObject.put("is_correct",records.getStr("is_correct"));
        }
        if(!jsonObject.containsKey("user_choose")){
            jsonObject.put("user_choose",records.getStr("user_choose"));
        }
        if(!jsonObject.containsKey("score")){
            jsonObject.put("score",records.getStr("score"));
        }
        return jsonObject;
    }


}
