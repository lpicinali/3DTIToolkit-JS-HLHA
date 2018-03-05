const path = require('path')

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
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
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
      src: path.join(__dirname, 'src'),
      fs: path.join(__dirname, './src/shims/fs.js'),
      '3dti-toolkit': path.join(__dirname, './src/shims/3dti-toolkit.js'),
    },
    extensions: ['.js', '.json'],
  },
  plugins: [],
}
