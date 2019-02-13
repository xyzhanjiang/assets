# Modal

modal, dialog, alert

## Bootstrap

将 Bootstrap v3 的 Modal 插件单独拎出来用(v3 可以兼容 IE 8)，installation via npm: `npm install --save bootstrap@3`

Usage

``` javascript
require('bootstrap')

// or
require('bootstrap/js/transition') // optional, 可选的是否需要过渡效果
require('bootstrap/js/modal')
```

如果项目样式不是基于 Bootstrap 的就需要另外为 Modal 单独写样式，参照 bootstrap-modal.css 文件

基本的 HTML 结构如下

``` html
<div class="modal fade" id="modal" tabindex="-1" role="dialog">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title">标题</h4>
      </div>
      <div class="modal-body">
        <p>内容区域</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button> <!-- 弹框内按钮添加 data-dismiss="modal" 属性即可点击该按钮关闭弹框 -->
        <button type="button" class="btn btn-primary">确定</button>
      </div>
    </div><!-- end .modal-content -->
  </div><!-- end .modal-dialog -->
</div><!-- end .modal -->
```

另外需要准备一个按钮来触发弹框，无需额外添加任何 JavaScript 代码

``` html
<button data-toggle="modal" data-target="#modal" type="button">Show modal</button>
```

`data-toggle` 属性表示这个按钮是触发弹框的，`data-target` 属性表示触发的哪个弹框

或者也可以用 JavaScript 触发

``` javascript
$('#modal').modal('show')
```

## sweetalert

[sweetalert](https://github.com/t4t5/sweetalert), installation via npm: `npm install --save sweetalert`

Usage

``` javascript
import swal from 'sweetalert' // 样式也包含在里面

swal('Hello world!')
```

该插件内置了样式和 ES6 Promise polyfill

## sweetalert2

[sweetalert](https://github.com/sweetalert2/sweetalert2), installation via npm: `npm install --save sweetalert2`

Usage

``` javascript
import Swal from 'sweetalert2' // 样式也包含在里面

Swal.fire('Hello world!')
```

也可以分开引用样式和插件

``` javascript
import 'sweetalert2/dist/sweetalert2.css'
import Swal from 'sweetalert2/dist/sweetalert2.js'
```

另外需要引用 ES6 Promise polyfill, WeakMap polyfill

## jquery-confirm

[jquery-confirm](https://github.com/craftpip/jquery-confirm), installation via npm: `npm install --save jquery-confirm`

Usage

``` javascript
require('jquery-confirm/dist/jquery-confirm.min.css')
require('jquery-confirm')
```

## HTML5 Dialog element

使用原生的 `<dialog>` 元素

``` html
<dialog>Content</dialog>
```

JavaScript

``` javascript
var dialog = document.querySelector('dialog')
dialog.showModal()
```

使用 polyfill 之后可以兼容大部分主流浏览器，installation via npm: `npm install --save dialog-polyfill`

Usage

``` javascript
require('dialog-polyfill/dialog-polyfill.css')
const dialogPolyfill = require('dialog-polyfill/dialog-polyfill')

var dialog = document.querySelector('dialog')
dialogPolyfill.registerDialog(dialog)
dialog.showModal()
```
