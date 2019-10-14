# 文件上传

上传文件需要用到文件输入框，如果给文件输入框添加一个 `multiple` 属性则可以一次选择多个文件（不支持的浏览器会自动忽略这个属性）

``` html
<input multiple type="file">
```

点击这个输入框就可以选择文件，选中的文件可以通过输入框的 `files` 属性访问，这会得到一个 FileList，这是一个集合，如果只选择了一个文件，那么集合中的第一个元素就是这个文件

``` javascript
var input = document.querySelector('input[type="file"]')
var file = input.files[0]

console.log(file.name) // 文件名称
console.log(file.size) // 文件大小
console.log(file.type) // 文件类型
```

一般一个输入框上传一个文件就行，要上传多个文件也可以用多个输入框来处理

### 基本上传

提交表单的时候即可将选中的文件一起提交上传到服务器，需要注意的是由于提交的表单中包含文件，所以还要修改一下表单元素的 `enctype` 属性

``` html
<form action="#" enctype="multipart/form-data" method="post">
  <input type="file">
  <button type="submit">Upload</button>
</form>
```

这样上传方式是传统的同步上传，上传的文件如果很大，往往需要等待很久，上传完成后页面还会重新加载，并且必须等待上传完成后才能继续操作

早期的浏览器并不支持异步上传，不过可以使用 iframe 来模拟，在页面中隐藏一个 `<iframe>` 元素，指定一个 `name` 值，同时将 `<form>` 元素的 `target` 属性值指定为 `<iframe>` 元素的 `name` 属性的值，将两者关联起来

``` html
<form action="#" enctype="multipart/form-data" method="post" target="upload-frame">
  <input type="file">
  <button type="submit">Upload</button>
</form>
<iframe id="upload-frame" name="upload-frame" src="about:blank" style="display: none;"></iframe>
```

这样在提交表单上传的时候，页面就不会重新加载了，取而代之的是 iframe 重新加载了，不过 iframe 原本就是隐藏的，即使重新加载也不会感知到，从体感来讲，有点异步上传的味道了

### 异步上传

XMLHttpRequest Level 2 提供了异步上传的能力，让上传文件变得简单，通常情况下使用 FormData 对象来包装数据

``` javascript
var formData = new FormData()
formData.append('file', file, file.name)

var xhr = new XMLHttpRequest()
xhr.open('POST', '/upload/url', true)
xhr.send(formData)
```

### 上传进度

XMLHttpRequest Level 2 提供了 progress 事件，基于这个事件可以知道上传进度如何

``` javascript
var xhr = new XMLHttpRequest()
xhr.open('POST', '/upload/url', true)
xhr.upload.onprogress = function(e) {
  console.log(e)
}
```

使用这个事件的 loaded（已上传字节数） 和 total（总数） 属性来计算上传的进度

``` javascript
var percent = Math.round((e.loaded / e.total) * 100)
```

上面的计算会得到一个表示完成百分比的数字，比如 `43`，不过这两个值也不一定总会有，保险一点先判断一下事件对象的 lengthComputable 属性

``` javascript
if (e.lengthComputable) {
  var percent = Math.round((e.loaded / e.total) * 100)
}
```

### 选择类型

给文件输入框添加 `accept` 属性即可指定选择文件的类型，比如需要选择 png 格式的图片，则值为 `image/png`，如果是所有图片类型，就是 `image/*`

``` html
<input accept="image/*" type="file">
```

添加 `capture` 属性可以调用设备机能，比如 `capture="camera"` 可以调用相机拍照，不过这并不是一个标准属性，不同设备实现方式也不一样，需要注意

### jQuery File Upload Plugin

基于 jQuery 使用 [blueimp/jQuery-File-Upload](https://github.com/blueimp/jQuery-File-Upload) 插件，功能齐全，扩展丰富，installation via npm: `npm install --save blueimp-file-upload`

示例

``` javascript
require('blueimp-file-upload/js/jquery.iframe-transport') // 不支持 XHR 上传的需要引用
require('blueimp-file-upload')

$('input[type="file"]').fileupload(options)
```

Compatibility: IE6+

Dependencies: jQuery 1.6+, jQuery UI widget factory, jQuery Iframe Transport plugin

### Axios

使用 Axios 上传文件

``` jsvascript
import axios from 'axios'

document.querySelector('input[type="file"]').addEventListener('change', function(e) {
  if (e.target.value == '') return
  let formData = new FormData()
  formData.append('file', e.target.files[0], e.target.files[0].name)

  axios({
    method: 'POST',
    url: '/upload/url',
    data: formData
  }).then(({data}) => {
    console.log(data)
  }).catch((err) => {
    console.log(err)
  })
})
```

Compatibility: IE10+ see [caniuse](https://caniuse.com/#feat=xhr2)

Dependencies: none

### Rxjs

使用 rxjs/ajax 方法上传文件

``` jsvascript
import * as rxjs from 'rxjs'
import { concatMap, filter } from 'rxjs/operators'
import { ajax } from 'rxjs/ajax'

rxjs.fromEvent(document.querySelector('input[type="file"]'), 'change')
  .pipe(filter(e => e.target.value != ''), concatMap((e) => {
    let formData = new FormData()
    formData.append('file', e.target.files[0], e.target.files[0].name)
    return ajax.post('/upload/url/', formData) // 不要设置 Content-Type
  }))
  .subscribe(({response}) => {
    console.log(response)
  })
```

Compatibility: IE10+ see [caniuse](https://caniuse.com/#feat=xhr2)

Dependencies: none
