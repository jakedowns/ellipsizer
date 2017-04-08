var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: ['./ellipsizer.js'],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: "ellipsizer.bundle.js"
  },
  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: [ 'es2015', 'stage-2' ]
        }
      }
    ]
  },
  plugins: []
}