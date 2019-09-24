# 在 Webpack 项目中配置 Babel

使用 [Babel](https://babeljs.io/) 转化 JavaScript 代码，中文网站：[http://babeljs.cn/](http://babeljs.cn/)

和 Webpack 一起使用，需要安装如下模块

``` shell
npm install --save-dev @babel/core @babel/preset-env babel-loader webpack
```

同时在 webpack.config.js 里配置

**webpack.config.js**

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

创建一个 .babelrc 配置文件

**.babelrc**

``` json
{
  "presets": ["@babel/preset-env"]
}
```

即可
