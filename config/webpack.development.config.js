/*
 * @Description:
 * @Version: 2.0
 * @Autor: liushuhao
 * @Date: 2022-06-01 22:19:08
 * @LastEditors: liushuhao
 * @LastEditTime: 2023-06-08 17:40:56
 */
const { join, resolve } = require('path');
const FriendlyErrorsWebpackPlugin = require('@soda/friendly-errors-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const notifier = require('node-notifier');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');

const prot = 3004;
console.log(process.env.APP_PUBLIC_PATH, 'process.env.APP_PUBLIC_PATH  cross-env APP_PUBLIC_PATH=map')
module.exports = {
  output: {
    publicPath: process.env.APP_PUBLIC_PATH? `/${process.env.APP_PUBLIC_PATH}`: '/map/',
  },
  devServer: {
    historyApiFallback: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    hot: false,
    // watchContentBase: false,
    liveReload: false,
    client: {
      logging: 'info',
    },
    proxy: {
      '/system/api': {
        // target: 'https://xland-test.cbim.org.cn/kunlun/datacenter', // test
        target: 'https://xland-dev.cbim.org.cn/tianshan', // dev
        changeOrigin: true,
        secure: true
      },
      '/tianshan': {
        // target: 'https://xland-test.cbim.org.cn/kunlun/datacenter', // test
        target: 'https://xland-dev.cbim.org.cn/tianshan', // dev
        changeOrigin: true,
        secure: true,
        pathRewrite: {
          '^/tianshan': ''
        }
      },
      // '/algorithm': {
      //   target: 'http://localhost:8888',
      //   changeOrigin: true,
      //   pathRewrite:{ '^/algorithm': ''}
      // },
    },
    static: {
      directory: join(__dirname, '../dist'),
      publicPath: process.env.APP_PUBLIC_PATH? `/${process.env.APP_PUBLIC_PATH}`: '/map/',
    },
    hot: true,
    port: prot,
  },
  devtool: false,
  plugins: [
    new Dotenv({
      path: './.env.development',
    }),
    new HtmlWebpackPlugin({
      title: 'map',
      filename: 'index.html',
      template: resolve(__dirname, '../src/web/index.html'),
    }),

    new FriendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        messages: ['You application is running here http://localhost:' + prot],
        notes: ['💊 构建信息请及时关注窗口右上角'],
      },
      onErrors: function (severity, errors) {
        if (severity !== 'error') {
          return;
        }
        const error = errors[0];
        notifier.notify({
          title: '👒 Webpack构建失败',
          message: severity + ': ' + error.name,
          subtitle: error.file || '',
        });
      },
      clearConsole: true,
    }),
    new webpack.SourceMapDevToolPlugin({ exclude: '/node_modules/*' }),
  ],
};
