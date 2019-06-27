/**
 * Created by jahv on 2016/12/6.
 */
import webpack from "webpack";
import path from "path";
import fs from "fs";
import config from "../server/config";
import HtmlWebpackPlugin from "html-webpack-plugin";
import CaseSensitivePathsPlugin from "case-sensitive-paths-webpack-plugin";

const CopyWebpackPlugin = require('copy-webpack-plugin');

const entry = {
    main: [
        'react-hot-loader/patch',
        `webpack-dev-server/client?http://${config.devPublic}`,
        'webpack/hot/only-dev-server',
        './src/index'
    ]
};
let pugTemplatesPath = "./server/templates/index.pug";
if (!fs.existsSync(pugTemplatesPath)) {
    pugTemplatesPath = `.${pugTemplatesPath}`;
}

export default {
    entry,
    devtool: 'inline-source-map',
    output: {
        path: __dirname,
        filename: '[name].js',
        publicPath: "/",
    },
    module: {
        loaders: [{
            test: /\.jsx$/,
            include: [
                path.resolve(__dirname, "../src")
            ],
            use: [
                'babel-loader',
            ],
        }, {
            test: /\.s[ac]ss$/,
            loader: `style-loader!css-loader?modules&importLoaders=1&localIdentName=[name]_[local]!sass-loader`
        }, {
            test: /\.css$/,
            loader: `style-loader!css-loader`
        }, {
            test: /\.less$/,
            loader: `style-loader!css-loader!less-loader`
        }]
    },
    resolve: {
        extensions: ['.jsx', '.js'],
    },
    plugins: [
        new webpack.DefinePlugin({
            DEBUG: config.dev || false,
        }),
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require("../dist/ddl/manifest.json"),
            sourceType: "commonsjs2",
        }),
        new webpack.NoEmitOnErrorsPlugin(),
        new HtmlWebpackPlugin({
            inject: true,
            template: '!!pug-loader!' + pugTemplatesPath,
            title: true
        }),
        new CaseSensitivePathsPlugin({debug: config.dev || false}),
        new CopyWebpackPlugin([
            {from: 'dist/ddl/bundle.css', to: 'public'},
            {from: 'dist/ddl/bundle.js', to: 'public'},
            {from: 'src/public', to: 'public'},
            {from: 'debug.json', to: 'public'},
        ])
    ]
};
