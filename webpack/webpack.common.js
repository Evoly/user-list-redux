const path = require('path');
const fs = require('fs');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const UnminifiedWebpackPlugin = require('unminified-webpack-plugin');

const pagesDir = path.resolve(__dirname, '../src/pages/');
const pages = fs.readdirSync(pagesDir).filter((fileName) => fileName.endsWith('.pug'));

const config = {
  entry: [path.resolve('./src/index.js'), 'react-hot-loader/patch', './src'],
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'scripts/[name].min.js',
    publicPath: './',
  },
  resolve: { extensions: ['.js', '.jsx'] },
  plugins: [
    ...pages.map((page) => new HtmlWebpackPlugin({
      template: `${pagesDir}/${page}`,
      filename: `./${page.replace(/\.pug/, '.html')}`,
    })),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
      chunkFilename: '[id].css',
      ignoreOrder: false, // Enable to remove warnings about conflicting order
    }),
    new CopyWebpackPlugin([
      { from: `${path.resolve('./src/static')}`, to: `${path.resolve(__dirname, '../dist')}` },
      { from: `${path.resolve('./src/scripts/libs')}`, to: `${path.resolve(__dirname, '../dist/scripts/libs')}` },
    ]),
  ],
  module: {
    rules: [{
      test: /\.pug$/,
      use: ['pug-loader'],
    },
    {
      test: /\.scss$/,
      use: [
        'style-loader',
        MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader',
          options: { sourceMap: true },
        },
        {
          loader: 'postcss-loader',
          options: { sourceMap: true, config: { path: 'postcss.config.js' } },
        },
        {
          loader: 'sass-loader',
          options: { sourceMap: true },
        },
      ],
    },
    {
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env',
            '@babel/preset-react'],
          plugins: ['@babel/plugin-transform-runtime',
            '@babel/plugin-proposal-class-properties',
            'react-hot-loader/babel'],
          cacheDirectory: true,
        },
      },
    },
    ],
  },
  performance: {
    assetFilter(assetFilename) {
      return assetFilename.endsWith('.js');
    },
  },
};

module.exports = config;
