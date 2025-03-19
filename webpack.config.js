const webpack = require('webpack');
const packageJson = require('./package.json');
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: "development",
  entry: {
    sienna: "./src/entry.ts",
    styles: "./src/styles.scss",
  },
  output: {
    filename: '[name].min.js',
    path: path.resolve(__dirname, 'dist'),
    pathinfo: true,
  },
  resolve: {
    extensions: ['.ts', '.js', '.json'],
    alias: {
      '@': path.resolve(__dirname, './'),
    },
  },
  module: {
      rules: [
        {
          test: /\.ts$/,
          use: 'ts-loader',
          exclude: /node_modules/
        },
        {
          test: /\.html$/i,
          loader: 'html-loader',
          options: {
            minimize: true,
          },
        },
        {
          test: /\.(css|scss)$/,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                importLoaders: 2,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  plugins: [['autoprefixer']],
                },
              },
            },
            'sass-loader',
          ],
        },
        {
          test: /\.svg$/,
          use: [
            "raw-loader"
          ]
        }
      ],
  },
  optimization: {
    minimizer: [new TerserPlugin({
      extractComments: false,
    })],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
  ],
};