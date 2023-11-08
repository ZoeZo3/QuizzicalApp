const path = require('path');

module.exports = {
  mode: 'development',
  output: {
    filename: '[name].pack.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            plugins: ['@babel/plugin-transform-object-rest-spread'],
          },
        },
      },
    ],
  },
  entry: {
    index: './index.js',
  },
  watch: true
};
