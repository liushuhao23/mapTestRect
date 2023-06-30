/*
 * @Description:
 * @Version: 2.0
 * @Autor: liushuhao
 * @Date: 2022-06-01 22:19:08
 * @LastEditors: liushuhao
 * @LastEditTime: 2023-06-30 16:56:15
 */
const { join, resolve } = require('path');
const FriendlyErrorsWebpackPlugin = require('@soda/friendly-errors-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const notifier = require('node-notifier');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const webpack = require('webpack');
const Dotenv = require('dotenv-webpack');

const prot = 3004;
const isBx = process.env.BX

const getHeader = () => {
  let header = {};
  isBx
    ? (header = {
        'Access-Control-Allow-Origin': 'http://localhost:4001',
        'Access-Control-Allow-Credentials': 'true',
        'Access-Control-Allow-Methods': 'GET,HEAD,OPTIONS,POST,PUT,DELETE',
        'Access-Control-Allow-Headers': 'citycode,cityid,session,cbim-cityid,cbim-citycode,entid,env,accountid,appcode,applicationname,sessionkey,session-key,cbim-projectid,cbim-accountid,DNT,X-Mx-ReqToken,Keep-Alive,User-Agent,XRequested-With,If-Modified-Since,Cache-Control,Content-Type,Authorization,Uc-Authorization'
      })
    : (header = {
        'Access-Control-Allow-Origin': '*'
      });
  return header;
};

module.exports = {
  output: {
    publicPath: `/${process.env.APP_PUBLIC_PATH}/`,
  },
  devServer: {
    historyApiFallback: {
      index: `/${ process.env.APP_PUBLIC_PATH }/index.html`
    },
    headers:  getHeader(),
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
    },
    static: {
      // directory: join(__dirname, '../dist'),
      publicPath: process.env.APP_PUBLIC_PATH? `/${process.env.APP_PUBLIC_PATH}`: '/map',
    },
    hot: true,
    port: prot,
    open: true
  },
  devtool: false,
  plugins: [
    new Dotenv({
      path: './.env.development',
    }),
    new HtmlWebpackPlugin({
      title: '地图',
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
