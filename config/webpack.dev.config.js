/*
 * @Description:
 * @Version: 2.0
 * @Autor: liushuhao
 * @Date: 2022-06-01 22:19:16
 * @LastEditors: liushuhao
 * @LastEditTime: 2023-06-07 14:22:11
 */
const TerserPlugin = require('terser-webpack-plugin');
const os = require('os');
const { join, resolve } = require('path');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');
module.exports = {
  optimization: {
    minimize: true,
    minimizer: [
      //esbuild prepack压缩
      new TerserPlugin({
        parallel: os.cpus().length - 1,
      }),
      new CssMinimizerPlugin({
        parallel: os.cpus().length - 1,
      }),
    ],
  },
  plugins: [
    new Dotenv({
      path: './.env.dev',
    }),
    new HtmlWebpackPlugin({
      title: 'map',
      filename: 'index.html',
      template: resolve(__dirname, '../src/web/index.html'),
    }),
    // new MiniCssExtractPlugin(),
  ],
};
