import webpack from "webpack";
import path from "path";
import fs from "fs";
import {uglify_config} from './common';
import ExtractTextPlugin from 'extract-text-webpack-plugin'
import OptimizeCssAssetsPlugin from "optimize-css-assets-webpack-plugin";
import * as babel from 'babel-core'

const ds = process.argv.indexOf('--ds') > 0 || (process.env.npm_config_argv || '').indexOf('--ds') > 0;
const _m = process.argv.indexOf("-m") >= 0;

function log(msg) {
  if (ds) console.log('[info] ' + msg);
}

function error(msg) {
  console.error('[debug] ' + msg)
}

const main = [
  '../src/index.jsx'
];

const FindBundle = function (main) {
  this.array = new Set();
  this.modules = (Array.isArray(main) ? main : [main]).map(p => path.join(__dirname, p));
  let _package = require("../package.json");
  this.dependencies = [
    ...Object.keys(_package.devDependencies),
  ];
};

FindBundle.prototype.readFile = function (file) {
  return babel.transformFileSync(file, {
    env: {
      BABEL_DISABLE_CACHE: true
    }
  }).code;
};

FindBundle.prototype.buildModules = function (module) {
  log(`file name: ${module}`);
  let text = this.readFile(module).toString(), extname;
  log(`code:\n${text}`);
  return (text.match(/(require\(["']([\w./@\-]+)["']\)|#import ["']([\w./@\-]+)["'])/g) || []).map(t => {
    let name = t.replace(/^.*["'](.+)["'].*$/, '$1').replace(/\\/g, '/'), inPath = true;
    log("module name: " + name);
    if (!name.startsWith(".")) {
      let corePath = path.join(__dirname, "../src/node_modules/", name + ".jsx");
      if (fs.existsSync(corePath)) {
        log(`fetch core: ${corePath}`)
        return this.modules.push(corePath);
      } else {
        inPath = false;
      }
    }
    if (inPath && (!(extname = path.extname(name)) || extname === ".jsx") || extname === "js") {
      let p = path.join(path.dirname(module), name);
      let jsxPath, aPath, packagePath = path.join(p, "package.json"), main;
      if (fs.existsSync(p) && fs.lstatSync(p).isDirectory() && fs.existsSync(packagePath) && (main = require(packagePath).main)) {
        jsxPath = path.join(p, main);
        if (!jsxPath.endsWith(".jsx") && !jsxPath.endsWith(".js")) jsxPath += ".js";
        if (!fs.existsSync(jsxPath)) jsxPath += "x";
        if (!fs.existsSync(jsxPath)) {
          error(`not join: ${jsxPath}`);
          throw "not find!"
        }
        log("join[0]: " + jsxPath);
      } else if (fs.existsSync((aPath = p + ".jsx"))) {
        jsxPath = aPath;
        log("join[1]: " + p);
      } else if (fs.existsSync((aPath = p + ".js"))) {
        jsxPath = aPath;
        log("join[1]: " + p);
      } else if (fs.existsSync((aPath = path.join(p, "./index.jsx")))) {
        jsxPath = aPath;
        log(`join[2]: ${p}`);
      } else if (fs.existsSync((aPath = path.join(p, "./index.js")))) {
        jsxPath = aPath;
        log(`join[2]: ${p}`);
      } else {
        error(`not join: ${p}`);
        error(`\texist file: ${packagePath}: ${fs.existsSync(packagePath)}`)
        error(`\texist file: ${p + ".jsx"}: ${fs.existsSync(p + ".jsx")}`)
        error(`\texist file: ${p + ".js"}: ${fs.existsSync(p + ".js")}`)
        error(`\texist file: ${path.join(p, "./index.jsx")}: ${fs.existsSync(path.join(p, "./index.jsx"))}`)
        error(`\texist file: ${path.join(p, "./index.js")}: ${fs.existsSync(path.join(p, "./index.js"))}`)
        throw "not find module"
      }
      if (jsxPath && this.modules.indexOf(jsxPath) < 0) {
        log("featch: " + jsxPath);
        this.modules.push(jsxPath);
      }
    } else {
      this.dependencies.forEach(t => {
        if (name.startsWith(t)) {
          log("featch module: " + name);
          this.array.add(name)
        }
      });
    }
  });
};

FindBundle.prototype.start = function () {
  let i = 0, module;
  while ((module = this.modules[i++]) !== undefined) {
    log("\nload: " + module);
    this.buildModules(module);
  }
};

FindBundle.prototype.result = function () {
  return [...this.array];
};

const bundle = new FindBundle(main);

bundle.start();

if (process.argv.indexOf('--json') < 0) {
  console.log(`build modules: ${bundle.result()}`);
} else {
  console.log = new Function();
}

if (ds) process.exit(1);

let devtool = {}
if (!_m) devtool.devtool = 'inline-source-map';

export default {
  entry: {
    bundle: bundle.result(),
  },
  ...devtool,
  output: {
    path: path.join(__dirname, "../dist/ddl"),
    filename: '[name].js',
    library: '[name]'
  },
  module: {
    noParse: [/\/ws\//],
    loaders: [{
      test: /\.less$/,
      loader: ExtractTextPlugin.extract(`css-loader!less-loader`)
    }, {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract(`css-loader`)
    }, {
      test: /\.(eot|svg|ttf|woff|woff2)$/,
      loader: `file-loader`
    }]
  },
  // externals: ['ws', 'socket.io'],
  // resolve: {
  //   alias: {
  //     moment: "moment/src/moment.js"
  //   }
  // },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: _m ? JSON.stringify("production") : JSON.stringify("development")
      }
    }),
    new webpack.DllPlugin({
      path: path.join(__dirname, "../dist/ddl/manifest.json"),
      name: "[name]"
    }),
    new ExtractTextPlugin('bundle.css'),
    new OptimizeCssAssetsPlugin({
      cssProcessorOptions: {discardComments: {removeAll: true}},
      canPrint: true
    }),
    new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /zh-cn/)
  ].concat(_m ? [
    new webpack.optimize.UglifyJsPlugin(uglify_config)
  ] : [])
};