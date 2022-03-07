const mode = process.env.NODE_ENV || "development";
const { getRequireSource } = require("@babel/preset-env/lib/polyfills/utils");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  // mode defaults to 'production' if not set
  mode: mode,

  // entry not required if using `src/index.js` default
  // output not required if using `dist/main.js` default

  plugins: [new MiniCssExtractPlugin()],

  output: {
    assetModuleFilename: "images/[hash][ext][query]",
  },
  module: {
    rules: [
      {
        test: /\.(png|jpg)$/i,
        // use: { loader: "url-loader" },
        type: "asset",
      },
      {
        test: /\.(s[ac]|c)ss$/i,
        use: [
          { loader: MiniCssExtractPlugin.loader, options: { publicPath: "" } },
          // MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          // without additional settings, this will reference .babelrc
          loader: "babel-loader",
        },
      },
    ],
  },

  devtool: "source-map",

  // required if using webpack-dev-server
  devServer: {
    static: "./dist",
  },
};
