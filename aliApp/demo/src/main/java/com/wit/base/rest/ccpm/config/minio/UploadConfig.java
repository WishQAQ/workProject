package com.wit.base.rest.ccpm.config.minio;

import io.jboot.app.config.annotation.ConfigModel;

@ConfigModel(prefix="jboot.minio",file="upload.properties")
public class UploadConfig {
    public String getEndpoint() {
        return endpoint;
    }

    public void setEndpoint(String endpoint) {
        this.endpoint = endpoint;
    }

    private String endpoint;

    public String getAccessKey() {
        return accessKey;
    }

    public void setAccessKey(String accessKey) {
        this.accessKey = accessKey;
    }

    private String accessKey;

    public String getSecretKey() {
        return secretKey;
    }

    public void setSecretKey(String secretKey) {
        this.secretKey = secretKey;
    }

    private String secretKey;
}
