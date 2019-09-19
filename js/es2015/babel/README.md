# Babel

使用 [Babel](https://babeljs.io/) 转化 JavaScript 代码，中文网站：[http://babeljs.cn/](http://babeljs.cn/)

单独使用，需要安装 babel-cli：`npm install --save-dev babel-cli babel-preset-env`

和 webpack 一起使用，通过 npm 安装：`npm install --save-dev @babel/core @babel/preset-env babel-loader webpack`

在 webpack.config.js 里配置：

``` javascript
module: {
  rules: [
    {
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader'
      }
    }
  ]
}
```

创建一个 .babelrc 配置文件：

``` json
{
  "presets": ["@babel/preset-env"]
}
```