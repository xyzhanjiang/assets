# 文件上传

文件上传是 Web 开发常见需求，上传文件需要用到文件输入框，如果给文件输入框添加一个 `multiple` 属性则可以一次选择多个文件（不支持的浏览器会自动忽略这个属性）

``` html
<input multiple type="file">
```

点击这个输入框就可以打开浏览文件对话框选择文件了，一般一个输入框上传一个文件就行，要上传多个文件也可以用多个输入框来处理，这样做是为了兼容那些不支持 multiple 属性的浏览器，同时用户一般也不会选择多个文件

### 基本上传方式

当把文件输入框放入表单中，提交表单的时候即可将选中的文件一起提交上传到服务器，需要注意的是由于提交的表单中包含文件，因此要修改一下表单元素的 `enctype` 属性为 `multipart/form-data`

``` html
<form action="#" enctype="multipart/form-data" method="post">
  <input name="file" type="file">
  <button type="submit">Upload</button>
</form>
```

这样上传方式是传统的同步上传，上传的文件如果很大，往往需要等待很久，上传完成后页面还会重新加载，并且必须等待上传完成后才能继续操作

早期的浏览器并不支持异步上传，不过可以使用 iframe 来模拟，在页面中隐藏一个 `<iframe>` 元素，指定一个 `name` 值，同时将 `<form>` 元素的 `target` 属性值指定为 `<iframe>` 元素的 `name` 属性的值，将两者关联起来

``` html
<form action="#" enctype="multipart/form-data" method="post" target="upload-frame">
  <input name="file" type="file">
  <button type="submit">Upload</button>
</form>
<iframe id="upload-frame" name="upload-frame" src="about:blank" style="display: none;"></iframe>
```

这样在提交表单上传的时候，页面就不会重新加载了，取而代之的是 iframe 重新加载了，不过 iframe 原本就是隐藏的，即使重新加载也不会感知到

### 访问文件

File API 提供了访问文件的能力，通过输入框的 `files` 属性访问，这会得到一个 FileList，这是一个集合，如果只选择了一个文件，那么集合中的第一个元素就是这个文件

``` javascript
var input = document.querySelector('input[type="file"]')
var file = input.files[0]

console.log(file.name) // 文件名称
console.log(file.size) // 文件大小
console.log(file.type) // 文件类型
```

