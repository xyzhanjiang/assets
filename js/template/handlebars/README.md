# 在 Webpack 项目中使用 Handlebars

[Handlebars](https://github.com/wycats/handlebars.js)

从一个模版生成 HTML 大致有这么几步

1. 得到模版字符串

  ``` javascript
  const template = require('./template.html')
  ```

1. 将模版字符串编译成渲染函数

  ``` javascript
  const Handlebars = require('handlebars')
  const fn = Handlebars.compile(template)
  ```

1. 执行渲染函数传入数据生成 HTML，并添加到文档中

  ``` javascript
  const html = fn(data)
  $('#element').html(html)
  ```

由于同一个模版编译出来的渲染函数始终都是一样的，所以可以将编译模板这一步放在构建时就执行，配合 Webpack 可以使用 [handlebars-loader](https://github.com/pcardune/handlebars-loader) 直接加载 handlebars 文件，并返回一个渲染函数，节省了运行时的开销

**webpack.config.js**

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

相对而言少了一个步骤

``` javascript
const fn = require('./template.handlebars')
const html = fn(data)
$('#element').html(html)
```

不过，需要注意的是 handlebars-loader 并不会处理模板中的图片路径之类的，如果需要的话，可以配置一个参数

**webpack.config.js**

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

另外，如果是旧浏览器，可能需要这个 Object.seal polyfill

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

或者在 es5-shim 中已经包含了，如果有引入就不需要再单独写了

``` javascript
require('es5-shim/es5-sham')
```
