/**
 * Created by jahv on 2017/1/3.
 */
import webpack from "webpack";
import webpackConfig from "../webpack.config";
import pug from "pug";
import fs from "fs";
import path from "path";
import {argv} from "optimist";
import copy from 'copy'

async function build() {
    let config = webpackConfig;
    config.entry.main = ['fetch-polyfill2', './src/index'];
    config.output.path = path.join(__dirname, '../dist/public/assets');
    config.plugins = [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
                global_defs: {
                    DEBUG: false
                },
                evaluate: true,
                loops: true,
                cascade: true,
                properties: true,
                sequences: true,
                dead_code: true,
                conditionals: true,
                booleans: true,
                unused: true,
                if_return: true,
                join_vars: true,
                drop_console: true
            },
            output: {
                comments: false
            }
        })
    ].concat(config.plugins);
    console.log("build project to dist");
    await webpack(config).run((err, stats) => {
        if (err)return err;
        console.log(stats.toString({
            colors: true,
            reasons: false,
            hash: false,
            version: false,
            timings: true,
            chunks: false,
            chunkModules: false,
            cached: false,
            cachedAssets: false
        }));
    });
    await buildIndex();
}

async function buildIndex() {
    console.log("copy file");
    await copy(path.join(__dirname, "../src/public/**"), path.join(__dirname, "../dist/public/"), err => {});
    await copy(path.join(__dirname, "electron-default/*"), path.join(__dirname, "../dist"), err => {
        console.log("build html to dist");
        if (!fs.existsSync(path.join(__dirname, '../dist'))) fs.mkdirSync(path.join(__dirname, '../dist'));
        if (!fs.existsSync(path.join(__dirname, '../dist/public'))) fs.mkdirSync(path.join(__dirname, '../dist/public'));
        let html = pug.renderFile(path.join(__dirname, '../server/templates/index.pug'));
        fs.writeFileSync(path.join(__dirname, "../dist/public/index.html"), html);
    });
}

export default build();