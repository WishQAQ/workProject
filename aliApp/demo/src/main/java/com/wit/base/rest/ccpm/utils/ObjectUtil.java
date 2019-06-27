package com.wit.base.rest.ccpm.utils;

import com.jfinal.plugin.activerecord.Record;

import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.lang.reflect.Type;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 * 工具栏
 */
public class ObjectUtil {

    /**
     * record转换为map,只存在一个value值
     *
     * @param records   结果集
     * @param keyName   key名字
     * @param valueName 值名字
     * @return
     */
    public static Map<String, Object> recordToMapAloneValue(List<Record> records, String keyName, String valueName) {
        Map<String, Object> map = new HashMap<>();
        if(records == null || records.isEmpty()){
            return map;
        }
        for (Record record : records) {
            String key = record.getStr(keyName);
            if (stringIsEmpty(record.getStr(keyName))) {
                continue;
            }
            map.put(record.getStr(keyName), record.get(valueName) == null ? "" : record.get(valueName));
        }
        return map;
    }


    /**
     * record转为map，将key以外的值存为map，装入以keyName为主键的map
     * @param records
     * @param keyName
     * @return
     */
    public static Map<String, Object> recordToMapMultipleValue(List<Record> records, String keyName) {
        Map<String, Object> map = new HashMap<>();
        if(records == null || records.isEmpty()){
            return map;
        }
        for (Record record : records) {
            String key = record.getStr(keyName);
            if (stringIsEmpty(record.getStr(keyName))) {
                continue;
            }
            Map<String, Object> childrenMap = new HashMap<>();
            Map<String, Object> columns = record.getColumns();
            for (String tempKey:columns.keySet()) {
                if(key.equals(tempKey)){
                    continue;
                }
                childrenMap.put(tempKey,record.get(tempKey));
            }
            map.put(record.getStr(keyName), childrenMap);
        }
        return map;
    }

    /**
     * 判断字符串是否为空
     *
     * @param str
     * @return
     */
    public static boolean stringIsEmpty(String str) {
        return str == null || str.trim().length()<1 || "null".equals(str.trim().toLowerCase());
    }

    /**
     * 判断字符串是否为空或undefined
     * @param str
     * @return
     */
    public static boolean stringIsEmptyOrUndefined(String str) {
        return stringIsEmpty(str) || "undefined".equals(str.trim().toLowerCase());
    }


    /**
     * 计算两个时间间隔的年和不足年的天
     *
     * @param stratTimeStr 开始时间
     * @param endTimeStr   结束时间
     * @return map 值为{"year":"相差的年数","day":"不足年的天数"}
     * @throws ParseException
     */
    public static Map<String, Integer> calculationYearAndSurplusDay(String stratTimeStr, String endTimeStr) throws ParseException {
        int intervalYear;//间隔的年
        int intervalDay = 0;//间隔的不足年的天数
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        //现在时间
        Calendar nowTime = Calendar.getInstance();
        nowTime.setTime(sdf.parse(endTimeStr));
        //入党时间
        Calendar joinOrgTime = Calendar.getInstance();
        joinOrgTime.setTime(sdf.parse(stratTimeStr));
        int nowYear = nowTime.get(Calendar.YEAR);
        int joinYear = joinOrgTime.get(Calendar.YEAR);
        int nowDay = nowTime.get(Calendar.DAY_OF_YEAR);
        int joinDay = joinOrgTime.get(Calendar.DAY_OF_YEAR);
        //如果现在时间月份大于入党时间月份，年份直接减去入党时间月份，如果小于，则减一，补足不足一年的时间
        intervalYear = nowDay >= joinDay ? nowYear - joinYear : nowYear - joinYear - 1;
        //计算不足年的天数
        if (nowDay != joinDay) {
            intervalDay = 365 - joinDay;
            int lastYear = nowYear - 1;
            if (lastYear % 4 == 0 && lastYear % 100 != 0 || lastYear % 400 == 0) {
                intervalDay = 366 - joinDay;
            }
            intervalDay += nowDay;//加上当前年份已过天数
        }
        Map<String, Integer> map = new HashMap<>();
        map.put("year", intervalYear);
        map.put("day", intervalDay);
        return map;
    }

    /**
     * record转list
     *
     * @param recordList
     * @return
     */
    public static List<Map<String, Object>> recordToList(List<Record> recordList) {
        List<Map<String, Object>> list = new ArrayList<>();
        if(recordList == null || recordList.isEmpty()){
            return list;
        }
        for (Record record : recordList) {
            Map<String, Object> columns = record.getColumns();
            Map<String, Object> data = new HashMap<>();
            for (String key : columns.keySet()) {
                data.put(key, record.get(key));
            }
            list.add(data);
        }
        return list;
    }

