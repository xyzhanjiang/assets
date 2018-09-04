# I Love IE 8

项目兼容 IE 8 需要做的一些牺牲

## html5shiv

HTML5 新增加的元素在 IE 8 不能被识别，不能应用样式，需要添加[html5shiv](https://github.com/aFarkas/html5shiv)，其实现原理是通过 `document.createElement(elementName)` 创建特定元素之后即可为该元素设置样式。

## Respond

[respond.js](https://github.com/scottjehl/Respond) 用以支持 CSS3 媒体查询

``` html
<!--[if (lt IE 9) & (!IEMobile)]>
<script src="js/respond.min.js"></script>
<![endif]-->
```

respond.js 需要在样式表之后加载，如果条件不允许，比如样式表是后加载的，则可以等样式表加载完成之后再手动执行一次 respond.js

``` javascript
if (window.respond && !window.respond.mediaQueriesSupported) window.respond.update()
```

## ECMAScript5

[es5-shim](https://github.com/es-shims/es5-shim) 用以支持部分 es5 api，这里包含两个文件，es5-shim.js 和 es5-sham.js，shim 文件里面包含可以被完美模拟的 api，而 sham 文件里面则包含部分不能被完美模拟的 api，这些 api 并不保证和原生 api 效果一样，需要酌情使用。

## ECMAScript6

[es6-shim](https://github.com/paulmillr/es6-shim) 用以支持部分 es6 api。

一些单独的 polyfill

* [ES6-Promise](https://github.com/stefanpenner/es6-promise)

## Polyfill

其他：

* [ExplorerCanvas](https://github.com/arv/ExplorerCanvas) - Canvas for IE8 and older.
* [fetch](https://github.com/github/fetch)
* [background-size-polyfill](https://github.com/louisremi/background-size-polyfill)

## last-child

IE 8 不支持 `:last-child` 选择器，但是支持 `:first-child` 选择器，某些情况下可以使用 `:first-child` 替代 `:last-child`：

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
  border-bottom: none;
}
```

## Input

只有 `height` 的输入框文字并不会自动垂直居中，需要指定 `line-height`

``` css
input {
	height: 30px;
	line-height: 30px;
}
```
