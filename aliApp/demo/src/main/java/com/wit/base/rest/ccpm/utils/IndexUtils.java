package com.wit.base.rest.ccpm.utils;

public class IndexUtils {

    public static IndexDataType getIndexDataType(String dataType) {
        IndexDataType dt = new IndexDataType();
        switch (dataType) {
            case "char":
            case "varchar":
            case "enum":
                //keyword不分词建立索引，可以用term精确检索
                dt.setDataType("keyword");
                dt.setDefaultValue("");
                break;
            case "text":
            case "tinytext":
            case "longtext":
                //keyword不分词建立索引，可以用term精确检索
                dt.setDataType("text");
                dt.setDefaultValue("");
                break;
            case "bit":
//                dt.setDataType("boolean");
//                dt.setDefaultValue(false);
                dt.setDataType("integer");
                //todo::默认为false，相当于0；因为在binlog中获取到的是0或者1，所以这里用true或者false会比较麻烦；
                dt.setDefaultValue(0);
                break;
            case "bigint":     //8 个字节
                dt.setDataType("long");
//                dt.setDefaultValue(-1);
                break;
            case "binary":
            case "varbinary":
                dt.setDataType("binary");
//                dt.setDefaultValue(0);
                break;
            case "smallint":  //2 个字节
            case "mediumint": //3 个字节
            case "int":       //4 个字节
            case "tinyint":  //1 字节
                dt.setDataType("integer");
//                dt.setDefaultValue(-1);
                break;
            case "float":    //4 个字节
                dt.setDataType("float");
//                dt.setDefaultValue(0);
                break;
            case "real":    //8 个字节
            case "double":  //8 个字节
            case "decimal":
                dt.setDataType("double");
//                dt.setDefaultValue(0.0);
                break;
            case "date":
                dt.setFormat("yyyy-MM-dd");
                dt.setDataType("date");
//                dt.setDefaultValue("1970-01-01");
                break;
            case "datetime":
                dt.setFormat("yyyy-MM-dd HH:mm:ss");
                dt.setDataType("date");
//                dt.setDefaultValue("1970-01-01 00:00:00");
                break;
            case "timestamp":
                dt.setFormat("yyyy-MM-dd HH:mm:ss");
//                dt.setDefaultValue("1970-01-01 00:00:00");
                dt.setDataType("date");
                break;
            case "time":
                dt.setFormat("HH:mm:ss");
//                dt.setDefaultValue("00:00:00");
                dt.setDataType("date");
                break;
            default:
                break;
        }

        return dt;
    }
}
