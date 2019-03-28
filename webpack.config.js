const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const outputPath = path.join(__dirname, '/target/html/assets'); // 输出文件路径
const theme = require('./theme');

const profiles = {
  development: {
    htmlPath: path.join(__dirname, '/target/html/assets/index.html'),
    publicPath: '/'
  },
  production: {
    htmlPath: path.join(__dirname, '/target/html/index.html'),
    publicPath: '/assets/'
  }
};

const webpackConfig = env => ({
  entry: path.join(__dirname, '/src/index.js'),
  output: {
    filename: '[name].[hash].js', // 打包后输出文件的文件名
    publicPath: env.production ? profiles.production.publicPath : profiles.development.publicPath,
    path: outputPath, // 打包后的文件存放的地方
    hashDigestLength: 8 // hash长度
  },
  devServer: {
    historyApiFallback: true, // 当使用 HTML5 History API 时，任意的 404 响应都可能需要被替代为 index.html
    port: '8087',
    index: 'index.html', // 被作为索引文件的文件名
    clientLogLevel: 'none',
    compress: true,
    hot: true, // 启用 webpack 的模块热替换特性
    open: true, // 启用 open 后，dev server 会打开浏览器。
    proxy: {
      '/api': {
        // target: "http://192.168.1.121:9000"
        target: 'https://wbd.api.t.jiabangou.com',
        changeOrigin: true,
        secure: true
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    },
    extensions: ['.js'], // 自动解析确定的扩展, 能够使用户在引入模块时不带扩展, 尽可能的减少后缀尝试的可能性
    modules: [path.resolve(__dirname, 'src'), 'node_modules'] // 告诉 webpack 解析模块时应该搜索的目录, src目录模块搜索优先于node_modules/搜索
  },
  devtool: env.production ? 'eval' : 'source-maps',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/node_modules/, path.join(__dirname, '/src/excludeFile/')],
        use: [
          {
            loader: 'babel-loader?cacheDirectory=true'
          }
        ],
        // 只对项目根目录下的 src 目录中的文件采用 babel-loader
        include: path.resolve(__dirname, 'src')
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: 'style-loader' // creates style nodes from JS strings
          },
          {
            loader: 'css-loader' // translates CSS into CommonJS
          },
          {
            loader: 'less-loader', // compiles Less to CSS
            options: {
              modifyVars: theme,
              javascriptEnabled: true
            }
          }
        ]
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {
              limit: 3000,
              name: '[hash:8].[ext]'
            }
          }
        ]
      }
    ],
    noParse: [/react\.min\.js$/] // 独完整的 `react.min.js` 文件就没有采用模块化，忽略对 `react.min.js` 文件的递归解析处理
  },
  plugins: [
    new CleanWebpackPlugin([path.join(__dirname, '/target')]), // 用于在构建之前删除/清理构建文件夹
    new HtmlWebpackPlugin({
      template: './public/index.html', // 本地模版文件的位置
      filename: env.production ? profiles.production.htmlPath : profiles.development.htmlPath, // 输出文件的文件名称
      inject: true, // 所有JavaScript资源插入到body元素的底部
      favicon: path.join(__dirname, '/public/favicon.ico') // 添加特定favicon路径到输出的html文档中
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/) // Ignore all locale files of moment.js
  ]
});

module.exports = webpackConfig;
