import { CleanWebpackPlugin } from "clean-webpack-plugin";
import Dotenv from "dotenv-webpack";
import ESLintPlugin from "eslint-webpack-plugin";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import CopyPlugin from "copy-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import path from "path";
import { Configuration } from "webpack";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default module.exports = (env: Record<string, any>) => {

  const IS_PRODUCTION = env.production;

  let cdnUrl = "";
  if (env.cdnUrl) {
    cdnUrl = env.cdnUrl;
  }

  const config: Configuration = {
    mode: IS_PRODUCTION ? "production" : "development",
    entry: "./src/index.tsx",
    output: {
      path: path.resolve(__dirname, "../build"),
      filename: "[name].[chunkhash].bundle.js",
      publicPath: cdnUrl + "/",
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
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                esModule: false,
              },
            },
            {
              loader: "css-loader",
              options: {
                modules: {
                  localIdentName: "[name]_[local]_[hash:base64:6]",
                },
                sourceMap: !IS_PRODUCTION
              }
            },
            {
              loader: "sass-loader",
              options: {
                sourceMap: !IS_PRODUCTION
              }
            },
          ]
        },
        {
          test: /\.(jpg|png|svg)$/,
          use: {
            loader: "url-loader",
            options: {
              limit: 8000,
              name: "images/[name].[ext]",
              emitFile: false,
              publicPath: cdnUrl
            }
          },
        }
      ],
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js", ".css", ".scss", ".eot", ".svg", ".ttf", ".woff", ".woff2", ".png", ".scss"],
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
          react: {
            test: /[\\/]node_modules[\\/](react|react-dom|react-router-dom)[\\/]/,
            name: "react",
            chunks: "all",
          },
          vendor: {
            name: "vendors",
            test: /[\\/]node_modules[\\/]/,
            chunks: "all",
          },
          components: {
            name: "components",
            test: /[\\/]src[\\/]components[\\/]/,
            chunks: "all",
            minSize: 0,
          },
          services: {
            name: "services",
            test: /[\\/]src[\\/]services[\\/]/,
            chunks: "all",
            minSize: 0,
          },
          routes: {
            name: "routes",
            test: /[\\/]src[\\/]routes[\\/]/,
            chunks: "all",
            minSize: 0,
          },
          core: {
            name: "core",
            test: /[\\/]src[\\/]core[\\/]/,
            chunks: "all",
            minSize: 0,
          },
        }
      }
    },
    plugins: [
      new HtmlWebpackPlugin({
        cdnUrl: cdnUrl,
        template: "public/index.html",
      }),
      new ForkTsCheckerWebpackPlugin({
        async: false,
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
        ]
      }
      ),
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin({
        filename: "[name].[contenthash].css",
        chunkFilename: "[id].css"
      }),
      new Dotenv({
        path: "dev.env.local",
        systemvars: true,
        silent: true
      }),
    ],
  };
  // ...
  return config;
}