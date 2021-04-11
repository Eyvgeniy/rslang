const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CheckerPlugin } = require("awesome-typescript-loader");
const getCSSModuleLocalIdent = require("react-dev-utils/getCSSModuleLocalIdent");

module.exports = {
  entry: {
    index: './src/index.tsx',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './template.html',
    }),
    new CheckerPlugin(),
  ],
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.module\.s[ac]ss$/i,
        exclude: /node_modules/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              modules: {
                getLocalIdent: getCSSModuleLocalIdent,
              },
              sourceMap: true,
            },
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },
};
