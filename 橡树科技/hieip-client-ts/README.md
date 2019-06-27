# 急诊客户端 [![pipeline status](https://git.oakhit.com/hieip/hieip-client-ts/badges/development/pipeline.svg)](https://git.oakhit.com/hieip/hieip-client-ts/commits/development) [![coverage report](http://git.oakhit.com/hieip/hieip-client-ts/badges/development/coverage.svg)](http://git.oakhit.com/hieip/hieip-client-ts/commits/development)

## 模块

- 路径：src/packages
    - package.json 单个模块配置
    - src 模块文件夹
    
## 测试

- 路径：src/test
    - 所有模块需要写单元
    - 测试模块需要.test.tsx结尾
- 运行：npm test 测试模块名，不包括后缀

## 路由 
- RouteService.tsx
- RouteState描述层级

        - home  //首页
        - home_split    //分诊页
        - home_system   //系统设置页
        
- 页面上

```jsx
{!home || <LazyLoader lazyModule={Home}/>}
{!home_split || <LazyLoader lazyModule={Split}/>}
{!home_system || <LazyLoader lazyModule={System}/>}
```

- dll 配置

    - preparation.user.text 自定义dll模块，一行一个路径