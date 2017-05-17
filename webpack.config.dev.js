const path = require('path')

const config = require('./webpack.config.js')

module.exports = Object.assign({}, config, {
  entry: [
    'babel-polyfill',
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:8261',
    'webpack/hot/only-dev-server',
    path.resolve('./src/index.dev.js'),
  ],
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    compress: true,
    port: 8261,
    hot: true,
    historyApiFallback: {
      index: 'index.html',
    },
  },
})
