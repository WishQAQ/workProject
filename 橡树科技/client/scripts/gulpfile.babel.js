/**7/6/27.
 * Created by jahv on 201
 */
import gulp from 'gulp';
import del from 'del'
import fs from 'fs'
import webpack from "webpack";
import path from "path";
import babel from 'gulp-babel'
import rename from 'gulp-rename'
import less from 'gulp-less'
import download from 'gulp-download'
import OptimizeCssAssetsPlugin from "optimize-css-assets-webpack-plugin";
import UglifyJsPlugin from 'uglifyjs-webpack-plugin'
import {uglify_config, webpack_stats} from './common'

/**
 * 清理
 */
gulp.task('clean', ['clean:build', 'clean:ddl'], function () {
    console.log("clean dome!");
});

/**
 * 编译项目
 */
gulp.task('build', ["build:all", "build:cdn"], function () {
    console.log("build dome!");
});
/**
 * 编译项目文件
 */
gulp.task("build:all", ['build:changelog', 'build:package', 'build:dist', 'build:copy'], function (cm) {
    console.log("build build:all!");
    return cm();
})

/**
 * 清理build的结果
 */
gulp.task('clean:build', ['clean:assets', 'clean:server', 'clean:config', 'clean:html', 'clean:res'], function () {
    return del.sync(["dist/build"], {force: true});
});

/**
 * 清理assets目录
 */
gulp.task('clean:assets', function () {
    return del.sync(["dist/build/assets"], {force: true});
});

/**
 * 清理server目录
 */
gulp.task('clean:server', function () {
    return del.sync(["dist/build/component", "dist/build/sminfo.js"], {force: true});
});

/**
 * 清理config目录
 */
gulp.task('clean:config', function () {
    return del.sync(["dist/build/config.js"], {force: true});
});

/**
 * 清理html目录
 */
gulp.task('clean:html', function () {
    return del.sync(["dist/build/index.html"], {force: true});
});

/**
 * 清理res目录
 */
gulp.task('clean:res', function () {
    return del.sync(["dist/build/public"], {force: true});
});

/**
 * 清理ddl的结果
 */
gulp.task('clean:ddl', function () {
    return del.sync(["dist/ddl"], {force: true});
});

/**
 * 复制资源文件
 */
gulp.task('build:copy', ['build:ddl'], function (cb) {
    return gulp.src([
        "src/public/**/*",
        "dist/ddl/*",
        "!dist/ddl/manifest.*",
        "!src/public/icon/demo*",
    ]).pipe(gulp.dest("dist/build/public"));

});

/**
 * 编译webpack
 */
gulp.task('build:dist', ['build:ddl'], function (cb) {
    if (fs.existsSync("dist/build/assets/index.html")) return cb();
    const config = require("./webpack.config.babel");
    delete config.devtool;
    config.entry.main = ['./src/index.jsx'];
    config.output.path = path.join(__dirname, '../dist/build');
    // config.plugins.splice(0, 4);//删除开发期插件
    config.plugins[0] = new webpack.DefinePlugin({
        DEBUG: false,
        'process.env': {
            'NODE_ENV': JSON.stringify('production')
        }
    });
    config.plugins.push(new UglifyJsPlugin());
    config.plugins.push(new OptimizeCssAssetsPlugin({
        cssProcessorOptions: {discardComments: {removeAll: true}},
        canPrint: true
    }));
    config.stats = "normal";
    console.log("build project to dist...");
    webpack(config).run((err, stats) => {
        if (err) return err;
        console.log(stats.toString(webpack_stats));
        cb()
    });
});

/**
 * 编译ddl
 */
gulp.task('build:ddl', function (cb) {
    if (fs.existsSync("dist/ddl/manifest.json") && process.argv.indexOf('--cover') < 0) return cb();
    webpack(require('./webpack.dll.config.babel')).run((err, stats) => {
        if (err) return err;
        console.log(stats.toString());
        cb()
    });
});

/**
 * 升级package.json
 */
gulp.task('build:package', ['build:dist'], function () {
    const _package = require("../package.json");
    let prev = _package.version.split("."), main = prev[0] | 0, bate = prev[1] | 0, number = prev[2] | 0;
    if (process.argv.indexOf("-u") >= 0) number = (bate++ && false) | 0;
    else if (process.argv.indexOf("-U") >= 0) bate = number = (main++ && false) | 0;
    else number++;
    _package.version = [main, bate, number].join('.');
    fs.writeFileSync(path.join(__dirname, "../package.json"), JSON.stringify(_package, null, 2));
    delete _package.scripts;
    delete _package.repository;
    delete _package.devDependencies;
    delete _package.description;
    _package.main = "./index.html";
    fs.writeFileSync(path.join(__dirname, "../dist/build/package.json"), JSON.stringify(_package, null, 2));
});

