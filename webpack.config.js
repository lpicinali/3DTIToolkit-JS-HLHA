const path = require('path')
const webpack = require('webpack')

module.exports = {
  entry: ['babel-polyfill', path.resolve('./src/index.js')],
  output: {
    path: path.resolve(__dirname, 'public/assets/js'),
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
      '3dti-toolkit': path.resolve('./src/shims/3dti-toolkit.js'),
    },
    extensions: ['.js', '.json'],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
  ],
  devtool: 'source-map',
}
