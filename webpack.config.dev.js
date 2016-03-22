var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: [
    'webpack-hot-middleware/client?path=http://localhost:3000/__webpack_hmr',
    './src/index.js'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'dist/bundle.js',
    publicPath: 'http://localhost:3000/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('dev')
      }
    }),
    new HtmlWebpackPlugin({
      title: require('./package').name,
      filename: 'index.html'
    })
  ],
  module: {
    loaders: [{
      test: /.jsx?$/,
      loaders: ['babel'],
      include: path.join(__dirname, 'src'),
      exclude: /node_modules/
    }]
  }
};
