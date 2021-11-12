const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const dotenv = require('dotenv')

module.exports = {
  entry: './src/App.tsx',
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve('dist'),
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)?$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      {
        test: /\.s(a|c)ss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
    ],
  },
  devServer: {
    open: true,
    port: 8000,
    historyApiFallback: true,
  },
  plugins: [
    new webpack.DefinePlugin({
      // With dotenv (values must be stringified)
      ...Object.entries(dotenv.config().parsed).reduce(
        (acc, curr) => ({ ...acc, [`${curr[0]}`]: JSON.stringify(curr[1]) }),
        {}
      ),
    }),
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      filename: 'index.html',
      inject: 'body',
    }),
  ],
}
