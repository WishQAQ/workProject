## 区域数据展示平台
- 前置
   1. 阅读doc目录文档
   2. 项目依赖electron
      1. windows 安装
         1. 下载
           - 下载 64位 https://github.com/electron/electron/releases/download/v1.6.6/electron-v1.6.6-win32-x64.zip
           - 下载 32位 https://github.com/electron/electron/releases/download/v1.6.6/electron-v1.6.6-win32-ia32.zip
           - 备用地址 64位 https://pan.baidu.com/s/1boLW3MJ
           - 备用地址 32位 https://pan.baidu.com/s/1hrGw97Y
         2. 安装
           - 将下载的zip解压放在 D:\electron\ 也可以自定义位置
           - 参照 https://www.java.com/zh_CN/download/help/path.xml 设置环境变量
           - 打开cmd执行 `electron -v` 命令
           - 显示**v1.6.6**表示安装成功
         3. 或者使用 `choco install electron`
      2. linux 安装
           1. ubuntu `apt install electron`
           2. centos `yum install electron`
      3. mac 安装 `brew install electron`


- 项目需要用到的技术
     - nodejs
     - express
     - websocket
     - webpack
     - react
     - babel
     - react-router
     - material-oak
     - fetch
     - localStorage/sessionStorage

- 使用  
  - 安装依赖 `npm install`

- 运行
   - 使用 `npm start`

- debug.json
   - 在项目根目录建debug.json为个人配置
   - server_host : 后台服务器地址