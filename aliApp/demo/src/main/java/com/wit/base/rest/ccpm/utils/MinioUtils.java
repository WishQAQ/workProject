package com.wit.base.rest.ccpm.utils;

import com.jfinal.log.Log;
import com.wit.base.rest.ccpm.config.minio.UploadConfig;
import io.jboot.Jboot;
import io.minio.MinioClient;

import java.io.InputStream;

public class MinioUtils {
    private final static Log logger = Log.getLog(MinioUtils.class);
    private static UploadConfig config = Jboot.config(UploadConfig.class);
    private static MinioUtils instance = null;
    private static MinioClient client = null;

    /**
     * 将构造函数设置为private，不允许调用者进行实例化
     */
    private MinioUtils() {
    }

    public static MinioUtils getInstance() {
        if (instance == null) {
            // 同步锁
            synchronized (MinioClient.class) {
                if (instance == null) {
                    instance = new MinioUtils();
                }
            }
        }
        return instance;
    }

    static {
        try {
            buildClient();
        } catch (Exception e) {
            //抛出运行式异常 (这样写，实质上也应该算是处理了异常)
            throw new RuntimeException(e);
        }
    }

    private static void buildClient() {
        try {
            client = new MinioClient(config.getEndpoint(), config.getAccessKey(), config.getSecretKey());
        } catch (Exception e) {
            logger.error("连接MinioServer错误: ", e);
        }
    }

    public InputStream getObject(String bucket, String obejct) throws Exception {
        return client.getObject(bucket, obejct);
    }

    public void putObject(String bucket, String obejct, String file) throws Exception {
        client.putObject(bucket, obejct, file);
    }
}
