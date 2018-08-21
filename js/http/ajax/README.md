# jQuery.ajax

全局设置响应类型为 `json`：

``` javascript
$.ajaxSetup({
  dataType: 'json'
})
```

从 cookie 里获取 `token` 值并添加到请求头：

``` javascript
const Cookies = require('js-cookie')

var token = Cookies.get('_csrf')

$(document).ajaxSend((e, xhr, options) => {
  xhr.setRequestHeader('X-CSRF-TOKEN', token)
})
```

合并 ajax 调用：

``` javascript
$.when($.ajax({
  url: '/1'
}), $.ajax({
  url: '/2'
})).done((res1, res2) => {
  // Do something
})
```
