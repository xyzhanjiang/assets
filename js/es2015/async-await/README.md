# 在 Webpack 项目中配置支持 async/await

首先配置 Babel

``` shell
npm install --save-dev @babel/core @babel/preset-env babel-loader
```

**webpack.config.js**

``` javascript
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader'
          }
        ]
      }
    ]
  }
}
```

**.babelrc**

``` json
{
  "presets": ["@babel/preset-env"]
}
```

要支持 async/await，还需要安装 [regenerator-runtime](https://github.com/facebook/regenerator/tree/master/packages/regenerator-runtime) 和 [ES6-Promise](https://github.com/stefanpenner/es6-promise)

执行命令安装

``` shell
npm install --save regenerator-runtime es6-promise
```

在项目中使用

``` javascript
import 'es6-promise/auto'
import regeneratorRuntime from 'regenerator-runtime'

;(async function() {
  var response = await fetch('/api/url')
  console.log(response)
})()
```

经过这一顿操作，最终编译出来的代码可以兼容到 IE 9

Compatibility: IE9+

Dependencies: [regenerator-runtime](https://github.com/facebook/regenerator/tree/master/packages/regenerator-runtime), [ES6-Promise](https://github.com/stefanpenner/es6-promise)
