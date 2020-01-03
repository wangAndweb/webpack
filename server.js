const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const config = require('./webpack.config');
// 在node中使用webpack
const complier = webpack(config);  // 做编译器，执行就是打包代码
const app = express();
app.use(webpackDevMiddleware(complier, {
  // publickPath: config.output.publicPath
}));
app.listen(3000, () => {
  console.log('服务器启动了！')
});