import * as webpack from 'webpack'
import * as path from 'path'
import * as HtmlWebpackPlugin from 'html-webpack-plugin'
import {TsConfigPathsPlugin} from 'awesome-typescript-loader'
import * as CaseSensitivePathsPlugin from 'case-sensitive-paths-webpack-plugin'
import * as HardSourceWebpackPlugin from 'hard-source-webpack-plugin'
import * as fs from 'fs'
import * as SimpleProgressPlugin from './test/progress-webpack-plugin'
import * as CopyWebpackPlugin from 'copy-webpack-plugin'
import * as UglifyJsPlugin from 'uglifyjs-webpack-plugin'
import CssoWebpackPlugin from 'csso-webpack-plugin'

const config = require('./config.json')

let moduleName = process.argv[process.argv.indexOf('--env.module') + 1]

if (!moduleName) {
    throw '需要指定测试模块'
}
const testDir = path.resolve(__dirname, 'src/test')

function findModule(route): string {
    if (fs.existsSync(route)) {
        if (fs.statSync(route).isDirectory()) {
            const dir = fs.readdirSync(route)
            for (let i = 0; i < dir.length; i++) {
                const d = dir[i]
                const main = findModule(path.resolve(route, d))
                if (main) return main
            }
        } else if (route.indexOf(moduleName + '.test.ts') >= 0) {
            return route
        }
    }
    return null
}

const main = findModule(testDir)
if (!main) throw '没有找到测试类:' + moduleName

let productionLoader = [[]]

if (process.env.NODE_ENV === 'production') {
    productionLoader[0] = [{
        loader: 'babel-loader',
        options: {
            presets: [['env', {
                'targets': {
                    'browsers': ['last 2 versions', 'safari >= 7']
                }
            }]],
        }
    }]
}

export default <webpack.Configuration>{
    entry: {
        main: [
            'src/style/style.scss',
            'normalize.css',
            'antd/dist/antd.less',
            'medical-draft/dist/medical.css',
            main
        ],
    },
    output: {
        path: path.resolve(__dirname, 'dist/test'),
        filename: '[name].js'
    },
    target: process.argv.indexOf('--env.web') > 0 ? 'web' : 'electron-renderer',
    devtool: process.env.NODE_ENV === 'production' ? 'nosources-source-map' : 'source-map',
    resolve: {
        extensions: ['.js', '.ts', '.tsx'],
        plugins: [
            new TsConfigPathsPlugin(),
        ]
    },
    module: {
        rules: [{
            test: /\.tsx?$/,
            use: ['bundle-loader?lazy', ...productionLoader[0], 'awesome-typescript-loader'],
            include: path.resolve(__dirname, 'src/view')
        }, {
            test: /\.tsx?$/,
            use: [...productionLoader[0], 'awesome-typescript-loader'],
            include: path.resolve(__dirname, 'src'),
            exclude: path.resolve(__dirname, 'src/view')
        }, {
            test: /\.s[ac]ss$/,
            use: ['style-loader', 'css-loader?modules&localIdentName=[name][hash:5][local]', 'sass-loader'],
            include: path.resolve(__dirname, 'src'),
            exclude: [
                path.resolve(__dirname, 'src/index.scss'),
                path.resolve(__dirname, 'src/style')
            ]
        }, {
            test: /\.s[ac]ss$/,
            use: ['style-loader', 'css-loader', 'sass-loader'],
            include: [
                path.resolve(__dirname, 'src/index.scss'),
                path.resolve(__dirname, 'src/style')
            ]
        }, {
            test: /\.less$/,
            use: ['style-loader', 'css-loader', {
                loader: 'less-loader',
                options: {
                    modifyVars: require('./theme').default
                }
            }],
        }, {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
        }, {
            test: /\.svg$/,
            loader: 'svg-inline-loader?classPrefix=__prefix-[sha512:hash:hex:5]__',
            include: path.resolve(__dirname, 'src')
        }, {
            test: /\.(png|jpe?g|gif|ttf|eot|woff|woff2|ejs)$/,
            loader: 'file-loader',
            options: {
                name: '[name].[hash].[ext]'
            }
        }]
    },
    plugins: [
        new CopyWebpackPlugin([{
            context: './src/style/fonts',
            from: 'ant-font.*',
        }]),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
            }
        }),
        new HardSourceWebpackPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            title: '橡树急诊医护一体平台',
            chunks: ['main'],
            template: 'src/index.html',
            favicon: 'src/favicon.ico'
        }),
        new CaseSensitivePathsPlugin(),
        new SimpleProgressPlugin(),
    ].concat(process.env.NODE_ENV === 'production' ? [
        // new UglifyJsPlugin({sourceMap: true, uglifyOptions: {ie8: false, ecma: 8}, parallel: 4}),
        // new CssoWebpackPlugin(),
    ] : [
        new webpack.HotModuleReplacementPlugin(),
    ]),
    devServer: {
        host: config.dev.test.host,
        port: config.dev.test.port,
        disableHostCheck: true,
    }
}
