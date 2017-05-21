var path = require('path');

module.exports = {
  entry: './client/app/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'client/dist'),
    test: /\.css$/,
    loaders: [
      'style-loader',
      'css-loader?sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss?sourceMap&sourceComments',
    ],
  },

  devServer: {
    contentBase: path.join(__dirname, "client"),
    compress: true,
    port: 9000
  }
};

