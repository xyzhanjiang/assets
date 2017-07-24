# Front-end Solutions

工作中需要使用到的一些工具，同类型的工具有不同的替代品，这不是一个囊括所有工具的完整清单

## <a name="TOC">内容列表</a>

1. HTML
    1. [Doctype](#doctype)
    1. [Meta](#meta)
    1. [IE 条件注释](#conditional-comments)
1. CSS
    1. [代码风格指南](#css-style-guide)
    1. [预处理器](#pre-processor)
    1. [效果](#effects)
    1. [Icon Fonts](#icon-fonts)
1. JavaScript
    1. [代码风格指南](#js-style-guide)
    1. [包管理工具](#package)
    1. [构建工具](#workflow)
    1. [打包工具](#bundler)
    1. [ES6](#es6)
    1. [Http](#http)
    1. [Vue](#vue)
    1. [数据可视化](#data-visualization)
    1. [Polyfill](#polyfill)
    1. [模块](#modules)
    1. [jQuery 插件](#jquery-plugins)
    1. [正则](#reg)

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

### <a name="conditional-comments">IE 条件注释</a>

``` html
<!--[if (lt IE 9) & (!IEMobile)]>
<script src="js/respond.min.js"></script>
<![endif]-->
```

IE 中的条件注释(Conditional comments)对 IE 的版本和 IE 非 IE 有优秀的区分能力，是 WEB 设计中常用的 hack 方法。推荐使用。

lt = 小于，lte = 小于等于，gt = 大于，gte = 大于等于

Internet Explorer 10 浏览器删除了对条件注释的支持，参考 [不再支持条件注释](https://msdn.microsoft.com/zh-cn/library/ie/hh801214.aspx)

## CSS

### <a name="css-style-guide">代码风格指南</a>

* [Airbnb CSS / Sass Styleguide](https://github.com/airbnb/css)
* [Idiomatic CSS](https://github.com/necolas/idiomatic-css)
* [Code Guide by @mdo](http://codeguide.co/#css)

### <a name="pre-processor">预处理器</a>

1. [Sass](https://github.com/sass/sass)

1. [Less](https://github.com/less/less.js)

### <a name="effects">效果</a>

* [Animate.css](https://daneden.github.io/animate.css/)
* [Hover.css](http://ianlunn.github.io/Hover/)
* [iHover](http://gudh.github.io/ihover/dist/index.html)

### <a name="icon-fonts">Icon Fonts</a>

[Font-Awesome](http://fontawesome.io/)

## JavaScript

### <a name="js-style-guide">代码风格指南</a>

都看看，没有什么不好，然后汲取各家所长，形成自己的风格

* [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)
* [JavaScript Standard Style](https://github.com/feross/standard)

### <a name="package">包管理工具</a>

[npm](https://www.npmjs.com/)

[Node](https://nodejs.org/en/) 安装完成后 npm 也安装好了

如果使用 npm 安装模块因为网络原因安装不成功，可以使用 [cnpm](https://npm.taobao.org)，例如

``` shell
$ npm install gulp-cli --global --registry=https://registry.npm.taobao.org
```

### <a name="workflow">构建工具</a>

[Gulp](http://gulpjs.com/)

### <a name="bundler">打包工具</a>

[Webpack](https://webpack.github.io/)

通过 npm 安装：

``` shell
$ npm install --save-dev webpack
```

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

### <a name="es6">ES6</a>

使用 [Babel](https://babeljs.io/) 转化 JavaScript 代码，中文网站：[http://babeljs.cn/](http://babeljs.cn/)

深入学习 ES6

* [es6features](https://github.com/lukehoban/es6features), ECMAScript 6 Features
* [es6-cheatsheet](https://github.com/DrkSephy/es6-cheatsheet)，这是一个 ES2015(ES6) 的 Cheatsheet，其中包括提示、小技巧、最佳实践和一些代码片段，帮助你 完成日复一日的开发工作。
* [ES6 Overview in 350 Bullet Points](https://github.com/bevacqua/es6)

### <a name="http">Http</a>

1. [axios](https://github.com/mzabriskie/axios)

    使用 npm 安装：

    ``` shell
    $ npm install --save axios
    ```

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

    使用这种格式需要转化请求的数据，在客户端可以使用 `URLSearchParams` API：

    ``` javascript
    var params = new URLSearchParams()
    params.append('param1', 'value1')
    params.append('param2', 'value2')
    axios.post('/url', params)
    ```

1. [unfetch](https://github.com/developit/unfetch), 一个非常小的 fetch polyfill

    使用 npm 安装：

    ``` shell
    $ npm install --save unfetch
    ```

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

### <a name="vue">Vue</a>

[Vue.js](http://vuejs.org/)，中文网站：[https://cn.vuejs.org/](https://cn.vuejs.org/)

通过 npm 安装：

``` shell
$ npm install --save vue
```

* 脚手架 [vue-cli](https://github.com/vuejs/vue-cli)
* 状态管理 [Vuex](https://vuex.vuejs.org/)
* 路由 [vue-router](https://github.com/vuejs/vue-router)

### <a name="data-visualization">数据可视化</a>

[Chart.js](http://www.chartjs.org/), [https://github.com/chartjs/Chart.js](https://github.com/chartjs/Chart.js)

### <a name="polyfill">一些常用 Polyfill</a>

* [JSON2.js](https://github.com/douglascrockford/JSON-js/blob/master/json2.js)
* [es5-shim](https://github.com/es-shims/es5-shim)
* [ExplorerCanvas](https://github.com/arv/ExplorerCanvas) - Canvas for IE8 and older.
* [ES6-Promise](https://github.com/stefanpenner/es6-promise)

    通过 npm 安装模块：`$ npm install es6-promise --save`

    自动打补丁：

    ``` javascript
    import 'es6-promise/auto'
    ```

* [fetch](https://github.com/github/fetch)
    
    安装模块：`$ npm install whatwg-fetch --save`，需要注意模块的名字

### <a name="modules">一些常用无依赖模块</a>

* [JavaScript Cookie](https://github.com/js-cookie/js-cookie)，用于读写 cookie

    安装模块：`$ npm install js-cookie --save`

    常用使用方法：

    ``` javascript
    import Cookies from 'js-cookie'

    Cookies.set('name', 'value')
    Cookies.get('name')
    Cookies.remove('name')
    ```

* [Store.js](https://github.com/marcuswestin/store.js)，使用本地储存保存数据

    安装模块：`$ npm install store --save`

* [spin.js](http://spin.js.org/)，加载动画效果

    安装模块：`$ npm install spin.js --save`

    对于支持 CSS 动画的浏览器可以使用 [SpinKit](https://github.com/tobiasahlin/SpinKit)

### <a name="jquery-plugins">常用 jQuery 插件</a>

* [jQuery Validation Plugin](https://github.com/jquery-validation/jquery-validation)

### <a name="reg">常用正则</a>

* 驼峰转连字符

    ``` javascript
    'userName'.replace(/([A-Z])/g, '-$1').toLowerCase() // user-name
    ```

