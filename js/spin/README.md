# [spin.js](http://spin.js.org/)

加载动画效果，这玩意儿可以兼容到 IE6，安装模块：`npm install spin.js@2 --save`，使用方式：

``` javascript
const Spinner = require('spin.js')
Spinner.defaults.position = 'fixed'
const spin = new Spinner().spin(document.body)
```

最新版(@3+)可以兼容到 IE9，使用方式上有一些变化：

``` javascript
import {Spinner} from 'spin.js'
const spin = new Spinner().spin(document.body)
```

对于支持 CSS 动画的浏览器可以考虑使用 [SpinKit](https://github.com/tobiasahlin/SpinKit)
