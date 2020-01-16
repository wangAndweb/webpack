// webpack 默认配置项内容
// 可以通过命令行npx webpack --config mywebpack.config.js
// webpack 全局安装 =》 webpack index.js
// webpack 局部安装 =》 npx webpack index.js
// 配置在package.json里面 =》 npm run bundle => webpack
// webpack-cli 为在命令行中调用webpack
// 默认支持打包js
// loader => 不同文件的打包
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
module.exports = {
  entry: {
    app: './index.js'
  },
  // 简写形式：=》 entry: './src/index.js', // 可以配置多文件入口，数组格式
  output: {
    filename: "[name].js", // 入口文件
    chunkFilename: "[name].chunk.js", // 间接引入
    path: path.resolve(__dirname, '../dist'),
    publicPath: './'
    // publicPath: '/' 确保提供正确的文件路径
    // 所有输出文件的目标路径
    // __dirname 代表webpack.config.js所在的目录的绝对路径
    // 必须是绝对路径 Node path模块下的__dirname代表当前根目录 ，bundle代表当前目录下的文件夹名称
  },
  context: path.resolve(__dirname, '../src'),
  module: { // 遇到一些不识别的文件类型如何处理
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: {
          loader: 'url-loader',
          // 1.首先把文件移动到dist你目录下
          // 2.处理后赋予一个名字，返回到引用的变量
          options: {
            name: '[name]_[hash].[ext]',
            outputPath: 'images/', // 相对于output path路径设置
            limit: 20480
          }
          // option为个性化配置
        }
      },
      {
        test:  /\.(eot|ttf|svg|woff|woff2)$/,
        use: {
          loader: 'file-loader',
          // 1.首先把文件移动到dist你目录下
          // 2.处理后赋予一个名字，返回到引用的变量
          options: {
            name: '[name]_[hash].[ext]',
            outputPath: 'font/'
          }
          // option为个性化配置
        }
      },
      {
        test:  /\.(csv|tsv)$/,
        use: {
          loader: 'csv-loader'
        }
      },
      {
        test:  /\.xml$/,
        use: {
          loader: 'xml-loader'
        }
      }
    ]
  },
  // 模块打包配置文件，告诉指定类型文件通过loader来处理成模块, 针对非js文件
  // 如果引入的文件不是js，首先想到用loader来处理
  plugins: [new HtmlWebpackPlugin({
    template: './index.html'
  }), new CleanWebpackPlugin()],
  // 代码分割
  optimization: {
    usedExports: true, // 只打包有引入的内容
    splitChunks: {
      chunks: "all" // async只对异步代码进行分割    all对所有代码进行分割 chunks和vendors配合使用
      // minSize: 30000,
      // minChunks: 2, // 引用几次才做分割
      // maxAsyncRequests: 5,
      // maxInitialRequests: 3,
      // automaticNameDelimiter: '_',
      // name: true,
      // cacheGroups: {
      //   vendors: {
      //     test: /[\\/]node_modules[\\/]/,
      //     priority: -10   // 设置优先级，数值越大，优先级越高
      //   },
      //   default: {
      //     priority: -20,
      //     reuseExistingChunk: true // 如果模块被打包过，则忽略，直接使用打包过的模块
      //   }
      // }
    }
  }
};