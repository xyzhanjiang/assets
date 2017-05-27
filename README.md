# Front-end Solutions

工作中需要使用到的一些工具，同类型的工具有不同的替代品，这不是一个完整清单，不会包含所有的项目

## <a name="TOC">内容列表</a>

1. [代码风格指南](#style-guide)
1. [包管理工具](#package)
1. [构建工具](#workflow)
1. [打包工具](#bundler)
1. [ES6](#es6)
1. [Http](#http)
1. [Vue](#vue)
1. [数据可视化](#data-visualization)
1. [Polyfill](#polyfill)
1. [模块](#modules)

## JavaScript

### <a name="style-guide">代码风格指南</a>

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

### <a name="es6">ES6</a>

使用 [Babel](https://babeljs.io/) 转化 JavaScript 代码，中文网站：[http://babeljs.cn/](http://babeljs.cn/)

深入学习 ES6

* [es6features](https://github.com/lukehoban/es6features), ECMAScript 6 Features
* [es6-cheatsheet](https://github.com/DrkSephy/es6-cheatsheet)，这是一个 ES2015(ES6) 的 Cheatsheet，其中包括提示、小技巧、最佳实践和一些代码片段，帮助你 完成日复一日的开发工作。
* [ES6 Overview in 350 Bullet Points](https://github.com/bevacqua/es6)

### <a name="http">Http</a>

[unfetch](https://github.com/developit/unfetch)

``` shell
$ npm install --save unfetch
```

基本用法，POST 请求，数据格式为 JSON 字符串并带 cookie：

``` javascript
import fetch from 'unfetch'

fetch('/url', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  credentials: 'same-origin',
  body: JSON.stringify({
    username: 'Tom',
  })
}).then( r => r.json()).then((res) => {
  //
})
```

### <a name="vue">Vue</a>

[Vue.js](http://vuejs.org/)，中文网站：[https://cn.vuejs.org/](https://cn.vuejs.org/)

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
* [fetch](https://github.com/github/fetch)

### <a name="modules">一些常用无依赖模块</a>

* [JavaScript Cookie](https://github.com/js-cookie/js-cookie)，用于读写 cookie
* [Store.js](https://github.com/marcuswestin/store.js)，使用本地储存保存数据
* [spin.js](http://spin.js.org/)，加载动画效果
