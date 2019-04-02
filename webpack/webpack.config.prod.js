const path = require('path');
const Webpack = require('webpack');
const merge = require('webpack-merge');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const common = require('./webpack.common.js');
const postcssPresetEnv = require('postcss-preset-env');
const WebpackAssetsManifest = require('webpack-assets-manifest');


module.exports = merge(common, {
    mode: 'production',
    devtool: 'source-map',
    stats: 'errors-only',
    bail: true,
    entry: [
        path.resolve(__dirname, "../src/assets/scripts/main.js")
    ],
    output: {
        filename: 'scripts/[name].[chunkhash:8].js',
        chunkFilename: 'scripts/[name].[chunkhash:8].chunk.js'
    },
    plugins: [
        new Webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new Webpack.optimize.ModuleConcatenationPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].min.css'
        }),
        new WebpackAssetsManifest({
            output: path.resolve(__dirname, '../src/_data/manifest.json')
        })
    ],
    module: {
        rules: [
            {
                test: /\.(js)$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
            {
                test: /\.(css|pcss)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    { loader: 'css-loader', options: { importLoaders: 1 } },
                    { loader: 'postcss-loader', options: {
                            config: {
                                path: __dirname + '/postcss.config.js'
                            }
                        }
                    }
                ]
            }
        ]
    }
});
