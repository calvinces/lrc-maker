const path = require("path");
const webpack = require("webpack");
const BabiliPlugin = require("babili-webpack-plugin");
const pathToNodeModules = path.resolve(__dirname, "node_modules");
const pathToMousetrap = path.resolve(
  pathToNodeModules,
  "mousetrap/mousetrap.min.js"
);
const pathToGhPages = path.resolve(__dirname, "gh-pages");

module.exports = {
  entry: {
    app: [pathToMousetrap, "./src/js/index.js"]
  },

  output: {
    path: path.resolve(__dirname, "gh-pages/dist"),
    filename: "[name].js"
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ["babel-loader"],
        include: path.resolve(__dirname, "src"),
        exclude: [pathToNodeModules, pathToGhPages]
      }
    ]
  },

  resolve: {
    mainFields: ["jsnext:main", "module", "main"]
  },

  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin(),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: '"production"'
      }
    }),
    new BabiliPlugin()
  ]
};
