# 急诊-公共接口(redis缓存)数据对接文档[包国强]



- 数据结构

- 路由

    | URL                                      | 参数                                      | 返回值        | 注释           |
    | ---------------------------------------- | --------------------------------------- | ---------- | ------------ |    
    | POST:/redis/redis/tempSave     |String key(redis缓存key值(注: 暂存的唯一标识)), String valu(redis缓存value值(注: 暂存的json对象)))|| 暂存redis |
    | POST:/redis/redis/loadTempSave   |String key(redis缓存key值序列(注: 暂存的特定值))| | 获取暂存key列表 |
    | POST:/redis/redis/loadTempSaveByKey | String key(redis缓存key值(注: 暂存的唯一标识))| | 获取暂存信息 |
    | POST:/redis/redis/delTempSave | String key(redis缓存key值(注: 暂存的唯一标识)) | | 删除暂存redis |