const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const webpack = require('webpack');

module.exports = {
  mode: 'development',
  entry: {
    coach: './scripts/coach.js',
    home: './scripts/home.js',
    login: './scripts/login.js',
    questionnaires: './scripts/questionnaires.js',
    'reset-password': './scripts/reset-password.js',
    signup: './scripts/signup.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name]/[name].js',
    clean: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        resolve: {
          fullySpecified: false
        },
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            // presets: [],
          },
        },
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      BASE_URL: JSON.stringify(process.env.BASE_URL || '/'), 
    }),
    new MiniCssExtractPlugin({
      filename: '[name]/[name].css',
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'public'),
          to: path.resolve(__dirname, 'dist'),
        },
        {
          from: path.resolve(__dirname, 'home/index.html'),
          to: path.resolve(__dirname, 'dist'),
          transform(content) {
            return content.toString().replace(/__BASE_URL__/g, process.env.BASE_URL || '/');
          },
        },
        {
          from: path.resolve(__dirname, 'coach/index.html'),
          to: path.resolve(__dirname, 'dist/coach/'),
          transform(content) {
            return content.toString().replace(/__BASE_URL__/g, process.env.BASE_URL || '/');
          },
        },
        {
          from: path.resolve(__dirname, 'login/index.html'),
          to: path.resolve(__dirname, 'dist/login/'),
          transform(content) {
            return content.toString().replace(/__BASE_URL__/g, process.env.BASE_URL || '/');
          },
        },
        {
          from: path.resolve(__dirname, 'questionnaires/'),
          to: path.resolve(__dirname, 'dist/questionnaires/'),
          transform(content) {
            return content.toString().replace(/__BASE_URL__/g, process.env.BASE_URL || '/');
          },
        },
        {
          from: path.resolve(__dirname, 'reset-password/index.html'),
          to: path.resolve(__dirname, 'dist/reset-password/'),
          transform(content) {
            return content.toString().replace(/__BASE_URL__/g, process.env.BASE_URL || '/');
          },
        },
        {
          from: path.resolve(__dirname, 'signup/index.html'),
          to: path.resolve(__dirname, 'dist/signup/'),
          transform(content) {
            return content.toString().replace(/__BASE_URL__/g, process.env.BASE_URL || '/');
          },
        },
      ],
    }),
  ],
  devServer: {
    port: 3000,
    hot: true,
    open: true,
  }
};
