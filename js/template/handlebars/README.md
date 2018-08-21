# [Handlebars](https://github.com/wycats/handlebars.js)

通过 npm 安装：`npm install --save handlebars`

引用：

``` javascript
const Handlebars = require('handlebars')

// or runtime only
const Handlebars = require('handlebars/runtime')
```

注册一个 helper

``` javascript
Handlebars.registerHelper('eq', function (a, b, options) {
  return a === b ? options.fn(this) : options.inverse(this)
})
```

配合 webpack 可以使用 [handlebars-loader](https://github.com/pcardune/handlebars-loader) 直接加载 handlebars 文件，并返回一个渲染函数，省掉了编译模板的过程，通过 npm 安装：

``` shell
npm install --save handlebars-loader
```

in webpack.config.js:

``` javascript
module: {
  rules: [
    {
      test: /\.handlebars$/,
      use: [{
        loader: 'handlebars-loader'
      }]
    }
  ]
}
```

example:

``` javascript
const template = require('./template.handlebars')
var html = template(data)
$('#element').html(html)
```

Object.seal polyfill:

``` javascript
if (!Object.seal) {
  Object.seal = function seal(object) {
    if (Object(object) !== object) {
      throw new TypeError('Object.seal can only be called on Objects.')
    }

    return object
  }
}
```

或者安装 es5-shim：`npm install --save es5-shim`

``` javascript
require('es5-shim/es5-sham')
```

需要注意的是 handlebars-loader 并不会打包图片路径