    /**
     * record转map
     *
     * @param record
     * @return
     */
    public static Map<String, Object> recordToMap(Record record) {
        Map<String, Object> data = new HashMap<>();
        if(record == null){
            return data;
        }
        Map<String, Object> columns = record.getColumns();
        for (String key : columns.keySet()) {
            data.put(key, record.get(key));
        }
        return data;
    }

    /**
     * 生成uuid，没有-
     * @return
     */
    public static String getUUID(){
        return UUID.randomUUID().toString().replaceAll("-","");
    }

    /**
     * 得到当前时间的字符串
     * @param format 时间格式
     * @return
     */
    public static String getNowTimeStr(String format){
        Date date = new Date();
        SimpleDateFormat sdf = new SimpleDateFormat(format);
        String orderNumber = sdf.format(date);
        return orderNumber;
    }

    /**
     * 获取当前年
     * @return
     */
    public static int getNowYear(){
        Calendar nowCalendar = Calendar.getInstance();
        return nowCalendar.get(Calendar.YEAR);
    }

    /**
     * 获取当前月
     * @return
     */
    public static int getNowMonth(){
        Calendar nowCalendar = Calendar.getInstance();
        return nowCalendar.get(Calendar.MONTH)+1;
    }

    /**
     * 获取当前天数
     * @return
     */
    public static int getNowDay(){
        Calendar nowCalendar = Calendar.getInstance();
        return nowCalendar.get(Calendar.DAY_OF_MONTH);
    }

    /**
     * 得到当前时间的字符串 年-月-日 时:分:秒
     * @return
     */
    public static String getNowTimeStr(){
        return getNowTimeStr("yyyy-MM-dd HH:mm:ss");
    }

    /**
     * 将字符串时间转为map
     * @return
     */
    public static Map<String ,Integer> timeStrToMap(String dataStr,String format) throws ParseException {
        Map<String ,Integer> map = new HashMap<>();
        SimpleDateFormat sdf = new SimpleDateFormat(format);
        Calendar calendar = Calendar.getInstance();
        calendar.setTime(sdf.parse(dataStr));
        map.put("year",calendar.get(Calendar.YEAR));
        map.put("month",calendar.get(Calendar.MONTH)+1);
        map.put("day",calendar.get(Calendar.DATE));
        return map;
    }

    /**
     * 验证对象数据是否为空,属性值不传入则验证全部,只验证能被转为String的
     * @param obj
     * @param isFilter 参数是否为过滤字段
     * @param attributeName
     * @return
     */
    public static String objAttributeIsEmpty(Object obj,boolean isFilter, String... attributeName){
        Class clazz = obj.getClass();
        String[] attrArray;
        if(attributeName == null || attributeName.length < 1 || isFilter){
            Field[] fields = clazz.getDeclaredFields();
            List<String> list = new ArrayList<>();
            for (Field field:fields) {
                list.add(field.getName());
            }
            attrArray = list.toArray(new String[0]);
        }else{
            attrArray = attributeName;
        }
        attrArrayFor:for (int i = 0; i <attrArray.length; i++) {
            if(isFilter){//过滤字段，不验证非空
                for (String str:attributeName) {
                    if(attrArray[i].equals(str)){
                        continue attrArrayFor;
                    }
                }
            }
            String methodName = "get"+(attrArray[i].charAt(0)+"").toUpperCase()+attrArray[i].substring(1);
            Object result = null;
            try {
                Method method = clazz.getMethod(methodName);
                result = method.invoke(obj);
                if(result == null){
                    return attrArray[i];//如果get方法返回值为空返回方法名
                }
            } catch (Exception e) {
                return attrArray[i];//将执行错误的属性返回
            }
            String temp = null;
            try {
                temp = result.toString();
            }catch (Exception e){
                continue;//不能被转为String,跳过
            }
            if(stringIsEmptyOrUndefined(temp)){
                return attrArray[i];//如果get方法返回值为空返回方法名
            }
        }
        return null;
    }

