// webpack 默认配置项内容
// 可以通过命令行npx webpack --config mywebpack.config.js
// webpack 全局安装 =》 webpack index.js
// webpack 局部安装 =》 npx webpack index.js
// 配置在package.json里面 =》 npm run bundle => webpack
// webpack-cli 为在命令行中调用webpack
// 默认支持打包js
const path = require('path');
module.exports = {
  mode: 'development', // 打包模式，会警告，如果不设置，默认生产环境
  entry: {
    main: './src/index.js'
  },
  // 简写形式：=》 entry: './src/index.js', // 可以配置多文件入口，数组格式
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, 'dist')
    // 所有输出文件的目标路径
    // __dirname 代表webpack.config.js所在的目录的绝对路径
    // 必须是绝对路径 Node path模块下的__dirname代表当前根目录 ，bundle代表当前目录下的文件夹名称
  },
  // 模块打包配置文件，告诉指定类型文件通过loader来处理成模块, 针对非js文件
  // 如果引入的文件不是js，首先想到用loader来处理
  module: {
    rules: [
      {
        test:  /\.(png|jpg|gif)$/,
        use: {
          loader: 'url-loader',
          // 1.首先把文件移动到dist你目录下
          // 2.处理后赋予一个名字，返回到引用的变量
          options: {
            name: '[name]_[hash].[ext]',
            outputPath: 'images/',
            limit: 20480
          }
          // option为个性化配置
        }
      },
      {
        test:  /\.vue$/,
        use: {
          loader: 'vue-loader'
        }
      }
    ]
  }
};