var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');
var CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.less$/,
        loader: 'less-loader'
      },
      {
        test: /\.css$/,
        use:[ 'style-loader','css-loader']
    },
      {
        test: /\.(bmp|png|svg|jpg|gif|ico)$/,
        include: path.resolve(__dirname, "./src/images"),
        loader: require.resolve('url-loader'),
        options: {
          limit: 10000,
          context: './src/images',
          name: './static/images/[name].[ext]',
        },
      }
    ]
  },
  optimization: {
    minimize: true,
    splitChunks: {
      chunks: 'all'
    }
  },
  entry: {
    index: './src/index.js'
  },
  output: {
    path: path.resolve(__dirname, './public/'),
    publicPath: '/',
    filename: 'static/index_bundle.js',
    chunkFilename: 'static/js/[name].[contenthash:8].chunk.js'
    //filename: 'static/index'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      favicon: './src/images/favicon.ico',
    }),
    new CopyWebpackPlugin([
      {from:'./src/images',to:'static/images'} 
    ]),
  ]
};