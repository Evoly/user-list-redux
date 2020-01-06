const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    overlay: true,
    hot: true,
    contentBase: './dist',
    writeToDisk: true,
    watchContentBase: true,
    port: 3000,
    historyApiFallback: true,
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: `${path.resolve('./src/images')}`, to: `${path.resolve(__dirname, '../dist/images')}` },
    ]),
  ],
});
