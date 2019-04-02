const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    entry: [
        'webpack-dev-server/client?http://localhost:8080',
        'webpack/hot/dev-server',
        path.resolve(__dirname, "../src/assets/scripts/main.js")
    ],
    mode: 'development',
    devtool: 'inline-source-map',
    output: {
        publicPath: `http://localhost:8080`,
        chunkFilename: '[name].chunk.js'
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.(js)$/,
                include: path.resolve(__dirname, '../src'),
                enforce: 'pre',
                loader: 'eslint-loader',
                options: {
                    emitWarning: true,
                }
            },
            {
                test: /\.(js)$/,
                include: path.resolve(__dirname, '../src'),
                loader: 'babel-loader'
            },
            {
                test: /\.(css|pcss)$/,
                include: path.resolve(__dirname, '../src'),
                use: [
                    'style-loader',
                    { loader: 'css-loader', options: { importLoaders: 1 } },
                    { loader: 'postcss-loader', options: {
                            config: {
                                path: __dirname + '/postcss.config.js'
                            }
                        } }
                ]
            }
        ]
    },
    devServer: {
        hot: false,
        inline: true,
        contentBase: path.resolve(__dirname, "../dist"),
        publicPath: '/assets/',
        watchContentBase: true
    }
});
