'use strict';
// Imports: Dependencies
const path = require('path');
require("babel-register");
const webpack = require('webpack');
const dotenv = require('dotenv');
const HtmlWebpackPlugin = require('html-webpack-plugin');
//https://www.npmjs.com/package/react-dev-utils
const InterpolateHtmlPlugin = require('react-dev-utils/InterpolateHtmlPlugin');
const ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin');
const fs = require('fs');

const env = dotenv.config().parsed;
const envKeys = Object.keys(env).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(env[next]);
  return prev;
}, {});

const commonPaths = {
    public: path.resolve(__dirname, './public/'),
    src: path.resolve(__dirname, './src/'),
};

// Webpack Configuration
const config = {
  
  
// Entry
  
entry: commonPaths.src+'/index.js',
  // Output
  
output: {
    path: commonPaths.public,
    filename: 'bundle.js',
    publicPath:'/',
    globalObject: 'this'
  },
  devServer: {
    contentBase: './public/'
  },
  // Loaders
  
module: {
    rules : [
      // JavaScript/JSX Files
      {
        test: /\.(js|jsx)$/,
        exclude: [/node_modules/],
        include: [commonPaths.src],
        use: ['babel-loader'],
      },
      // CSS Files
      {
        test: /\.css$/,
        use: ['css-loader'],
      },
      {
        test: /\.(png|svg|jpg|gif|ico)$/,
        use: ['file-loader']
    },
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  // Plugins
  
plugins: [
  new webpack.DefinePlugin(envKeys),
  new HtmlWebpackPlugin(
    {
      template: commonPaths.src + '/index.html',
      inject: true,
      apiUrl: 'http://localhost:8080',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    }),
  new InterpolateHtmlPlugin(HtmlWebpackPlugin, 
    {
      PUBLIC_URL: '/',
    }),
], 
node: { fs: 'empty' },
  // Reload On File Change
  //watch: true,
  // Development Tools (Map Errors To Source File)
  devtool: 'source-map',
  target: 'web',
};

// Exports
module.exports = config;