    /**
     * 对象转为record
     * @param obj 对象
     * @return
     */
    public static Record objectToRecord(Object obj) throws BaseException {
        Record record = new Record();
        Class clazz = obj.getClass();
        Field[] attribute = clazz.getDeclaredFields();
        for (int i = 0; i < attribute.length; i++) {
            String attributeName = attribute[i].getName();
            String methodName = "get"+(attributeName.charAt(0)+"").toUpperCase()+attributeName.substring(1);
            Method method = null;
            Object result = null;
            try {
                method = clazz.getMethod(methodName);
                result = method.invoke(obj);
                if(result != null){//将不等于null的值插入数据库
                    //将属性名存在大写的替换为_加小写
                    //如果存在驼峰命名法，就转为_后存入record，否则插入原属性名
                    StringBuilder tempStr = new StringBuilder();
                    for (int j = 0; j < attributeName.length(); j++) {
                        char tempChar = attributeName.charAt(j);
                        if(tempChar >= 65 && tempChar <= 90){
                            tempStr.append(("_"+tempChar).toLowerCase());
                        }else{
                            tempStr.append(tempChar);
                        }
                    }
                    record.set(tempStr.toString(),result);
                }
            } catch (Exception e) {
                throw new BaseException("将属性"+attributeName+"转为record值发生错误");
            }
        }
        return record;
    }

    /**
     * 复制实体类，只复制相同属性的值
     * @param oldObj 需要复制的实体
     * @param newObj 复制的新实体
     */
    public static void copyObj(Object oldObj,Object newObj) throws Exception {
        Class oldClass = oldObj.getClass();
        Class newClass = newObj.getClass();
        Field[] oldFields = oldClass.getDeclaredFields();
        Field[] newFields = newClass.getDeclaredFields();
        //获取需要复制类所以的方法
        Method[] methods = newClass.getMethods();
        //将方法封装如map方便存取
        Map<String,Class> methodMap = new HashMap<>();
        for (Method m:methods) {
            Class<?>[] type = m.getParameterTypes();
            methodMap.put(m.getName(),type.length<1?null:type[0]);//set方法只存在一个参数
        }
        //查找相同的属性
        for (Field oldField:oldFields) {
            for (Field newField:newFields) {
                Type newType = newField.getGenericType();
                Type oldType = oldField.getGenericType();
                //判断属性名、类型是否相同
                if(oldField.getName().equals(newField.getName()) &&  newType.getTypeName().equals(oldType.getTypeName())){
                    String methodName = (oldField.getName().charAt(0)+"").toUpperCase()+oldField.getName().substring(1);
                    String setMethod = "set"+methodName;
                    Method newMethod = newClass.getMethod(setMethod,methodMap.get(setMethod));
                    Method oldMethod = oldClass.getMethod("get"+methodName);
                    //将需要复制的类的值取出,转为指定类型，存入新实体类中
                    newMethod.invoke(newObj,get(methodMap.get(setMethod),oldMethod.invoke(oldObj)));
                    break;
                }
            }
        }
    }

    /**
     * 将值转为指定类型
     * @param clazz 类型class
     * @param obj 值
     * @param <T>
     * @return
     */
    private static <T>T get(Class<T> clazz ,Object obj){
        if(clazz.isInstance(obj)){
            return clazz.cast(obj);
        }
        return (T) obj;
    }


    /**
     * 将指定值提取出来作为mapkey,map的值为相同key值得list
     * @param recordList
     * @return
     */
    public static Map<String,List<Record>> recordExtractKey(List<Record> recordList,String key){
        Map<String,List<Record>> map = new HashMap<>();
        for (Record record:recordList) {
            String mapKey = record.getStr(key);
            List<Record> list = map.get(mapKey);
            if(list == null){
                list = new ArrayList<>();
                map.put(mapKey,list);
            }
            list.add(record);
        }
        return map;
    }

    /**
     * 移除组织中存在上级的下级，如500104，500103,500104101，如500104为500104101上级，移除500104101
     */
    public static String removeSubordinate(List<Record> records) {
        StringBuilder orgStr = new StringBuilder();
        for (int i = 0; i < records.size(); i++) {
            for (int j = 0; j < records.size(); j++) {
                String iStr = records.get(i).getStr("org_code");
                String jStr = records.get(j).getStr("org_code");
                //如果存在于该字符串，且不相等，iStr为上级，移除下级
                if (jStr.contains(iStr) && !iStr.equals(jStr)) {
                    records.remove(j);
                    j--;
                }
            }
        }
        for (Record record : records) {
            orgStr.append("'" + record.getStr("org_code") + "',");
        }
        return orgStr.deleteCharAt(orgStr.length() - 1).toString();
    }

    /**
     * 字符串转时间
     * @param timeStr 时间字符串
     * @param format 格式
     * @return
     * @throws ParseException
     */
    public static Date strToDate(String timeStr,String format) throws ParseException {
        SimpleDateFormat sdf = new SimpleDateFormat(format);
        return  sdf.parse(timeStr);
    }
}
