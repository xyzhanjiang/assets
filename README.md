# Front-end Solutions

工作中需要使用到的一些工具，同类型的工具有不同的替代品，这不是一个囊括所有工具的完整清单

## <a name="TOC">Table of Contents</a>

### HTML

1. [Doctype](#doctype)
1. [Meta](#meta)
1. [IE Conditional Comments](#conditional-comments)

### CSS

1. [CSS Style Guide](#css-style-guide)
1. [Normalize](#normalize)
1. [PostCSS](#postcss)
1. [Effects](#effects)
1. [Icon](#icon)

### JavaScript

1. [JS Style Guide](#js-style-guide)
1. [Package](#package)
1. [Workflow](#workflow)
1. [Bundler](#bundler)
1. [ECMAScript5](#es5)
1. [ECMAScript6](#es6)
1. [Http](#http)
1. [HTML Template](#html-template)
1. [Vue](#vue)
1. [Angular](#angular)
1. [Router](#router)
1. [Async](#async)
1. [Data Visualization](#data-visualization)
1. [Polyfill](#polyfill)
1. [Modules](#modules)
1. [jQuery](#jquery)
1. [jQuery Plugins](#jquery-plugins)
1. [Regex](#regex)

## HTML

### <a name="doctype">HTML5 文档类型申明</a>

``` html
<!DOCTYPE html>
```

### <a name="meta">Meta</a>

* 定义文档字符集

    ``` html
    <meta charset="utf-8">
    ```

    通常来说 UTF-8 编码是最好的选择，它包含所有语言中所有字符的通用字符集

* IE 渲染模式

    ``` html
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    ```

    在网站里增加这个 Meta 元素，使 IE 浏览器以最新的模式渲染页面

* 国产双核浏览器渲染模式

    ``` html
    <meta name="renderer" content="webkit">
    ```

    在网站里增加这个 Meta 元素，告诉360浏览器这个网址应该用哪个内核渲染，那么360浏览器就会在读取到这个标签后，立即切换对应的内核。并将这个行为应用于这个二级域名下所有网址

* 响应式布局

    ``` html
    <meta name="viewport" content="width=device-width, initial-scale=1">
    ```

### <a name="conditional-comments">IE Conditional Comments</a>

``` html
<!--[if (lt IE 9) & (!IEMobile)]>
<script src="js/respond.min.js"></script>
<![endif]-->
```

IE 中的条件注释(Conditional comments)对 IE 的版本和 IE 非 IE 有优秀的区分能力，是 WEB 设计中常用的 hack 方法，推荐使用。

lt = 小于，lte = 小于等于，gt = 大于，gte = 大于等于

Internet Explorer 10 浏览器删除了对条件注释的支持，参考 [不再支持条件注释](https://msdn.microsoft.com/zh-cn/library/ie/hh801214.aspx)

另外 respond.js 需要在样式表之后加载，如果条件不允许，可以等样式表加载完成之后手动执行 respond.js

``` javascript
if (window.respond && !window.respond.mediaQueriesSupported) window.respond.update()
```

## CSS

### <a name="css-style-guide">CSS Style Guide</a>

* [Airbnb CSS / Sass Styleguide](https://github.com/airbnb/css)
* [Idiomatic CSS](https://github.com/necolas/idiomatic-css)
* [Code Guide by @mdo](http://codeguide.co/#css)

### <a name="normalize">Normalize</a>

推荐使用 [normalize.css](https://github.com/necolas/normalize.css) 作为重置样式表，这也是 Bootstrap 内置使用的

### <a name="postcss">PostCSS</a>

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

创建一个 `postcss.config.js` 文件：

``` javascript
module.exports = {
  plugins: [
    require('postcss-cssnext'),
    require('cssnano')({
      autoprefixer: false
    })
  ]
}
```

### <a name="effects">Effects</a>

#### [Animate.css](https://daneden.github.io/animate.css/)

通过 npm 安装：`npm install animate.css --save`

为元素添加 `animated` 和对应动画样式的类即可：

``` html
<div class="animated bounce">...</div>
```

为元素添加 `infinite` 类动画将无限循环，其它动画样式可以自行设置。

#### [Hover.css](http://ianlunn.github.io/Hover/)

通过 npm 安装：`npm install hover.css --save`

#### [iHover](http://gudh.github.io/ihover/dist/index.html)

#### Timing Function

抖动效果的贝塞尔曲线：`cubic-bezier(0.68, -0.55, 0.27, 1.55)`

### <a name="icon">Icon</a>

[Font-Awesome](http://fontawesome.io/)

## JavaScript

### <a name="js-style-guide">JS Style Guide</a>

都看看，没有什么不好，然后汲取各家所长，形成自己的风格

* [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)
* [JavaScript Standard Style](https://github.com/feross/standard)

### <a name="package">Package</a>

[npm](https://www.npmjs.com/)

[Node](https://nodejs.org/en/) 安装完成后 npm 也安装好了

如果使用 npm 安装模块因为网络原因安装不成功，可以使用 [cnpm](https://npm.taobao.org)，例如

``` shell
npm install gulp-cli --global --registry=https://registry.npm.taobao.org
```

### <a name="workflow">Workflow</a>

[Gulp](http://gulpjs.com/)

### <a name="bundler">Bundler</a>

[Webpack](https://webpack.github.io/)

通过 npm 安装：`npm install --save-dev webpack`

基础的 webpack.config.js 文件：

``` javascript
var path = require('path')

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
}
```

#### webpack@3 for IE 8

1. 引入模块时使用 `require` 方法(也就是 commonjs)代替 `import` 关键字(es6 module)
1. 使用 `es3ify-webpack-plugin` 插件
    
    Usage:

    ``` shell
    npm install es3ify-webpack-plugin --save-dev
    ```

    webpack.config.js:

    ``` javascript
    var webpack = require('webpack')
    var es3ifyPlugin = require('es3ify-webpack-plugin')
    var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin

    plugins: [
      new es3ifyPlugin(),
      new UglifyJsPlugin({
        compress: {
          properties: false
        }
      })
    ]
    ```

### <a name="es5">ECMAScript5</a>

一些新增 API 可以使用 [es5-shim](https://github.com/es-shims/es5-shim) 来兼容一些老旧浏览器。

通过 npm 安装：`npm install --save es5-shim`

``` javascript
import 'es5-shim'
import 'es5-shim/es5-sham'
```

#### Example

遍历 Object

```
var obj = {
  key1: 'value1',
  key2: 'value2'
}
Object.keys(obj).forEach((key) => console.log(key))
```

### <a name="es6">ECMAScript6</a>

使用 [Babel](https://babeljs.io/) 转化 JavaScript 代码，中文网站：[http://babeljs.cn/](http://babeljs.cn/)

单独使用，需要安装 babel-cli：`npm install --save-dev babel-cli babel-preset-env`

和 webpack 一起使用，通过 npm 安装：`npm install --save-dev babel-loader babel-core babel-preset-env webpack`

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

创建一个 .babelrc 文件：

``` json
{
  "presets": ["env"]
}
```

#### async/await

要支持 async/await 语法，需要安装 [regenerator-runtime](https://github.com/facebook/regenerator/tree/master/packages/regenerator-runtime)，如果环境不支持 ES6 Promise 还需要使用 [ES6-Promise](https://github.com/stefanpenner/es6-promise)

``` shell
npm install --save regenerator-runtime es6-promise
```

在 JavaScript 中引入：

``` javascript
import 'es6-promise/auto'
import regeneratorRuntime from 'regenerator-runtime'
```

在引入这两个模块之后，使用了 async/await 语法的代码经过编译后可以支持到 IE 9

深入学习 ES6

* [es6features](https://github.com/lukehoban/es6features), ECMAScript 6 Features
* [es6-cheatsheet](https://github.com/DrkSephy/es6-cheatsheet)，这是一个 ES2015(ES6) 的 Cheatsheet，其中包括提示、小技巧、最佳实践和一些代码片段，帮助你 完成日复一日的开发工作。
* [ES6 Overview in 350 Bullet Points](https://github.com/bevacqua/es6)

### <a name="http">Http</a>

#### jQuery.ajax

全局设置响应类型为 `json`：

``` javascript
$.ajaxSetup({
  dataType: 'json'
})
```

在请求头里添加 `token`：

``` javascript
import Cookies from 'js-cookie'

var token = Cookies.get('_csrf')

$(document).ajaxSend((e, xhr, options) => {
  xhr.setRequestHeader('X-CSRF-TOKEN', token)
})
```

#### [axios](https://github.com/mzabriskie/axios)

使用 npm 安装：`npm install --save axios`，axios 可以兼容到 IE8

需要 ES6 Promise 支持，如果环境不支持 ES6 Promise 需要使用 [ES6-Promise](https://github.com/stefanpenner/es6-promise)

基本简单用法：

``` javascript
import axios from 'axios'

axios.post('/url', {
  param: 'value'
}).then((res) => {
  // Do more
}).catch((error) => {
  console.log(error)
})
```

全局设置请求类型为 `application/x-www-form-urlencoded`：

``` javascript
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
```

提交这种格式需要转化为查询字符串 `param1=value1&param2=value2` 格式，在客户端可以使用 `URLSearchParams` API：

``` javascript
var params = new URLSearchParams()
params.append('param1', 'value1')
params.append('param2', 'value2')
axios.post('/url', params)
```

该 API 的 polyfill 可以在这里找到 [url-search-params](https://github.com/WebReflection/url-search-params) 或者也可以使用 [query-string](https://github.com/sindresorhus/query-string) 这个模块

#### [unfetch](https://github.com/developit/unfetch), 一个非常小的 fetch polyfill

使用 npm 安装：`npm install --save unfetch`

需要 ES6 Promise 支持，如果环境不支持 ES6 Promise 需要使用 [ES6-Promise](https://github.com/stefanpenner/es6-promise)

基本简单用法，发送 POST 请求，请求类型为 JSON 字符串并带 cookie：

``` javascript
import fetch from 'unfetch'

fetch('/url', {
  method: 'POST', // default GET
  headers: {
    'Content-Type': 'application/json'
  },
  credentials: 'same-origin',
  body: JSON.stringify({
    param: 'value'
  })
}).then((r) => r.json()).then((res) => {
  // Do more
})
```

请求类型为 `application/x-www-form-urlencoded`

``` javascript
fetch('/url', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  credentials: 'same-origin',
  body: 'param1=value1&param2=value2'
})
```

上传文件：

``` javascript
var input = document.querySelector('input[type="file"]')
var data = new FormData()
data.append('file', input.files[0])

fetch('/url', {
  method: 'POST',
  body: data
})
```

### <a name="html-template">HTML Template</a>

[Handlebars](https://github.com/wycats/handlebars.js)

通过 npm 安装：`npm install --save handlebars`

引用：

``` javascript
const Handlebars = require('handlebars')

// or runtime only
const Handlebars = require('handlebars/runtime')
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

### <a name="vue">Vue</a>

[Vue.js](http://vuejs.org/)，中文网站：[https://cn.vuejs.org/](https://cn.vuejs.org/)

通过 npm 安装：`npm install --save vue`

和 webpack 一起使用，使用 [vue-loader](https://github.com/vuejs/vue-loader) 加载 .vue 组件，通过 npm 安装：

``` shell
npm install --save-dev vue-loader vue-template-compiler webpack
```

in webpack.config.js:

``` javascript
module: {
  rules: [
    {
      test: /\.vue$/,
      use: {
        loader: 'vue-loader'
      }
    }
  ]
}
```

`vue-loader@13` update:

``` javascript
// before
const about = require('./about.vue')

// after
const about = require('./about.vue').default
```

[release](https://github.com/vuejs/vue-loader/releases/tag/v13.0.0)

* 脚手架 [vue-cli](https://github.com/vuejs/vue-cli)
* 状态管理 [Vuex](https://vuex.vuejs.org/)
* 路由 [vue-router](https://github.com/vuejs/vue-router)

### <a name="angular">Angular</a>

通过 npm 全局安装 TypeScript：`npm install --g angular-cli typescript`

创建项目并启动：

``` shell
ng new project-name
cd project-name
ng serve
```

创建组件：

``` shell
ng generate component component-name
```

### <a name="router">Router</a>

#### [Navigo](https://github.com/krasimir/navigo)

Installation: `npm install navigo --save`

##### Usage

``` javascript
var router = new Navigo(null, true, '#!')

router
  .on(function() {
    //
  })
  .resolve()
```

#### [director](https://github.com/flatiron/director)

### <a name="async">Async</a>

[Async](https://github.com/caolan/async)

通过 npm 安装：`npm install --save async`

在 JavaScript 中引用：

``` javascript
var async = require('async')
```

个别引用：

``` javascript
var waterfall = require('async/waterfall')
var map = require('async/map')
```

安装 ES2015 模块：`npm install --save async-es`，使用 ES2015 import 语法：

``` javascript
import waterfall from 'async-es/waterfall'
import async from 'async-es'
```

### <a name="data-visualization">Data Visualization</a>

[Chart.js](http://www.chartjs.org/), [https://github.com/chartjs/Chart.js](https://github.com/chartjs/Chart.js)

### <a name="polyfill">Polyfill</a>

* [JSON2.js](https://github.com/douglascrockford/JSON-js/blob/master/json2.js)
* [es5-shim](https://github.com/es-shims/es5-shim)
* [ExplorerCanvas](https://github.com/arv/ExplorerCanvas) - Canvas for IE8 and older.
* [ES6-Promise](https://github.com/stefanpenner/es6-promise)

    installation via npm: `npm install es6-promise --save`，自动打补丁：

    ``` javascript
    import 'es6-promise/auto'
    ```

* [fetch](https://github.com/github/fetch)
    
    安装模块：`npm install whatwg-fetch --save`，需要注意模块的名字

### <a name="modules">Modules</a>

#### [JavaScript Cookie](https://github.com/js-cookie/js-cookie)

    用于读写 cookie，安装模块：`npm install js-cookie --save`，常用使用方法：

    ``` javascript
    import Cookies from 'js-cookie'

    Cookies.set('name', 'value')
    Cookies.get('name')
    Cookies.remove('name')
    ```

#### [Store.js](https://github.com/marcuswestin/store.js)

    使用本地储存保存数据，安装模块：`npm install store --save`，使用方法和 cookie 类似

#### [spin.js](http://spin.js.org/)

    加载动画效果，这玩意儿可以兼容到 IE 6，安装模块：`npm install spin.js@2 --save`，使用方式：

    ``` javascript
    const Spinner = require('spin.js')
    const spin = new Spinner().spin(document.body)
    ```

    最新版(@3)可以兼容到 IE9，使用方式上有一些变化：

    ``` javascript
    import {Spinner} from 'spin.js'
    const spin = new Spinner().spin(document.body)
    ```

    对于支持 CSS 动画的浏览器可以考虑使用 [SpinKit](https://github.com/tobiasahlin/SpinKit)

### <a name="jquery">jQuery</a>

当前最新版本(@3)兼容到 IE 9+，如果需要兼容 IE 6-8 使用 v1.12

### <a name="jquery-plugins">jQuery plugins</a>

#### [jQuery Validation Plugin](https://github.com/jquery-validation/jquery-validation)

Installation via npm: `npm install jquery-validation@1.14.0 --save`

显示特定的错误提示，使用 `showErrors` 方法：

``` javascript
validator.showErrors({
  username: 'message'
})
```

多个字段使用相同的 `name` 属性时，添加 `class` 校验规则：

``` javascript
$.validator.addClassRules('js-input-required', {
  required: true
})
```

使用时：

``` html
<input class="js-input-required" name="username" type="text">
<input class="js-input-required" name="username" type="text">
```

#### [slick](https://github.com/kenwheeler/slick)

Installation via npm: `npm install slick-carousel --save`

example:

``` html
<div data-slick='{"slidesToShow": 4, "slidesToScroll": 4}'>
  <div><h3>1</h3></div>
  <div><h3>2</h3></div>
  <div><h3>3</h3></div>
  <div><h3>4</h3></div>
  <div><h3>5</h3></div>
  <div><h3>6</h3></div>
</div>
```

需要手动调用插件：

``` javascript
$('[data-slick]').slick()
```

#### [jquery-confirm](https://github.com/craftpip/jquery-confirm)

### <a name="regex">Regex</a>

驼峰转连字符

``` javascript
'userName'.replace(/([A-Z])/g, '-$1').toLowerCase() // user-name
```

