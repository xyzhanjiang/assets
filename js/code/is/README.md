# Is

#### 判断数组

``` javascript
var isArray = Array.isArray || function(obj) {
  return ({}).toString.call(obj) == '[object Array]'
}
```

仅针对 ECMAScript 3 环境；如果 ECMAScript 5 环境直接用 `Array.isArray` 方法就可以了

#### 判断数字

除开 NaN 和 Infinity

``` javascript
var isNumber = Number.isFinite || function(obj) {
  return typeof obj == 'number' && isFinite(obj)
}
```

#### 判断 NaN

``` javascript
var isNaN = Number.isNaN || function(obj) {
  return typeof obj == 'number' && obj != +obj
}
```

Number.isNaN 方法和全局的 isNaN 方法的作用是不一样的
