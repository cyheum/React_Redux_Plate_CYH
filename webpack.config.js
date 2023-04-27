const path = require("path");
const webpack = require("webpack");
// const dotenv = require('dotenv');
// const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ErrorOverlayPlugin = require("error-overlay-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const isDevelopment = process.env.NODE_ENV !== "production";
// const envPath = `./.env.${isDevelopment ? 'development' : 'production'}`;

// dotenv.config({
//   path: envPath,
// });

const config = {
  name: "AD_Popcon_1", // 설정 이름
  mode: isDevelopment ? "development" : "production", // production, development // 설정 모드
  devtool: "eval",
  entry: {
    app: "./src/index.tsx",
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@svg": path.resolve(__dirname, "public/svgs/index"),
      "@images": path.resolve(__dirname, "public/images/index"),
    },
  },
  module: {
    rules: [
      {
        // 리액트 바벨 설정
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[path][name].[ext]",
            },
          },
        ],
      },
      {
        test: /\.svg$/,
        use: ["@svgr/webpack"],
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    // new Dotenv({
    //   path: envPath,
    // }),
    new CleanWebpackPlugin(),
    new ErrorOverlayPlugin(),
    new HtmlWebpackPlugin({
      template: "./public/index.html", // 템플릿 설정
      minify: true, // 압축 설정
    }),
    new webpack.ProvidePlugin({
      // 리액트 자동 로드
      React: "react",
    }),
  ],
  output: {
    publicPath: "/",
    path: path.join(__dirname, "/dist"),
    filename: "bundle.[chunkhash].js",
  },
  devServer: {
    // 개발 서버 설정
    static: "./public",
    port: 3000,
    hot: true, // 핫 모듈 교체(HMR) 활성화
    compress: true,
    open: true,
    historyApiFallback: true,
  },
};

if (isDevelopment && config.plugins) {
  config.plugins.push(new webpack.HotModuleReplacementPlugin());
}

module.exports = config;
