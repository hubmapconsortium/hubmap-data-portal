'use strict';
// Imports: Dependencies
const path = require('path');
require("babel-register");
const htmlWebpackPlugin = require('html-webpack-plugin');
require("babel-register");
const commonPaths = {
    public: path.resolve(__dirname, 'dist/'),
    src: path.resolve(__dirname, './src/'),
};

// Webpack Configuration
const config = {
  
  
// Entry
  
entry: commonPaths.src,
  // Output
  
output: {
    path: commonPaths.public,
    filename: 'bundle.js',
  },
  // Loaders
  
module: {
    rules : [
      // JavaScript/JSX Files
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      // CSS Files
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader']
    },
    ]
  },
  // Plugins
  
plugins: [new htmlWebpackPlugin({
    template: commonPaths.src + '/index.js',
    filename: commonPaths.public + '/index.html',
    hash: true
  })],
  // Reload On File Change
  watch: true,
  // Development Tools (Map Errors To Source File)
  devtool: 'source-map',
};
// Exports
module.exports = config;