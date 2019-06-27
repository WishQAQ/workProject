package com.wit.base.rest.ccpm.utils.fee;

import com.thoughtworks.xstream.XStream;
import com.thoughtworks.xstream.io.xml.DomDriver;

public class XMLUtil {

    /**
     * @desc 将JAVA对象转XML字符串
     * @author JimLy
     * @date 20160423
     * */
    public static String toXml(Object obj) {
        XStream xs = new XStream(new DomDriver());
        xs.processAnnotations(obj.getClass());

        return xs.toXML(obj);
    }

    /**
     * @desc 将XML字符串转JAVA对象
     * @author JimLy
     * @date 20160423
     * */
    @SuppressWarnings("unchecked")
    public static <T> T fromXml(String xmlStr, Class<T> cls) {
        XStream xs = new XStream(new DomDriver());
        xs.processAnnotations(cls);
        T obj = (T) xs.fromXML(xmlStr);

        return obj;
    }

}