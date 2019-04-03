# Compatible With IE8

兼容 IE8

## html5shiv

HTML5 新增加的元素在 IE8 不能被识别，不能应用样式，需要添加 [html5shiv](https://github.com/aFarkas/html5shiv)，其实现原理是通过 `document.createElement(elementName)` 创建特定元素之后即可为该元素设置样式。

## Respond

[respond.js](https://github.com/scottjehl/Respond) 用以支持 CSS3 媒体查询

``` html
<!--[if (lt IE 9) & (!IEMobile)]>
<script src="js/respond.min.js"></script>
<![endif]-->
```

respond.js 需要在样式表之后加载，在这之后加载的样式表并不会自动处理需要手动执行一次 respond.js

``` javascript
if (window.respond && !window.respond.mediaQueriesSupported) window.respond.update()
```

## ES5

[es5-shim](https://github.com/es-shims/es5-shim) 用以支持部分 es5 api，这里面包含两个文件，es5-shim.js 和 es5-sham.js，shim 文件里面包含可以被完美模拟的 api，而 sham 文件里面则包含部分不能被完美模拟的 api，这些 api 并不保证和原生 api 效果一样，需要酌情使用。

## ES2015 and beyond

[es6-shim](https://github.com/paulmillr/es6-shim) 用以支持部分 es6 api。

引用大全套 polyfill 可能会造成项目中残留部分完全没用使用到的代码，所以这里还有一些可以单独使用的 polyfill

* [ES6-Promise](https://github.com/stefanpenner/es6-promise)
* [object-assign](https://github.com/sindresorhus/object-assign)，这其实是一个 ponyfill

## Polyfill

更多

* [ExplorerCanvas](https://github.com/arv/ExplorerCanvas) - Canvas for IE8 and older.
* [fetch](https://github.com/github/fetch) 需要 Promise
* [background-size-polyfill](https://github.com/louisremi/background-size-polyfill)

## 伪元素

伪元素选择器不支持两个冒号的写法，使用一个冒号

``` css
element:after {
  content: "";
}
```

## last-child

IE8 不支持 `:last-child` 选择器，但是支持 `:first-child` 选择器，某些情况下可以使用 `:first-child` 替代 `:last-child`

``` css
/* before */
ul > li {
  border-bottom: 1px solid #ccc;
}

ul > li:last-child {
  border-bottom: none;
}

/* after */
ul > li {
  border-top: 1px solid #ccc;
}

ul > li:first-child {
  border-top: none;
}
```

## Input

只有 `height` 的输入框文字并不会自动垂直居中，需要同时指定 `line-height`

``` css
input {
  height: 30px;
  line-height: 30px;
}
```

## jQuery

使用 v1.12.4，后续版本不再兼容 IE8

## Webpack

[webpack@4 for IE 8](https://github.com/xyzhanjiang/assets/tree/master/js/bundler/webpack/ie8)
