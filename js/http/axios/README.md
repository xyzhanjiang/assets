# axios

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
