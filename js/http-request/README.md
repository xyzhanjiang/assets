# Http Request

发送 http 请求

## jQuery.ajax

jQuery 内置的 ajax 方法，使用 jQuery 的时候直接使用即可

全局设置响应类型为 `json`

``` javascript
$.ajaxSetup({
  dataType: 'json'
})
```

从 cookie 里获取 `token` 值并添加到请求头

``` javascript
const Cookies = require('js-cookie')

var token = Cookies.get('_csrf')

$(document).ajaxSend((e, xhr, options) => {
  xhr.setRequestHeader('X-CSRF-TOKEN', token)
})
```

合并 ajax 调用

``` javascript
$.when($.ajax({
  url: '/1'
}), $.ajax({
  url: '/2'
})).done((res1, res2) => {
  // Do something
})
```

## axios

[axios](https://github.com/axios/axios), installation via npm: `npm install --save axios`，axios 可以兼容到 IE8

需要 ES6 Promise 支持，如果环境不支持 ES6 Promise 需要使用 [ES6-Promise](https://github.com/stefanpenner/es6-promise)

基本简单用法

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

全局设置请求类型为 `application/x-www-form-urlencoded`

``` javascript
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8'
```

提交这种格式需要转化为查询字符串 `param1=value1&param2=value2` 格式，在客户端可以使用 `URLSearchParams` API

``` javascript
var params = new URLSearchParams()
params.append('param1', 'value1')
params.append('param2', 'value2')
axios.post('/url', params)
```

该 API 的 polyfill 可以在这里找到 [url-search-params](https://github.com/WebReflection/url-search-params) 或者也可以使用 [query-string](https://github.com/sindresorhus/query-string) 这个模块

## fetch

``` javascript
fetch('/example.html')
  .then((response) => {
    console.log(response)
  })
```

[fetch polyfill](https://github.com/github/fetch), installation via npm: `npm install --save whatwg-fetch`

## unfetch

[unfetch](https://github.com/developit/unfetch), installation via npm: `npm install --save unfetch`

这是一个精简版的插件，需要 ES6 Promise 支持，如果环境不支持 ES6 Promise 需要使用 [ES6-Promise](https://github.com/stefanpenner/es6-promise)

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

上传文件

``` javascript
var input = document.querySelector('input[type="file"]')
var data = new FormData()
data.append('file', input.files[0])

fetch('/url', {
  method: 'POST',
  body: data
})
```

## XMLHttpRequest

使用原生撸

``` javascript
var xhr = new XMLHttpRequest()
xhr.open('GET', '/url', true)
xhr.onreadystatechange = function() {
  if (xhr.readyState === 4 && xhr.status === 200) {
    console.log(xhr.responseText)
  }
}
xhr.send()
```
