const webpack = require('webpack');
const merge = require('webpack-merge');
const commonConfig = require('./webpack.common');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
// htmlWebpackPlugin 会在打包结束后自动生成一个html文件
// 打包生成的js自动引入到html中
// plugin 可以再webpack运行到一个特定的时刻干一件事情
const devConfig= {
  mode: 'development', // 打包模式，会警告，如果不设置，默认生产环境
  devtool: 'cheap-module-source-map', // sourceMap关闭, sourceMap是映射关系，他知道打包后文件每行代码对应src文件对应文件第几行
  // 推荐建议 dev =》 cheap-module-eval-source-map pro => cheap-module-source-map
  // cheap为只精确到行 inline为集合到行内文件
  devServer: { // 本地启动node服务, 本质上为启动服务后打包文件没有放到磁盘，放到了内存中
   contentBase: './dist',  // 服务器启动在哪个文件夹下 path.join(__dirname, "dist")
    // open: true,  // 自动打开浏览器，自动访问服务器地址
    port: 8091,
    hot: true // 开启hot module replace功能, 主要是为了保留原来的页面,方便调试页面 ，原则上需要写module.hot代码编写，用到accept方法，
  },
  // 模块打包配置文件，告诉指定类型文件通过loader来处理成模块, 针对非js文件
  // 如果引入的文件不是js，首先想到用loader来处理
  plugins: [new webpack.HotModuleReplacementPlugin()/*, new BundleAnalyzerPlugin()*/],
  optimization: {
    usedExports: true // 只打包有引入的内容
  }
};
module.exports = merge(commonConfig, devConfig);