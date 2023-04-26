const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const config = {
    entry: './lib/index.js',
    output: {
        filename: 'bundle.[hash].js',
        path: path.resolve(__dirname, './../dist/')
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    extractCSS: true
                }
            },
            {
                test: /\.css$/,
                loader: 'css-loader'
            },
            {
                test: /\.less$/,
                loader: 'style!css!less'
            },
            {
                test: /\.(png|jpg|gif)$/,
                loader: 'url-loader'
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('style.[hash].css')
    ],
    resolve: {
        extensions: ['*', '.js', '.vue', '.json']
    }
};


module.exports = config;
