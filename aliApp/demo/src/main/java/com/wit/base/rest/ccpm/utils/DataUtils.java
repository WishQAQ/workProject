package com.wit.base.rest.ccpm.utils;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.jfinal.plugin.activerecord.Record;

import java.sql.Date;
import java.sql.Time;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class DataUtils {

    public static DataEntity formatData(HashMap<String, DataEntity> result) {
        DataEntity finalResults = new DataEntity();
        Object jsonData = null;
        long total = -1;
        for (Map.Entry<String, DataEntity> entry : result.entrySet()) {
            //单个值的情况
            Object datas = entry.getValue().getData();
            String key = entry.getKey();
            if (key.equals("#")) {
                if (datas instanceof Record) {
                    Record record = (Record) datas;
                    jsonData = getJSONObject(record);
                } else if (datas instanceof List) {
                    jsonData = getJSONArray((List) datas);
                    total = entry.getValue().getTotal();
                }
            } else {
                if (jsonData == null) {
                    jsonData = new JSONObject();
                }

                if (datas instanceof Record) {
                    Record record = (Record) datas;
                    ((JSONObject) jsonData).put(key, getJSONObject(record));
                } else if (datas instanceof List) {
                    JSONArray jsonArray = getJSONArray((List) datas);
                    ((JSONObject) jsonData).put(key, jsonArray);
                    total = entry.getValue().getTotal();
                }
            }
        }
        finalResults.setData(jsonData);
        finalResults.setTotal(total);

        return finalResults;
    }

    private static JSONObject getJSONObject(Record record) {
        JSONObject jsonObject = new JSONObject();
        Map<String, Object> columns = record.getColumns();
        for (Map.Entry<String, Object> entry : columns.entrySet()) {
            //处理日期的格式化问题
            Object val = entry.getValue();
            if (val instanceof Date) {
                val = new SimpleDateFormat("yyyy-MM-dd").format(val);
            } else if (val instanceof Timestamp) {
                val = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(val);
            } else if (val instanceof Time) {
                val = new SimpleDateFormat("HH:mm:ss").format(val);
            }

            jsonObject.put(entry.getKey(), val);
        }
        return jsonObject;
    }

    private static JSONArray getJSONArray(List<Record> records) {
        JSONArray jsonArray = new JSONArray();
        for (Record record : records) {
            jsonArray.add(getJSONObject(record));
        }
        return jsonArray;
    }
}
