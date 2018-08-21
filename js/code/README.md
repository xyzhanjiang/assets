# Code

#### 判断是否是数组

``` javascript
var isArray = Array.isArray || function(obj) {
  return ({}).toString.call(obj) == '[object Array]'
}
```

仅针对 ECMAScript 3 环境；如果 ECMAScript 5 环境直接用 `Array.isArray` 方法就可以了

#### 数组取最大/最小值

``` javascript
Math.max.apply(null, [1, 100, 55]) // 100
Math.min.apply(null, [1, 100, 55]) // 1
```

#### 字符串反转

``` javascript
'abc'.split('').reverse().join('') // cba
```

#### 驼峰转连字符

``` javascript
'userName'.replace(/([A-Z])/g, '-$1').toLowerCase() // user-name
```
