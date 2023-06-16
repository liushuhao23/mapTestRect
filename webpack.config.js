const { resolve } = require('path');
const merge = require('webpack-merge');
const argv = require('yargs-parser')(process.argv.slice(2));
const _mode = argv.mode || 'development';
const mode= process.env.mode;
const _mergeConfig = require(`./config/webpack.${mode}.config.js`);
const _modeflag = _mode === 'production' ? true : false;
const WebpackBar = require('webpackbar');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const packageName = require('./package.json').name;

const webpackBaseConfig = {
  entry: {
    main: resolve('src/web/index.tsx'),
  },
  output: {
    library: `${packageName}-[name]`,
    libraryTarget: 'umd',
    globalObject: 'window',
    path: resolve(__dirname, '../dist'),
    // publicPath: process.env.APP_PUBLIC_PATH,
    filename: 'scripts/[name].[contenthash:5].bundule.js'
  },
  cache: {
    type: 'filesystem',
    // cacheDirectory: resolve(__dirname, '.temp'),
  },
  // performance: {
  //   maxAssetSize: 250000, // 最大资源大小250KB
  //   maxEntrypointSize: 250000, // 最大入口资源大小250KB
  //   hints: 'warning', // 超出限制时只给出警告
  // },
  module: {
    rules: [
      {
        test: /\.(js|ts|tsx)$/,
        // include: '/node_modules/',
        use: {
          loader: 'swc-loader',
        },
      },
      {
        test: /\.(eot|woff|woff2|ttf|svg|png|jpg)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.css$/i,
        include: [resolve(__dirname, 'src'), resolve(__dirname, 'node_modules')],
        use: [
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader', options: { importLoaders: 1 } },
          'postcss-loader',
        ],
      },
      {
        test: /\.less$/,
        include: [resolve(__dirname, 'src'), resolve(__dirname, 'node_modules')],
        use: [
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader?modules&localIdentName=[name]_[local]-[hash:6]', options: { importLoaders: 1 } },
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                  javascriptEnabled: true
              }
            }
          }
          // 'postcss-loader',
        ],
      },
      {
        test: /\.(png|jpg|svg)$/,
        type: 'asset',
      },
      // {
      //   resourceQuery: /raw-lingui/,
      //   type: 'javascript/auto',
      // },
    ],
  },
  optimization: {
    runtimeChunk: {
      name: 'runtime',
    },
    splitChunks: {
      chunks: 'all',
      maxAsyncRequests: 3,
      cacheGroups: {},
    },
  },
  resolve: {
    // fallback: { url: false, os: false },
    alias: {
      '@components': resolve('src/web/components'),
      '@hooks': resolve('src/web/hooks'),
      '@pages': resolve('src/web/pages'),
      '@layouts': resolve('src/web/layouts'),
      '@assets': resolve('src/web/assets'),
      '@states': resolve('src/web/states'),
      '@service': resolve('src/web/service'),
      '@utils': resolve('src/web/utils'),
      '@lib': resolve('src/web/lib'),
      '@constants': resolve('src/web/constants'),
      '@web': resolve('src/web'),
      '@resource': resolve('src/resource'),
      '@type': resolve('src/web/type'),

    },
    extensions: ['.js', '.ts', '.tsx', '.jsx', '.css'],
  },
  plugins: [
    // new NodePolyfillPlugin(),
    new MiniCssExtractPlugin({
      filename: _modeflag ? 'styles/[name].[contenthash:5].css' : 'styles/[name].css',
      chunkFilename: _modeflag ? 'styles/[name].[contenthash:5].css' : 'styles/[name].css',
      ignoreOrder: false,
    }),
    // new ProvidePlugin({
    //   Buffer: ['buffer', 'Buffer'],
    // }),
    new CleanWebpackPlugin(),
    new WebpackBar(),
    // new Dotenv(),
  ],
};
module.exports = merge.default(webpackBaseConfig, _mergeConfig);