支持 File API 的浏览器可以参考 [caniuse](https://caniuse.com/#feat=fileapi)

### Ajax 上传

由于可以通过 File API 直接访问文件内容，再结合 XMLHttpRequest 对象直接将文件上传，将其作为参数传给 XMLHttpRequest 对象的 send 方法即可

``` javascript
var xhr = new XMLHttpRequest()
xhr.open('POST', '/upload/url', true)
xhr.send(file)
```

不过一些原因不建议直接这样传递文件，而是使用 FormData 对象来包装需要上传的文件，FormData 是一个构造函数，使用的时候先 new 一个实例，然后通过实例的 append 方法向其中添加数据，直接把需要上传的文件添加进去

``` javascript
var formData = new FormData()
formData.append('file', file, file.name) // 第 3 个参数是文件名称
formData.append('username', 'Mary') // 还可以添加额外的参数
```

甚至也可以直接把表单元素作为实例化参数，这样整个表单中的数据就全部包含进去了

``` javascript
var formData = new FormData(document.querySelector('form'))
```

数据准备好后，就是上传了，同样是作为参数传给 XMLHttpRequest 对象的 send 方法

``` javascript
var xhr = new XMLHttpRequest()
xhr.open('POST', '/upload/url', true)
xhr.send(formData)
```

### 监测上传进度

XMLHttpRequest 对象还提供了一个 progress 事件，基于这个事件可以知道上传进度如何

``` javascript
var xhr = new XMLHttpRequest()
xhr.open('POST', '/upload/url', true)
xhr.upload.onprogress = progressHandler // 这个函数接下来定义
```

上传的 progress 事件由 xhr.upload 对象触发，在事件处理程序中使用这个事件对象的 loaded（已上传字节数） 和 total（总数） 属性来计算上传的进度

``` javascript
function progressHandler(e) {
  var percent = Math.round((e.loaded / e.total) * 100)
}
```

上面的计算会得到一个表示完成百分比的数字，不过这两个值也不一定总会有，保险一点先判断一下事件对象的 lengthComputable 属性

``` javascript
function progressHandler(e) {
  if (e.lengthComputable) {
    var percent = Math.round((e.loaded / e.total) * 100)
  }
}
```

支持 Ajax 上传的浏览器可以参考 [caniuse](https://caniuse.com/#feat=xhr2)

### 分割上传

使用文件对象的 slice 方法可以分割文件，给该方法传递两个参数，一个起始位置和一个结束位置，这会返回一个新的 Blob 对象，包含原文件从起始位置到结束位置的那一部分（文件 File 对象其实也是 Blob 对象，这可以通过 `file instanceof Blob` 确定，Blob 是 File 的父类）

``` javascript
var blob = file.slice(0, 1024) // 文件从字节位置 0 到字节位置 1024 那 1KB
```

将文件分割成几个 Blob 对象分别上传就能实现将大文件分割上传

``` javascript
function upload(file) {
  let formData = new FormData()
  formData.append('file', file)
  let xhr = new XMLHttpRequest()
  xhr.open('POST', '/upload/url', true)
  xhr.send(formData)
}

var blob = file.slice(0, 1024)
upload(blob) // 上传第一部分

var blob2 = file.slice(1024, 2048)
upload(blob2) // 上传第二部分

// 上传剩余部分
```

通常用一个循环来处理更方便

``` javascript
var pos = 0 // 起始位置
var size = 1024 // 块的大小

while (pos < file.size) {
  let blob = file.slice(pos, pos + size) // 结束位置 = 起始位置 + 块大小

  upload(blob)
  pos += size // 下次从结束位置开始继续分割
}
```

服务器接收到分块文件进行重新组装的代码就不在这里展示了

使用这种方式上传文件会一次性发送多个 HTTP 请求，那么如何处理这种多个请求同时发送的情况呢？方法有很多，可以用 Promise 来处理，让每次上传都返回一个 promise 对象，然后用 Promise.all 方法来合并处理，Promise.all 方法接受一个数组作为参数，因此将每次上传返回的 promise 对象放在一个数组中

``` javascript
var promises = []

while (pos < file.size) {
  let blob = file.slice(pos, pos + size)

  promises.push(upload(blob)) // upload 应该返回一个 promise
  pos += size
}
```

同时改造一下 upload 函数使其返回一个 promise

``` javascript
function upload(file) {
  return new Promise((resolve, reject) => {
    let formData = new FormData()
    formData.append('file', file)
    let xhr = new XMLHttpRequest()
    xhr.open('POST', '/upload/url', true)
    xhr.onload = () => resolve(xhr.responseText)
    xhr.onerror = () => reject(xhr.statusText)
    xhr.send(formData)
  })
}
```

如果使用 Fetch API 替换 XMLHttpRequest 对象那将简单一点，因为 Fetch API 直接就返回一个 promise 对象

``` javascript
function upload(file) {
  let formData = new FormData()
  formData.append('file', file)
  return fetch('/upload/url', {
    method: 'POST',
    body: formData
  })
}
```

当一切完成后

``` javascript
Promise.all(promises).then((response) => {
  console.log('Upload success!')
}).catch((err) => {
  console.log(err)
})
```

支持文件分割的浏览器可以参考 [caniuse](https://caniuse.com/#feat=mdn-api_blob_slice)

判断一下文件对象是否有该方法就能知道浏览器是否支持该方法，对于早期的部分版本浏览器需要加上对应的浏览器厂商前缀

``` javascript
var slice = file.slice || file.webkitSlice || file.mozSlice

if (slice) {
  let blob = slice.call(file, 0, 1024) // call
  upload(blob)
} else {
  upload(file) // 不支持分割就只能直接上传整个文件了，或者提示文件过大
}
```

### 拖拽上传

通过拖拽 API 可以实现拖拽文件上传，默认情况下，拖拽一个文件到浏览器中，浏览器会尝试打开这个文件，要使用拖拽功能需要阻止这个默认行为

``` javascript
document.addEventListener('dragover', function(e) {
  e.preventDefault()
  e.stopPropagation()
})
```

任意指定一个元素来作为释放拖拽的区域，给一个元素绑定 drop 事件

``` javascript
var element = document.querySelector('label')
element.addEventListener('drop', function(e) {
  e.preventDefault()
  e.stopPropagation()

  // ...
})
```

通过该事件对象的 dataTransfer 属性获取文件，然后上传即可

``` javascript
var file = e.dataTransfer.files[0]
upload(file) // upload 函数前面已经定义
```

### 选择类型

给文件输入框添加 `accept` 属性即可指定选择文件的类型，比如要选择 png 格式的图片，则指定其值为 `image/png`，如果要允许选择所有类型的图片，就是 `image/*`

``` html
<input accept="image/*" type="file">
```

添加 `capture` 属性可以调用设备机能，比如 `capture="camera"` 可以调用相机拍照，不过这并不是一个标准属性，不同设备实现方式也不一样，需要注意

``` html
<input accept="image/*" capture="camera" type="file">
```

经测 iOS 设备添加该属性后只能拍照而不能从相册选择文件了，所以判断一下

``` javascript
if (iOS) { // iOS 用 navigator.userAgent 判断
  input.removeAttribute('capture')
}
```

不支持的浏览器会自动忽略这些属性

### 自定义样式

文件输入框在各个浏览器中呈现的样子都不大相同，而且给 input 定义样式也不是那么方便，如果有需要应用自定义样式，有一个技巧，可以用一个 label 关联到这个文件输入框，当点击这个 label 元素的时候就会触发文件输入框的点击，打开浏览文件的对话框，相当于点击了文件输入框一样的效果

``` html
<label for="file-input"></label>
<input id="file-input" style="clip: rect(0,0,0,0); position: absolute;" type="file">
```

这时就可以将原本的文件输入框隐藏了，然后给 label 元素任意地应用样式，毕竟要给 label 元素应用样式比 input 方便得多

## 示例

下面是一些实际场景示例

### jQuery File Upload Plugin

基于 jQuery 使用 [blueimp/jQuery-File-Upload](https://github.com/blueimp/jQuery-File-Upload) 插件，功能齐全，扩展丰富，installation via npm: `npm install --save blueimp-file-upload`

``` javascript
require('blueimp-file-upload/js/jquery.iframe-transport') // 不支持 XHR 上传的需要引用
require('blueimp-file-upload')

$('input[type="file"]').fileupload(options)
```

Compatibility: IE6+

Dependencies: jQuery 1.6+, jQuery UI widget factory, jQuery Iframe Transport plugin

### Axios

使用 Axios 上传分割文件

``` javascript
import axios from 'axios'

document.querySelector('input[type="file"]').addEventListener('change', function(e) {
  if (e.target.value == '') return
  let file = e.target.files[0]

  let pos = 0
  let size = 1024 * 1024
  let promises = []

  while (pos < file.size) {
    let blob = file.slice(pos, pos + size)
    let formData = new FormData()
    formData.append('file', blob)
    promises.push(axios({
      method: 'POST',
      url: '/upload/url',
      data: formData
    }))
    pos += size
  }

  Promise.all(promises).then((response) => {
    console.log(response)
  }).catch((err) => {
    console.log(err)
  })
})
```

Compatibility: IE10+ see [caniuse](https://caniuse.com/#feat=xhr2)

Dependencies: none

### Rxjs

使用 rxjs/ajax 方法上传文件

``` javascript
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
