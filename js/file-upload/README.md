# File Upload

文件上传

## jQuery File Upload Plugin

基于 jQuery 使用 [blueimp/jQuery-File-Upload](https://github.com/blueimp/jQuery-File-Upload) 插件，功能齐全，扩展丰富，installation via npm: `npm install --save blueimp-file-upload`

示例

``` javascript
require('blueimp-file-upload/js/jquery.iframe-transport') // 不支持 XHR 上传的需要引用
require('blueimp-file-upload')

$('input[type="file"]').fileupload(options)
```

Compatibility: IE6+

Dependencies: jQuery 1.6+, jQuery UI widget factory, jQuery Iframe Transport plugin

## XMLHttpRequest Level 2

利用 XMLHttpRequest Level 2 和 FormData API 结合 rxjs/ajax 实现异步上传

``` jsvascript
import * as rxjs from 'rxjs'
import { concatMap, filter } from 'rxjs/operators'
import { ajax } from 'rxjs/ajax'

rxjs.fromEvent(document.querySelector('input[type="file"]'), 'change')
  .pipe(filter(e => e.target.value != ''), concatMap((e) => {
    let formData = new FormData()
    formData.append('file', e.target.files[0])
    return ajax.post('/upload/url/', formData) // 不要设置 Content-Type
  }))
  .subscribe(({response}) => {
    console.log(response)
  })
```

使用 fetch api, axios 或者原生 XMLHttpRequest 对象同理

Compatibility: IE10+ see [caniuse](https://caniuse.com/#feat=xhr2)

Dependencies: none
