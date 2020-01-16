const path = require('path');
const merge = require('webpack-merge');
const commonConfig = require('./webpack.common');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const prodConfig = {
  mode: 'production', // 打包模式，会警告，如果不设置，默认生产环境
  devtool: 'cheap-module-source-map', // sourceMap关闭, sourceMap是映射关系，他知道打包后文件每行代码对应src文件对应文件第几行
  // 推荐建议 dev =》 cheap-module-eval-source-map pro => cheap-module-source-map
  // cheap为只精确到行 inline为集合到行内文件
  module: {
    rules: [
      {
        test:  /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: (resourcePath, context) => {
                return path.relative(path.dirname(resourcePath), context) + '/';
              },
            },
          },
          { loader: 'css-loader' }, 'postcss-loader'
        ]
        // css-loader 分析css-loader关系，生成对应的css
        // style-loader 负责在对应页面挂载css
      },
      {
        test:  /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: (resourcePath, context) => {
                return path.relative(path.dirname(resourcePath), context) + '/';
              },
            },
          },
          'css-loader', 'sass-loader', 'postcss-loader'
        ]
        // css-loader 分析css-loader关系，生成对应的css
        // style-loader 负责在对应页面挂载css
      }
    ]
  },
  optimization: {
    minimizer: [new OptimizeCSSAssetsPlugin({})],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[name].chunk.css'
    })
  ]

};
module.exports = merge(commonConfig, prodConfig);