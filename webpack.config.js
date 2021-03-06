const webpack = require('webpack');
const merge = require('webpack-merge');
const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

var commonConfig = {
  output: {
    path: path.resolve(__dirname + '/dist/'),
  },
  module: {
    rules: [{
        test: /\.js$/,
        loader: 'babel-loader',
        include: __dirname,
        exclude: /node_modules/
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.css$/,
        loader: 'style!less!css'
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          name: '[name].[ext]?[hash]',
          limit: 10000,
          publicPath: './dist/',
        }
      }
    ]
  },
  plugins: [
    new UglifyJSPlugin()
  ]
};

module.exports = [
  merge(commonConfig, {
    entry: path.resolve(__dirname + '/src/App.vue'),
    output: {
      filename: 'deali-month-picker.js',
      libraryTarget: 'umd',
      library: 'Deali-month',
      umdNamedDefine: true
    }
  })
];