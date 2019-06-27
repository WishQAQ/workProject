/**
 * Created by jahv on 2017/6/26.
 */
import path from 'path'
import http from 'http'
import config from "../config";

let Server;

if (config.dev === true) {
  let express = require("express");
  let proxy = require('./proxy');
  let pug = require("pug");
  let server = express();
  if (config.mapping) {
    for (let i = 0; i < config.mapping.length; i += 2) {
      let url = config.mapping[i];
      if (url) {
        console.log(`mapping: ${'/api' + url} --> ${`http://${config.mapping[i + 1]}/`}`);
        server.use('/api' + url, proxy(`http://${config.mapping[i + 1]}/`));
      }
    }
  }
  // server.use('/api', proxy(`http://${config.server}/`));
  // server.use('/assets', proxy(`http://127.0.0.1:${config.devPort}/`));
  // server.use('/public', express.static(path.join(__dirname, "../../src/public")));
  // server.use('/public', express.static(path.join(__dirname, "../../dist/ddl")));
  // server.use('/res', express.static(path.join(__dirname, "../../src/public")));
  // server.use("/bundle", express.static(path.join(__dirname, "../../dist/ddl")));
  server.get("*", (req, res) => {
    // if(req.url.startsWith("/public")){
    //   http.get(`http://127.0.0.1:${config.devPort}/index.html`, r => r.pipe(res));
    // }
    if(req.url.indexOf(".")<0){
      http.get(`http://127.0.0.1:${config.devPort}/index.html`, r => r.pipe(res));
    }else{
      http.get(`http://127.0.0.1:${config.devPort}${req.url}`, r => r.pipe(res));
    }
  });
  Server = http.Server(server);
} else {
  let fs = require('fs');
  let proxy = require('./proxy');
  let api = proxy(`http://${config.server}/`);
  let mappingApi = [];
  let mappingPath = [];
  if (config.mapping) {
    for (let i = 0; i < config.mapping.length; i += 2) {
      let url = config.mapping[i];
      if (url) {
        mappingPath.push('/api' + url);
        mappingApi.push(proxy(`http://${config.mapping[i + 1]}`));
      }
    }
  }
  let types = {
    "css": "text/css",
    "html": "text/html",
    "jpg": "image/jpeg",
    "js": "text/javascript",
    "json": "application/json",
    "png": "image/png",
    "txt": "text/plain",
    "woff": "application/font-woff",
  }
  Server = http.createServer(function (req, res) {
    res.setHeader("Cache-Control", "max-age=31536000")
    let url = req.url;
    let q_i = url.indexOf("?");
    if (q_i < 0) q_i = url.length;
    let type = url.substring(url.lastIndexOf(".", q_i) + 1, q_i);
    if ((type = types[type])) {
      res.setHeader("Content-Type", type || types['html'])
    }
    if (url.startsWith("/api")) {
      for (let i = 0; i < mappingPath.length; i++) {
        const uri = mappingPath[i];
        if (url.startsWith(uri)) {
          req.url = url.substr(uri.length)
          mappingApi[i](req, res, function () {
            res.end(JSON.stringify({success: false, msg: "无法连接到第三方服务器，请联系管理员！给您带来的不便深表歉意！"}))
          })
          return;
        }
      }
      res.removeHeader("Cache-Control")
      req.url = url.substr(4);
      api(req, res, function () {
        res.end(JSON.stringify({success: false, msg: "无法连接到服务器，请联系管理员！给您带来的不便深表歉意！"}))
      })
    } else if (url.startsWith("/assets")) {
      fs.createReadStream(path.join(__dirname, `..${url.split('?')[0]}`)).pipe(res);
    } else if (url.startsWith("/public")) {
      fs.createReadStream(path.join(__dirname, `..${url.split('?')[0]}`)).pipe(res);
    } else if (url.startsWith("/res")) {
      fs.createReadStream(path.join(__dirname, `..${url.replace('/res/', '/public/').split('?')[0]}`)).pipe(res);
    } else if (url.startsWith("/bundle")) {
      fs.createReadStream(path.join(__dirname, `..${url.replace('/bundle/', '/public/').split('?')[0]}`)).pipe(res);
    } else {
      fs.createReadStream(path.join(__dirname, '../assets/index.html')).pipe(res);
    }
  });
}

console.log(`Server running on port http://${config.host}:${config.port}/`);

export {Server};