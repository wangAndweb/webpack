const merge = require('webpack-merge');
const commonConfig = require('./webpack.common');
const prodConfig = {
  mode: 'production', // 打包模式，会警告，如果不设置，默认生产环境
  devtool: 'cheap-module-source-map', // sourceMap关闭, sourceMap是映射关系，他知道打包后文件每行代码对应src文件对应文件第几行
  // 推荐建议 dev =》 cheap-module-eval-source-map pro => cheap-module-source-map
  // cheap为只精确到行 inline为集合到行内文件

};
module.exports = merge(commonConfig, prodConfig);