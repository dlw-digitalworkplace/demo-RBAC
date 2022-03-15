import Dotenv from "dotenv-webpack";
import ESLintPlugin from "eslint-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import CopyPlugin from "copy-webpack-plugin";
import path from "path";
import { Configuration } from "webpack";

const config: Configuration = {
  mode: "development",
  entry: "./src/index.tsx",
  output: {
    path: path.resolve(__dirname, "../../RBAC-dotnet/RBAC API/wwwroot"),
    filename: "[name].bundle.js",
    publicPath: "/"
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/i,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              "@babel/preset-react",
              "@babel/preset-typescript",
            ],
          },
        },
      },
      {
        test: /\.(scss|css)$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: {
                localIdentName: "[name]_[local]_[hash:base64:6]"
              },
              sourceMap: true,
            }
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.(jpg|png|svg)$/,
        use: {
          loader: "url-loader",
          options: {
            limit: 8000,
            name: "images/[name].[ext]",
            emitFile: false
          }
        },
      }
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".css", ".scss", ".eot", ".svg", ".ttf", ".woff", ".woff2", ".png", ".scss"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "public/index.html",
    }),
    new ESLintPlugin({
      extensions: ["js", "jsx", "ts", "tsx"],
    }),
    new CopyPlugin({
      patterns: [
        {
          from: "src/images",
          to: "images",
          noErrorOnMissing: true
        },
        {
          from: "src/fonts",
          to: "fonts",
          noErrorOnMissing: true
        },
        {
          from: "src/svg-symbols/svg-symbols.svg",
          to: "icons",
          noErrorOnMissing: true
        }
      ]
    }
    ),
    new Dotenv({
      path: "dev.env.local",
      systemvars: true,
      silent: false
    })
  ],
  devtool: "inline-source-map"
};

export default config;