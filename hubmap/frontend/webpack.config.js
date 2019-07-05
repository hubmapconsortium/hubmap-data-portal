'use strict';
// Imports: Dependencies
const path = require('path');
require("babel-register");
const htmlWebpackPlugin = require('html-webpack-plugin');
const ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin');
const commonPaths = {
    public: path.resolve(__dirname, 'dist/'),
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
    contentBase: './dist'
  },
  // Loaders
  
module: {
    rules : [
      // JavaScript/JSX Files
      {
        test: /\.(js|jsx)$/,
        exclude: [/node_modules/],
        use: ['babel-loader'],
      },
      // CSS Files
      {
        test: /\.css$/,
        use: ['css-loader'],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader']
    },
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  // Plugins
  
/* plugins: [new htmlWebpackPlugin({
    template: commonPaths.src + '/index.js',
    filename: commonPaths.public + '/index.html',
    hash: true
  }),
  new ServiceWorkerWebpackPlugin({
    entry: path.join(__dirname, 'src/serviceWorker.js'),
  }),
], */
  // Reload On File Change
  watch: true,
  // Development Tools (Map Errors To Source File)
  devtool: 'source-map',
};
// Exports
module.exports = config;