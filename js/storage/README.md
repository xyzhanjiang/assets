# Storage

## Cookie

创建多个 cookie 的方法

``` javascript
document.cookie = 'name=Jim'
document.cookie = 'age=18'
```

读取 cookie 时可以得到所有 cookie 组成的字符串，如需获取某一个  cookie 则要分割字符串，一般不用手动去操作 cookie，有如下插件可以使用

[JavaScript Cookie](https://github.com/js-cookie/js-cookie), `npm install --save js-cookie`

## Web Storage

Web Storage 分为 Local Storage 和 Session Storage

``` javascript
// 储存
localStorage.setItem('names', JSON.stringify(['Jim', 'Lee']))

// 读取
var names = localStorage.getItem('names')

// 删除
localStorage.removeItem('names')

// 全部删除
localStorage.clear()
```

## Store.js

[Store.js](https://github.com/marcuswestin/store.js), `npm install --save store`
