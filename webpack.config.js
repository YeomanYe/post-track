const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require('webpack');
const path = require('path');
const fs = require('fs');


module.exports = {
  entry: {
    popup: './js/App.js',
      background:'./js/bg/background.js',
      cnt:'./js/cnt/content.js',
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
          use: [MiniCssExtractPlugin.loader,'css-loader', 'sass-loader'],
          exclude: /node_modules/
      },
      {
        test: /\.(js|jsx)$/,
          use:{
              loader: 'babel-loader',
              options: {
                  presets: ['es2015', 'react'],
              }
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
    mode:'none',
    resolve:{
        extensions: ['.js','.jsx']
    },
  devtool: '#eval-source-map',
  plugins: [
      new MiniCssExtractPlugin({
          filename: '[name].css',
          chunkFilename: '[id].css'
      }),
  ]
};

if (process.env.NODE_ENV === 'production') {
  // module.exports.devtool = '#source-map'
  module.exports.devtool = false;
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new UglifyJSPlugin({
      sourceMap: false
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
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
  ])
}
