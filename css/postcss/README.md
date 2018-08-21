# PostCSS

在 webpack 里和 [postcss-loader](https://github.com/postcss/postcss-loader) 一起使用，通过 npm 安装：

``` shell
npm install --save-dev style-loader css-loader postcss-loader postcss-cssnext cssnano webpack
```

在 webpack.config.js 里配置：

``` javascript
module: {
  rules: [
    {
      test: /\.css$/,
      exclude: /node_modules/,
      use: [{
        loader: 'style-loader'
      }, {
        loader: 'css-loader',
        options: {
          importLoaders: 1
        }
      }, {
        loader: 'postcss-loader'
      }]
    }
  ]
}
```

创建一个 `postcss.config.js` 配置文件：

``` javascript
module.exports = {
  plugins: [
    require('postcss-cssnext'),
    require('cssnano')({
      autoprefixer: false,
      safe: true
    })
  ]
}
```

这里使用了 [postcss-cssnext](https://github.com/MoOx/postcss-cssnext) 和 [cssnano](https://github.com/cssnano/cssnano) 两个插件，由于两个插件都自带 autoprefixer 功能，故 cssnano 设置 autoprefixer 为 `false`