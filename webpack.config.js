require('dotenv').config();

const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: process.env.APP_ENV,
  entry: [
    './src/interfaces/http/resources/js/app.js',
    './src/interfaces/http/resources/sass/app.scss',
  ],
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'js/app.bundle.js',
    publicPath: './public',
  },
  module: {
    rules: [
      {
        test: /\.s?[ac]ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader', options: { url: false, sourceMap: true } },
          { loader: 'sass-loader', options: { sourceMap: true } },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/app.bundle.css',
    }),
  ],
};
