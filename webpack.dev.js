const merge = require('webpack-merge');
const base = require('./webpack.config.js');

module.exports = merge(base, {
  devtool: 'source-map',
  mode: 'development',
  devServer: {
    port: 3000,
    host: '0.0.0.0',
    open: true
  },
});