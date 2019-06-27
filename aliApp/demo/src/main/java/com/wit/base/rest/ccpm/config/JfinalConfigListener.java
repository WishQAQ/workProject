package com.wit.base.rest.ccpm.config;

import com.jfinal.captcha.CaptchaManager;
import com.jfinal.config.Constants;
import com.jfinal.config.Interceptors;
import com.jfinal.config.Routes;
import com.jfinal.ext.handler.ContextPathHandler;
import com.jfinal.kit.PropKit;
import com.jfinal.plugin.activerecord.ActiveRecordPlugin;
import com.jfinal.plugin.cron4j.Cron4jPlugin;
import com.jfinal.plugin.redis.RedisPlugin;
import com.jfinal.template.Engine;
import io.jboot.Jboot;
import io.jboot.aop.jfinal.JfinalHandlers;
import io.jboot.aop.jfinal.JfinalPlugins;
import io.jboot.core.listener.JbootAppListenerBase;

import java.util.Map;

/**
 * jfinal config
 * @author Rlax
 *
 */
public class JfinalConfigListener extends JbootAppListenerBase {
    @Override
    public void onConstantConfig(Constants constants) {
        constants.setError401View("/template/401.html");
        constants.setError403View("/template/403.html");
        constants.setError404View("/template/404.html");
        constants.setError500View("/template/500.html");
    }

    @Override
    public void onRouteConfig(Routes routes) {
        routes.setBaseViewPath("/template");
    }

    @Override
    public void onEngineConfig(Engine engine) {
        engine.setDevMode(true);
    }

    @Override
    public void onInterceptorConfig(Interceptors interceptors) {
//        interceptors.add(new LogInterceptor());
//        interceptors.add(new AuthInterceptor());
//        interceptors.add(new NotNullParaInterceptor("/template/exception.html"));
//        interceptors.add(new BusinessExceptionInterceptor("/template/exception.html"));
    }

    @Override
    public void onPluginConfig(JfinalPlugins plugins) {
        RedisPlugin redis=new RedisPlugin("study", "127.0.0.1");
        plugins.add(redis);

        //  任务器
        Cron4jPlugin cp = new Cron4jPlugin(PropKit.use("task.properties"), "cron4j");
        plugins.add(cp);

        //ES索引
//        Map<String, ElasticSearchConfig> configMap = ElasticSearchConfigManager.me().getElasticSearchConfig();
//        for (Map.Entry<String, ElasticSearchConfig> entry : configMap.entrySet()) {
//            String configName = entry.getKey();
//            ElasticSearchPlugin elasticSearchPlugin = new ElasticSearchPlugin(entry.getValue());
//            ActiveRecordPlugin activeRecordPlugin = new ActiveRecordPlugin(configName, elasticSearchPlugin);
//            activeRecordPlugin.setShowSql(true);
//            plugins.add(elasticSearchPlugin);
//            plugins.add(activeRecordPlugin);
//        }
    }

    @Override
    public void onHandlerConfig(JfinalHandlers handlers) {
        handlers.add(new ContextPathHandler("ctxPath"));
    }

    @Override
    public void onStop() {
    }

    @Override
    public void onStart() {
        /** 集群模式下验证码使用 redis 缓存 */
//        CaptchaManager.me().setCaptchaCache(new CaptchaCache());
    }

    @Override
    public void onStartBefore() {

    }
}
