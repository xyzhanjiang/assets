# ECMAScript5

一些新增 API 可以使用 [es5-shim](https://github.com/es-shims/es5-shim) 来兼容一些老旧浏览器(一般情况下指 IE < 9)。

通过 npm 安装：`npm install --save es5-shim`

``` javascript
require('es5-shim')
require('es5-shim/es5-sham') // 按需求决定是否引入 sham
```

举个例子，遍历 Object

``` javascript
var obj = {
  key1: 'value1',
  key2: 'value2'
}
Object.keys(obj).forEach((key) => console.log(key))
```