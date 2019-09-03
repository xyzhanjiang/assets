# [Webpack](https://webpack.github.io/)

通过 npm 安装：`npm install --save-dev webpack`

这里有个极简的 webpack.config.js 文件

### 提取 CSS

[mini-css-extract-plugin](https://github.com/webpack-contrib/mini-css-extract-plugin), `npm install --save-dev mini-css-extract-plugin`

``` javascript
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          debug ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader'
        ]
      }
    ]
  }
}
```

### 兼容 IE8

[webpack@4 for IE8](https://github.com/xyzhanjiang/assets/tree/master/js/bundler/webpack/ie8)
