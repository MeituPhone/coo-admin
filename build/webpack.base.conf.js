const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const {resolve} = require('./utils');

module.exports = function webpackBaseConfig (NODE_ENV = 'development') {
    const config = require('../config/config')[NODE_ENV];

    const webpackConfig = {
        entry: {
            index: resolve('src', 'index.js')
        },
        output: {
            path: resolve('dist'),
            publicPath: config.staticPath,
            filename: config.filenameHash ? './js/[name].[hash:8].js' : './js/[name].js?[hash:8]' ,
            chunkFilename: config.filenameHash ? './js/[name].[chunkhash:8].js'  : './js/[name].js?[chunkhash:8]'
        },
        resolve: {
            alias: {
                'vue$': 'vue/dist/vue.esm.js',
            },
        },
        devtool: config.devtool,
        module: {
            rules: [
                {
                    test: /\.js$/,
                    loader: 'babel-loader',
                    exclude: /(node_modules)/,
                },
                {
                    test: /\.(png|jpg|gif|svg)$/,
                    loader: 'url-loader',
                    query: {
                        limit: 1,
                        publicPath: config.imgPath,
                        name: './images/[hash:8].[name].[ext]'
                    }
                },
                {
                    test: /\.html$/,
                    loader: 'html-loader'
                },
                {
                    test: /\.(woff|woff2|svg|eot|ttf)\??.*$/,
                    loader: 'file-loader?name=./fonts/[hash:8].[name].[ext]',
                },
                {
                    test: /\.(scss|css)$/,
                    use: ExtractTextPlugin.extract({
                        use: [
                            {
                                loader: 'css-loader',
                                options: {
                                    sourceMap: false,
                                    minimize: true,
                                }
                            },
                            'postcss-loader',
                            "sass-loader?sourceMap",
                        ],
                        fallback: "style-loader"
                    })
                },
                {
                    test: /\.vue$/,
                    loader: 'vue-loader',
                    exclude: /(node_modules)/,
                    options: {
                        loaders: {
                            scss: ExtractTextPlugin.extract({
                                use: [
                                    {
                                        loader: 'css-loader',
                                        options: {
                                            sourceMap: config.cssSourceMap,
                                            minimize: true,
                                        }
                                    },
                                    "sass-loader?sourceMap",
                                ],
                                fallback: 'vue-style-loader'
                            })
                        }
                    }
                },
            ]
        },
        plugins: [
            new ExtractTextPlugin({
                filename: './css/[name].[contenthash:8].css',
                allChunks: true,
            }),
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false,
                    dead_code: true
                },
                sourceMap: false,
                output: {
                    comments: false
                }
            }),
            new HtmlWebpackPlugin({
                filename: 'index.html',
                template: resolve('src', 'index.html'),
                chunks: ['index'],
                hash: false,
                inject: 'body',
                xhtml: true,
                minify: {
                    removeComments: true,
                }
            }),
            new webpack.DefinePlugin({
                'process.env.NODE_ENV': JSON.stringify(NODE_ENV),
                'API_DOMAIN': config.API_DOMAIN
            })
        ]
    };

    // 开发环境服务器配置
    if (NODE_ENV === 'development') {
        webpackConfig.devServer = {
            contentBase: resolve('dist'),
            compress: true,
            host: '127.0.0.1',
            port: config.port,
            disableHostCheck: true,
            historyApiFallback: true
        };
    }

    // eslint 代码检测配置
    if (config.eslint) {
        webpackConfig.module.rules.push({
            test: /\.(js|vue)$/,
            enforce: 'pre',
            exclude: /node_modules/,
            loader: 'eslint-loader',
            options: {
                formatter: require('eslint-friendly-formatter')
            }
        });
    }

    return webpackConfig;
};