/**
 * 下载cdn数据
 */
gulp.task('build:cdn', ['build:all'], function (cb) {
    // ,
    let files = [{
        fileUrl: "dist/build/public/bundle.css",
        regular: /url\(https?:\/\/([^)]+)\)/g,
        replace: "cdn/",
        startIndex: 4,
        endIndex: 1
    },
    {
        fileUrl: "dist/build/main.js",
        regular: /url\(\\\'https?:\/\/([^)]+)\\\'\)/g,
        replace: "public/cdn/",
        startIndex: 6,
        endIndex: 3
    }];
    let urls = new Set();
    files.forEach((d, index) => {
        let value = fs.readFileSync(d.fileUrl).toString();
        value = value.replace(d.regular, function (r, v) {
            urls.add(r.substring(d.startIndex, r.length - d.endIndex));
            return 'url(' + d.replace + v + ')';
        });
        fs.writeFileSync(d.fileUrl, value);
    });
    let count = 0;
    urls.forEach(t => {
        console.log(`download: ${t}`);
        download(t).pipe(rename(function (path) {
            path.basename = t.replace(/(^https?:\/\/|\.[\w#|\?]+$)/g, '');
            path.extname =path.extname.split("#")[0].replace("?","");
        })).pipe(gulp.dest("dist/build/public/cdn")).on("end", function () {
            if (++count === urls.size) {
                cb();
            }
        })
    })
});

/**
 * 编译变更日志
 */
gulp.task('build:changelog', function () {
    return new Promise(cb => require('./changelog')(cb))
});

gulp.task('build:client', ['build:client:babel', 'build:client:word', 'build:client:word:package', 'build:client:sass', 'build:client:package', 'build:client:css'], function () {
    console.log(`client build dome!`);
});

gulp.task('build:client:word', function () {
    return gulp.src([
        "src/node_modules/medical-word/**/*.jsx",
    ]).pipe(babel())
        .pipe(rename(function (file) {
            if (file.extname === '.jsx') file.extname = '.js'
        })).pipe(gulp.dest("dist/word"))
});

gulp.task('build:client:word:package', ['build:client:babel'], function (cb) {
    const json = require("src/node_modules/medical-word/package.json");
    json.version = json.version.split('.').map((t, i) => i > 1 ? (t | 0) + 1 : t).join('.');
    fs.writeFileSync("src/node_modules/medical-word/package.json", JSON.stringify(json, null, 2));
    json.publishConfig = {registry: "http://maven.cqoak.ml/repository/oak-npm/"};
    fs.writeFileSync("dist/word/package.json", JSON.stringify(json, null, 2));
    fs.writeFileSync("dist/word/.npmrc", `email=cjahv@qq.com\nalways-auth=true\n_auth=YWRtaW46YWRtaW4xMjM=`);
    cb()
});

gulp.task('build:client:babel', function () {
    return gulp.src([
        "src/routus/**/*.jsx",
        "!src/routus/index.jsx",
        "!src/routus/component/app.jsx",
        "!src/routus/component/layout/**",
    ]).pipe(babel())
        .pipe(rename(function (file) {
            if (file.extname === '.jsx') file.extname = '.js'
        })).pipe(gulp.dest("dist/client"))
});

gulp.task('build:client:sass', function () {
    return gulp.src([
        "src/routus/**/*.sass",
        "src/routus/**/*.scss",
    ]).pipe(gulp.dest("dist/client"))
});

gulp.task('build:client:package', ['build:client:babel'], function (cb) {
    const json = require("package.json");
    json.version = json.version.split('.').map((t, i) => i > 1 ? (t | 0) + 1 : t).join('.');
    fs.writeFileSync("package.json", JSON.stringify(json, null, 2));
    delete json.devDependencies;
    delete json.scripts;
    json.main = "./route/quality";
    json.publishConfig = {registry: "http://maven.oakhit.com/repository/npm-public/"};
    fs.writeFileSync("dist/client/package.json", JSON.stringify(json, null, 2));
    fs.writeFileSync("dist/client/.npmrc", `email=cjahv@qq.com\nalways-auth=true\n_auth=YWRtaW46YWRtaW4xMjM=`);
    cb()
});

gulp.task('build:client:css', function () {
    return gulp.src(["src/routus/less/index.less"]).pipe(less()).pipe(gulp.dest("dist/client"))
});