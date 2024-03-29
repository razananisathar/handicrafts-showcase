const path = require('path');
const { HotModuleReplacementPlugin } = require('webpack');
const HtmlWepackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const loader = require('sass-loader');

console.log(process.env.NODE_ENV);

module.exports = {
  entry: {
    main: path.resolve(__dirname, './client/index.js'),
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].bundle.js',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.scss'],
  },
  mode: process.env.NODE_ENV,
  devServer: {
    publicPath: '/',
    historyApiFallback: true,
    port: 8080,
    hot: true,
    open: true,
    inline: true,
    proxy: {
      '/': {
        target: 'http://localhost:3000/',
        secure: false,
      },
      // '/images/**': {
      //   target: 'http://localhost:3000/',
      //   secure: false,
      //   changeOrigin: true,
      // },
    },
  },
  plugins: [
    new HtmlWepackPlugin({
      template: 'index.html',
      filename: 'index.html',
    }),
    new HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/i,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        // CSS, PostCSS and Sass
        test: /\.(scss|css)$/,
        exclude: /node_modules/,
        // removed style-loader, not required in production.
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
        type: 'asset/resource',
      },
      {
        // Fonts and SVGs
        test: /\.(woff(2)?|eot|ttf|otf|svg)$/,
        type: 'asset/inline',
      },
    ],
  },
};
