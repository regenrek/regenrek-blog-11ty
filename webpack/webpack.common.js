const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');


module.exports = {
    output: {
        path: path.join(__dirname, "../dist/assets"),
        filename: "[name].js",
    },
    resolve: {
        alias: {
            '~': path.resolve(__dirname, '../src')
        }
    },
    module: {
        rules: [
            {
                test: /\.mjs$/,
                include: /node_modules/,
                type: 'javascript/auto'
            },
            {
                test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[path][name].[ext]'
                    }
                }
            },
        ]
    },
};
