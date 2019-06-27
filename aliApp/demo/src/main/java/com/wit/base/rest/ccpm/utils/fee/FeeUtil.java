package com.wit.base.rest.ccpm.utils.fee;

import cn.hutool.core.util.StrUtil;
import com.jfinal.kit.PropKit;
import com.wit.base.rest.ccpm.utils.ObjectUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.security.MessageDigest;
import java.util.*;

public class FeeUtil {
    private static Logger log = LoggerFactory.getLogger(FeeUtil.class);
    private final static String[] hexDigits = { "0", "1", "2", "3", "4", "5",
            "6", "7", "8", "9", "a", "b", "c", "d", "e", "f" };

    public static boolean checkSign(String xmlString) {
        Map<String, Object> map = null;
        map = XMLUtil.fromXml(xmlString, HashMap.class);
        String signFromAPIResponse = map.get("sign").toString();
        if (StrUtil.isEmptyOrUndefined(signFromAPIResponse)) {
            log.error("API返回的数据签名数据不存在，有可能被第三方篡改!!!");
            return false;
        }
        System.out.println("服务器回包里面的签名是:" + signFromAPIResponse);
        //清掉返回数据对象里面的Sign数据（不能把这个数据也加进去进行签名），然后用签名算法进行签名
        map.put("sign", "");
        //将API返回的数据根据用签名算法进行计算新的签名，用来跟API返回的签名进行比较
        String signForAPIResponse = getSign(map);
        if (!signForAPIResponse.equals(signFromAPIResponse)) {
            //签名验不过，表示这个API返回的数据有可能已经被篡改了
            log.error("API返回的数据签名验证不通过，有可能被第三方篡改!!! signForAPIResponse生成的签名为" + signForAPIResponse);
            return false;
        }
        System.out.println("恭喜，API返回的数据签名验证通过!!!");
        return true;
    }

    private static String getSign(Map<String, Object> map) {
        SortedMap<String, Object> signParams = new TreeMap<String, Object>();
        for (Map.Entry<String, Object> stringStringEntry : map.entrySet()) {
            signParams.put(stringStringEntry.getKey(), stringStringEntry.getValue());
        }
        signParams.remove("sign");
        String sign = createSign(signParams);
        return sign;
    }


    /**
     * 微信支付签名算法sign
     * @param parameters
     * @return
     */
    private static String createSign(SortedMap<String,Object> parameters){
        StringBuffer sb = new StringBuffer();
        Set es = parameters.entrySet();//所有参与传参的参数按照accsii排序（升序）
        Iterator it = es.iterator();
        while(it.hasNext()) {
            Map.Entry entry = (Map.Entry)it.next();
            String k = (String)entry.getKey();
            Object v = entry.getValue();
            if(null != v && !"".equals(v)
                    && !"sign".equals(k) && !"key".equals(k)) {
                sb.append(k + "=" + v + "&");
            }
        }
        sb.append("key=" + PropKit.use("common.properties").get("weChatKey"));
                System.out.println("签名字符串:"+sb.toString());
        String sign = md5Password(sb.toString()).toUpperCase();
        return sign;
    }
    /**
     * 生成32位md5码
     *
     * @param key
     * @return
     */
    private static String md5Password(String key) {
        char hexDigits[] = {
                '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'
        };
        try {
            byte[] btInput = key.getBytes();
            // 获得MD5摘要算法的 MessageDigest 对象
            MessageDigest mdInst = MessageDigest.getInstance("MD5");
            // 使用指定的字节更新摘要
            mdInst.update(btInput);
            // 获得密文
            byte[] md = mdInst.digest();
            // 把密文转换成十六进制的字符串形式
            int j = md.length;
            char str[] = new char[j * 2];
            int k = 0;
            for (int i = 0; i < j; i++) {
                byte byte0 = md[i];
                str[k++] = hexDigits[byte0 >>> 4 & 0xf];
                str[k++] = hexDigits[byte0 & 0xf];
            }
            return new String(str);
        } catch (Exception e) {
            return null;
        }
    }

}
