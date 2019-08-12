const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
const NodemonPlugin = require('nodemon-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const Visualizer = require('webpack-visualizer-plugin');

const browserConfig = {
  entry: { main: ['./src/client/index.jsx'] },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/dist/'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.s?css$/,
        use: [
          'style-loader',
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader'
          }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin('dist', {}),
    new webpack.DefinePlugin({
      __isBrowser__: 'true'
    }),
    // new Visualizer(),
    new MiniCssExtractPlugin({
      filename: 'style.css'
    })
  ],
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true
      })
    ]
  },
  devtool: 'inline-source-map',
  resolve: {
    extensions: ['.js', '.jsx']
  }
};

const serverConfig = {
  entry: ['./src/server/index.js'],
  target: 'node',
  externals: [nodeExternals()],
  output: {
    path: path.resolve(process.cwd(), 'server'),
    filename: 'server.js',
    publicPath: '/server/'
  },
  module: {
    rules: [
      {
        test: /\.(jsx?)$/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },
  plugins: [
    new NodemonPlugin({
      script: './server/server.js',
      watch: path.resolve('./server')
    }),
    new webpack.DefinePlugin({
      __isBrowser__: 'false'
    })
  ],
  resolve: {
    extensions: ['.js', '.jsx']
  }
};
module.exports = [browserConfig, serverConfig];
