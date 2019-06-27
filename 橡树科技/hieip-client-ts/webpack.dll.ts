import * as webpack from 'webpack'
import * as path from 'path'
import * as fs from 'fs'
import {TsConfigPathsPlugin} from 'awesome-typescript-loader'
import * as SimpleProgressPlugin from './test/progress-webpack-plugin'
import * as ExtractTextPlugin from 'extract-text-webpack-plugin'
import * as UglifyJsPlugin from 'uglifyjs-webpack-plugin'
import CssoWebpackPlugin from 'csso-webpack-plugin'

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

module.exports = <webpack.Configuration>{
    entry: {
        manifest: [...new Set(Object.keys(require('./package.json').dependencies).filter(name => name.indexOf('@types') < 0)
            .concat(fs.existsSync('./node_modules/.dll.module.cache') ?
                fs.readFileSync('./node_modules/.dll.module.cache').toString().split(/\r?\n/) : []))].filter(t => t)
    },
    output: {
        path: path.resolve(__dirname, 'dist/dll'),
        filename: '[name].js',
        library: '[name]',
        libraryTarget: 'var'
    },
    target: 'electron-renderer',
    devtool: process.env.NODE_ENV === 'production' ? 'nosources-source-map' : 'source-map',
    resolve: {
        extensions: ['.js', '.ts', '.tsx'],
        plugins: [
            new TsConfigPathsPlugin(),
        ]
    },
    module: {
        noParse: [/\/ws\//],
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
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: ['css-loader', {
                    loader: 'less-loader',
                    options: {
                        modifyVars: require('./theme').default
                    }
                }]
            }),
        }, {
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: ['css-loader']
            })
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
    externals: ['ws'],
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
            }
        }),
        new webpack.DllPlugin({
            path: path.join(__dirname, 'dist/dll', '[name]-manifest.json'),
            name: '[name]',
        }),
        new SimpleProgressPlugin(),
        new ExtractTextPlugin('[name].css'),
    ]
}
