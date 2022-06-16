import path from "path";
import { fileURLToPath } from "url";

export default {
  entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../dist'),
  }
}
