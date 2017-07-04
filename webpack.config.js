const webpack = require("webpack");
const CleanWebpackPlugin = require("clean-webpack-plugin"); //刪除舊的
const UglifyJsPlugin = require("uglifyjs-webpack-plugin"); //壓縮
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  devtool: "cheap-module-eval-source-map",
  entry: {
    main: __dirname + "/app/main.js",
    vendor: "moment"
  },
  output: {
    path: __dirname + "/public",
    filename: "[name].[id].js",
    publicPath: "/public/"
  },
  devServer: {
    inline: true,
    hot: true
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        query: {
          presets: ["es2015", "stage-0"]
        }
      },
      {
        test: /\.less$/,
        exclude: /node_modules/,
        loader: "style-loader!css-loader!less-loader"
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(["public/main.*.js", "public/manifest.*.js"], {
      root: __dirname,
      verbose: true,
      dry: false
    }),
    new webpack.optimize.CommonsChunkPlugin({
      names: ["vendor", "manifest"]
    }),
    new HtmlWebpackPlugin({
      title: "demo",
      template: "index.html"
    }),
    new UglifyJsPlugin({
      beautify: true,
      exclude: ["/node_modules/"],
      compress: {
        warnings: false
      },
      output: {
        comments: false
      }
    })
  ]
};
