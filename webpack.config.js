const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HandlebarsPlugin = require("handlebars-webpack-plugin");

module.exports = {
  entry: {
    'static/js/core': './src/widget/app/core.js',
    'static/js/form': './src/widget/app/form.js',
    'static/js/calendar': './src/widget/app/calendar.js',
    'demo/js/demo': './src/demo/assets/js/index.js',

    'static/css/form': './src/widget/views/Form/style.scss',
    'static/css/calendar': './src/widget/views/Calendar/style.scss',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    chunkFilename: "[name].js",
    publicPath: "/"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: [
          /node_modules/
        ]
      },
      {
        test: /\.hbs/,
        loader: 'handlebars-loader',
        exclude: /(node_modules|bower_components)/
      },
      {
        test: /\.(sass|scss)$/,
        include: path.resolve(__dirname, "src"),
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {}
          },
          {
            loader: "css-loader",
            options: {
              sourceMap: true,
              url: false
            }
          },
          {
            loader: require.resolve('postcss-loader'),
            options: {
              ident: 'postcss',
              plugins: () => [
                require('postcss-flexbugs-fixes'),
                require('autoprefixer')({
                  flexbox: 'no-2009',
                }),
              ],
            },
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true
            }
          }
        ]
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/demo/index.html'),
      filename: 'index.html',
      chunks: ['demo']
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/widget/views/Form/index.html'),
      filename: 'form.html',
      chunks: ['form']
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/widget/views/Calendar/index.html'),
      filename: 'calendar.html',
      chunks: ['calendar']
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, 'src/widget/assets/fonts/'),
        to: path.resolve(__dirname, 'dist/static/fonts'),
      },
    ]),
    new MiniCssExtractPlugin({
      filename: "[name].css"
    }),
  ],
};