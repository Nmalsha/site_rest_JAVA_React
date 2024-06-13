const path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  resolve: {
    fallback: {
      // stream: require.resolve("stream-browserify"),
      // crypto: require.resolve("crypto-browserify"),
      // buffer: require.resolve("buffer/"),
      // util: require.resolve("util/"),
      // assert: require.resolve("assert/"),

      stream: false,
      crypto: false,
      buffer: false,
      util: false,
      assert: false,
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
    ],
  },
};
