const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  devServer: {
    contentBase: path.resolve(__dirname, "./src"),
    historyApiFallback: true,
  },
  entry: {
    popup: path.resolve(__dirname, "./src/entry/index-popup.js"),
    options: path.resolve(__dirname, "./src/entry/index-options.js"),

    // ONLY REQUIRED WHILE TESTING INDIVIDUAL PAGE ON LOCALHOST

    // news: path.resolve(__dirname, "./src/entry/index-news.js"),
    // blogs: path.resolve(__dirname, "./src/entry/index-blogs.js"),
    // todo: path.resolve(__dirname, "./src/entry/index-todo.js"),
    // contest: path.resolve(__dirname, "./src/entry/index-contest.js"),
    // info: path.resolve(__dirname, "./src/entry/index-info.js"),
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
    // publicPath: "/dist",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                "@babel/preset-env",
                "@babel/preset-react",
                {
                  plugins: ["@babel/plugin-proposal-class-properties"],
                },
              ],
            },
          },
        ],
      },
      {
        test: /\.html$/,
        use: ["html-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "popup.html",
      template: "src/html/popup.html",
      chunks: ["popup"],
    }),
    new HtmlWebpackPlugin({
      filename: "options.html",
      template: "src/html/options.html",
      chunks: ["options"],
    }),

    // ONLY REQUIRED WHILE TESTING INDIVIDUAL PAGE ON LOCALHOST

    // new HtmlWebpackPlugin({
    //   filename: "info.html",
    //   template: "src/html/info.html",
    //   chunks: ["info"],
    // }),
    // new HtmlWebpackPlugin({
    //   filename: "news.html",
    //   template: "src/html/news.html",
    //   chunks: ["news"],
    // }),
    // new HtmlWebpackPlugin({
    //   filename: "blogs.html",
    //   template: "src/html/blogs.html",
    //   chunks: ["blogs"],
    // }),
    // new HtmlWebpackPlugin({
    //   filename: "todo.html",
    //   template: "src/html/todo.html",
    //   chunks: ["todo"],
    // }),
    // new HtmlWebpackPlugin({
    //   filename: "contest.html",
    //   template: "src/html/contest.html",
    //   chunks: ["contest"],
    // }),

    new CopyWebpackPlugin({
      patterns: [
        { from: "src/manifest.json", to: "[name].[ext]" },
        { from: "src/background.js", to: "[name].[ext]" },
        { from: "src/inject_script.js", to: "[name].[ext]" },
        { from: "src/*.png", to: "[name].[ext]" },
      ],
    }),
    new CleanWebpackPlugin(),
  ],
};