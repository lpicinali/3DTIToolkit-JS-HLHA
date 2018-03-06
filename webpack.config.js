const path = require('path')
const webpack = require('webpack')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  entry: ['babel-polyfill', path.resolve('./src/index.js')],
  output: {
    path: path.resolve('./public/assets/js'),
    publicPath: '/assets/js',
    filename: 'app.js',
    sourceMapFilename: '[file].map',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.s?css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'sass-loader' },
        ],
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
    new UglifyJsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
  ],
}
