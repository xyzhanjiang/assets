# Front-end Solutions

工作中需要使用到的一些工具，同类型的工具有不同的替代品，这不是一个囊括所有工具的完整清单

## <a name="TOC">Table of Contents</a>

### HTML

1. [Doctype](#doctype)
1. [Meta](https://github.com/xyzhanjiang/assets/tree/master/html/meta/)
1. [IE Conditional Comments](#conditional-comments)
1. [Compatible With IE 8](https://github.com/xyzhanjiang/assets/tree/master/html/ie8/)

### CSS

1. [CSS Style Guide](#css-style-guide)
1. [Normalize](#normalize)
1. [PostCSS](https://github.com/xyzhanjiang/assets/tree/master/css/postcss/)
1. [Effects](#effects)
1. [Icon](#icon)

### JavaScript

1. [JS Style Guide](#js-style-guide)
1. [Package](#package)
1. [Bundler](#bundler)
1. [ES5](https://github.com/xyzhanjiang/assets/tree/master/js/es5/)
1. [ES2015](#es2015)
1. [HTML Template](#html-template)
1. [Vue](https://github.com/xyzhanjiang/assets/tree/master/js/vue/)
1. [Angular](https://github.com/xyzhanjiang/assets/tree/master/js/angular/)
1. [Router](#router)
1. [Data Visualization](#data-visualization)
1. [Polyfill](#polyfill)
1. [Modules](#modules)
1. [jQuery](https://github.com/xyzhanjiang/assets/tree/master/js/jquery/)
1. [Media](#media)
1. Tools
    * [Async](https://github.com/xyzhanjiang/assets/tree/master/js/async/)
    * [File Upload](https://github.com/xyzhanjiang/assets/tree/master/js/file-upload/)
    * [Http Request](https://github.com/xyzhanjiang/assets/tree/master/js/http-request/)
    * [Modal](https://github.com/xyzhanjiang/assets/tree/master/js/modal/)
    * [Spin](https://github.com/xyzhanjiang/assets/tree/master/js/spin/)
    * [Storage](https://github.com/xyzhanjiang/assets/tree/master/js/storage/)
1. [Code](https://github.com/xyzhanjiang/assets/tree/master/js/code/)

## HTML

### <a name="doctype">HTML5 文档类型声明</a>

``` html
<!DOCTYPE html>
<html lang="zh-CN">
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

## CSS

### <a name="css-style-guide">CSS Style Guide</a>

* [Airbnb CSS / Sass Styleguide](https://github.com/airbnb/css)
* [Idiomatic CSS](https://github.com/necolas/idiomatic-css)
* [Code Guide by @mdo](http://codeguide.co/#css)

### <a name="normalize">Normalize</a>

推荐使用 [normalize.css](https://github.com/necolas/normalize.css) 作为重置样式表，这也是 Bootstrap 内置使用的

### <a name="effects">Effects</a>

* [Animate.css](https://daneden.github.io/animate.css/)
* [Hover.css](http://ianlunn.github.io/Hover/)
* [iHover](http://gudh.github.io/ihover/dist/index.html)

#### Timing Function

抖动效果的贝塞尔曲线：`cubic-bezier(0.68, -0.55, 0.27, 1.55)`

### <a name="icon">Icon</a>

* [Font-Awesome](http://fontawesome.io/)

## JavaScript

### <a name="js-style-guide">JS Style Guide</a>

* [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)
* [JavaScript Standard Style](https://github.com/feross/standard)

### <a name="package">Package</a>

[npm](https://www.npmjs.com/)

[Node](https://nodejs.org/en/) 安装完成后 npm 也安装好了

如果使用 npm 安装模块因为网络原因安装不成功，可以使用 [cnpm](https://npm.taobao.org)，例如

``` shell
npm install gulp-cli --global --registry=https://registry.npm.taobao.org
```

### <a name="bundler">Bundler</a>

* [Webpack](https://github.com/xyzhanjiang/assets/tree/master/js/bundler/webpack/)

### <a name="es2015">ES2015</a>

* [Babel](https://github.com/xyzhanjiang/assets/tree/master/js/es2015/babel/)
* [Async Await](https://github.com/xyzhanjiang/assets/tree/master/js/es2015/async-await/)

深入学习 ES2015

* [es6features](https://github.com/lukehoban/es6features), ECMAScript 6 Features
* [es6-cheatsheet](https://github.com/DrkSephy/es6-cheatsheet)，这是一个 ES2015(ES6) 的 Cheatsheet，其中包括提示、小技巧、最佳实践和一些代码片段，帮助你 完成日复一日的开发工作。
* [ES6 Overview in 350 Bullet Points](https://github.com/bevacqua/es6)

### <a name="html-template">HTML Template</a>

* [Handlebars](https://github.com/xyzhanjiang/assets/tree/master/js/template/handlebars/)

### <a name="router">Router</a>

客户端路由如果使用 hash 模式，将 `#` 替换为 `#!`，谷歌的爬虫才会索引这个页面的内容

* [Navigo](https://github.com/krasimir/navigo)
* [director](https://github.com/flatiron/director)

### <a name="data-visualization">Data Visualization</a>

* [Chart.js](http://www.chartjs.org/), [https://github.com/chartjs/Chart.js](https://github.com/chartjs/Chart.js)

### <a name="polyfill">Polyfill</a>

常用 polyfill

* [JSON2.js](https://github.com/douglascrockford/JSON-js/blob/master/json2.js)
* [es5-shim](https://github.com/es-shims/es5-shim)
* [ExplorerCanvas](https://github.com/arv/ExplorerCanvas) - Canvas for IE8 and older.
* [ES6-Promise](https://github.com/stefanpenner/es6-promise)
* [fetch](https://github.com/github/fetch)

### <a name="media">Media</a>

* [pdf.js](https://github.com/xyzhanjiang/assets/tree/master/js/media/pdf/)
