const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const path = require('path');
const fs = require('fs');

const NODE_ENV = process.env.NODE_ENV;
module.exports = {
    entry: {
        popup: ['babel-polyfill', './js/App.js'],
        background: ['babel-polyfill', './js/bg/index.js'],
        cnt: ['babel-polyfill', './js/cnt/index.js'],
    },
    output: {
        path: path.resolve(__dirname, './build'),
        publicPath: '/build/',
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.(scss|css)$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.(js|jsx)$/,
                use: {
                    loader: 'babel-loader',
                },
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]?[hash]'
                }
            }
        ]
    },
    devServer: {
        historyApiFallback: true,
        noInfo: true,
        overlay: true
    },
    performance: {
        hints: false
    },
    mode: 'none',
    resolve: {
        extensions: ['.js', '.jsx']
    },
    devtool: NODE_ENV === 'production' ? false : '#eval-source-map',
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css'
        }),
        new UglifyJSPlugin({
            sourceMap:NODE_ENV !== 'production'
        }),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV:NODE_ENV === 'production' ? '"production"' : '"development"'
            }
        }),
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, './images'),
                to: path.resolve(__dirname, 'build/images'),
                ignore: ['.*']
            },
            {
                from: path.resolve(__dirname, './fonts'),
                to: path.resolve(__dirname, 'build/fonts'),
                ignore: ['.*']
            },
            {
                from: path.resolve(__dirname, './css'),
                to: path.resolve(__dirname, 'build/css'),
                ignore: ['popup.scss']
            },
            {
                from: path.resolve(__dirname, './lib'),
                to: path.resolve(__dirname, 'build/lib'),
                ignore: ['.*']
            },
            {
                from: path.resolve(__dirname, './popup.html'),
                to: path.resolve(__dirname, 'build/popup.html'),
                ignore: ['.*']
            },
            {
                from: path.resolve(__dirname, './manifest.json'),
                to: path.resolve(__dirname, 'build/manifest.json'),
                ignore: ['.*']
            },
        ])
    ]
};
