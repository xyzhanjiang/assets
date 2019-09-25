# 在 Webpack 项目中使用 Handlebars

[Handlebars](https://github.com/wycats/handlebars.js)

通过 npm 安装：`npm install --save handlebars`

在项目中引用

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

配合 webpack 可以使用 [handlebars-loader](https://github.com/pcardune/handlebars-loader) 直接加载 handlebars 文件，并返回一个渲染函数，将编译模板的过程放到了打包时，节省了运行时的开销，通过 npm 安装：

``` shell
npm install --save handlebars-loader
```

in webpack.config.js

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

不过，需要注意的是 handlebars-loader 并不会处理模板中的图片路径之类的，如果需要的话，可以配置一个参数

in webpack.config.js

``` javascript
module: {
  rules: [
    {
      test: /\.handlebars$/,
      use: [{
        loader: 'handlebars-loader',
        options: {
          inlineRequires: '/images/'
        }
      }]
    }
  ]
}
```

另外，如果可能的话，有时候需要这个 Object.seal polyfill

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

或者 es5-shim：`npm install --save es5-shim` 已经包含了

``` javascript
require('es5-shim/es5-sham')
```
