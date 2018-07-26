const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: "./js/post_script.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "js/bundle.js" 
    },
    devServer: {
        contentBase: './dist'
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './index.html'
        })
    ],
    devtool: 'source-map',
    mode: "development",
    module: {
        rules: [
          {
            test: /\.css$/,
            use: [
              { loader: "style-loader" },
              { loader: "css-loader" }
            ]
          },
          {
            test: /\.(png|jpg|jpe?g|gif)$/,
            use: [
              {
                loader: 'file-loader',
                options: {}  
              }
            ]
          },
          
        ]
      }

 
}