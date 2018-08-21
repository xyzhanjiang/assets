# unfetch

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
