const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './client/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'), 
    filename: 'bundle.js',
  },
  mode: process.env.NODE_ENV,

  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '/client/index.html')
    }),
    new MiniCssExtractPlugin({ filename: 'styles.css' }),
  ],

  devServer: {
    static: {
      directory: path.join(__dirname, '/dist'),
      publicPath: '/',
    },
    proxy: [
      {
        context: ['/api'],
        target: 'http://localhost:3000',
      },
    ],
    compress: true,     
    port: 8080,
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', { targets: 'defaults' }],
              ['@babel/preset-react'],
            ],
            plugins: [
              '@babel/plugin-transform-react-jsx',
              '@babel/plugin-syntax-jsx',
            ],
          },
        },
      },
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
        ],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
        type: 'asset',
      },
    ],
  },
};
