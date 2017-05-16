const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: [
    'babel-polyfill',
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:8261',
    'webpack/hot/only-dev-server',
    path.resolve('./src/index.js'),
  ],
  output: {
    path: path.resolve(__dirname, 'dist/assets/js'),
    publicPath: '/assets/js',
    filename: 'app.js',
    sourceMapFilename: '[file].map',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
      },
    ],
  },
  resolve: {
    alias: {
      src: path.resolve('./src'),
      fs: path.resolve('./src/shims/fs.js'),
    },
    extensions: ['.js', '.json'],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
  ],
  devtool: 'source-map',
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    compress: true,
    port: 8261,
    hot: true,
    historyApiFallback: {
      index: 'index.html',
    },
  },
}
