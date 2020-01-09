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
const ManifestPlugin =  require('webpack-manifest-plugin');
const webpack = require('webpack');
// htmlWebpackPlugin 会在打包结束后自动生成一个html文件
// 打包生成的js自动引入到html中
// plugin 可以再webpack运行到一个特定的时刻干一件事情
module.exports = {
  mode: 'development', // 打包模式，会警告，如果不设置，默认生产环境
  devtool: 'inline-source-map', // sourceMap关闭, sourceMap是映射关系，他知道打包后文件每行代码对应src文件对应文件第几行
  // 推荐建议 dev =》 cheap-module-eval-source-map pro => cheap-module-source-map
  // cheap为只精确到行 inline为集合到行内文件
  context: path.resolve(__dirname, 'src'),
  devServer: { // 本地启动node服务, 本质上为启动服务后打包文件没有放到磁盘，放到了内存中
   contentBase: './dist',  // 服务器启动在哪个文件夹下 path.join(__dirname, "dist")
    // open: true,  // 自动打开浏览器，自动访问服务器地址
    port: 8091,
    hot: true, // 开启hot module replace功能, 主要是为了保留原来的页面,方便调试页面 ，原则上需要写module.hot代码编写，用到accept方法，
    hotOnly: true // 如果HMR失效，则就让页面失效，不要刷新页面
  },
  entry: {
    app: './index.js'
  },
  // 简写形式：=》 entry: './src/index.js', // 可以配置多文件入口，数组格式
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
    // publicPath: '/' 确保提供正确的文件路径
    // 所有输出文件的目标路径
    // __dirname 代表webpack.config.js所在的目录的绝对路径
    // 必须是绝对路径 Node path模块下的__dirname代表当前根目录 ，bundle代表当前目录下的文件夹名称
  },
  // 模块打包配置文件，告诉指定类型文件通过loader来处理成模块, 针对非js文件
  // 如果引入的文件不是js，首先想到用loader来处理
  module: { // 遇到一些不识别的文件类型如何处理
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test:  /\.(png|jpg|gif)$/,
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
        test:  /\.css$/,
        use: [
          { loader: 'style-loader', options: { attributes: {
            id: 'id',
            insert: 'body'
          } } },
          { loader: 'css-loader' }, 'postcss-loader'
        ]
        // css-loader 分析css-loader关系，生成对应的css
        // style-loader 负责在对应页面挂载css
      },
      {
        test:  /\.scss$/,
        use: [
          { loader: 'style-loader', options: { attributes: {
            id: 'id',
            insert: 'body'
          } } },
          'css-loader', 'sass-loader', 'postcss-loader'
        ]
        // css-loader 分析css-loader关系，生成对应的css
        // style-loader 负责在对应页面挂载css
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
  plugins: [new HtmlWebpackPlugin({
    template: './index.html',
    title: 'Development'
  }), new CleanWebpackPlugin(), new webpack.HotModuleReplacementPlugin()]
};