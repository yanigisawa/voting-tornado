import webpack from 'webpack';
import path from 'path';

export default {
  debug: true,
  devtool: 'cheap-eval-source-map', // 'inline-source-map',
  noInfo: false,
  entry: [
    'eventsource-polyfill', // necessary for hot reloading with IE
    'webpack-hot-middleware/client?reload=true', //note that it reloads the page if hot module reloading fails.
    path.resolve(__dirname, 'client', 'index')
  ],
  target: 'web',
  output: {
    path: __dirname + '/dist', // Note: Physical files are only output by the production build task `npm run build`.
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'client')
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  module: {
    // rules: [
    //   {
    //     test: /(\.css)$/, 
    //     use: [
    //       "style-loader",
    //       {
    //         loader: "css-loader",
    //         options: {
    //           modules: true,
    //           sourceMap: true,
    //           importLoaders: 1,
    //           localIdentName: "[name]--[local]--[hash:base64:8]"
    //         }
    //       },
    //       "postcss-loader"          
    //     ]
    //   }
    // ],
    loaders: [
      {test: /\.js$/, include: path.join(__dirname, 'client'), loaders: ['babel']},
      {test: /\.css$/, loaders: [
        'style-loader', 
        'css-loader',        
        // "css-loader?modules&importLoaders=1&sourceMap=1&localIdentName=[name]--[local]--[hash:base64:8]",
        'postcss-loader'
      ]},
      {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file'},
      {test: /\.(woff|woff2)$/, loader: 'url?prefix=font/&limit=5000'},
      {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream'},
      {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml'}
    ]
  }
};
