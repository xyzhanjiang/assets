# Is

常用 JavaScript 判断

## 数据类型和值

### Undefined

直接和 `undefined` 值对比就可以了

``` javascript
x === undefined
```

或者使用 `typeof` 操作符

``` javascript
typeof x == 'undefined'
```

### Null

直接和 `null` 值对比就可以了

``` javascript
x === null
```

`undefined` 和 `null` 这两个值有一个共性，就是对他们进行 get 或者 set 操作的时候会抛出 Uncaught TypeError，比如

``` javascript
var foo = null
foo.bar // Uncaught TypeError: Cannot read property 'bar' of null
```

因此在对某个值进行 get 或者 set 操作的时候需要先确保这个值既不是 `undefined` 也不是 `null`

``` javascript
x !== undefined && x !== null
```

刚好这两个值又是相等的，简单点只判断其一就可以了

``` javascript
null == undefined // true

x != null
```

[Lodash](https://github.com/lodash/lodash) 实现了一个 `_.isNil` 方法来判断 `undefined` 和 `null`

### 数字

对数字使用 `typeof` 操作符会返回 `'number'`，但这其中还包括 `NaN` 和 `Infinity` 这两个特殊值，让人无法接受的是 `NaN` (Not a Number)的类型竟然是 `number`，因此 es2015 新增了一个 `Number.isFinite` 方法来排除掉这两个值

``` javascript
Number.isFinite(1) // true

Number.isFinite(NaN)       // false
Number.isFinite(Infinity)  // false
Number.isFinite(-Infinity) // false
Number.isFinite('0')       // false
```

全局作用域下也有一个 `isFinite` 方法，但是该方法会触发隐式类型转换，什么乱七八糟的值只要能转换成数字都有可能通过，不过这个方法也能排除掉 `NaN` 和 `Infinity`

``` javascript
isFinite('0')   // true
isFinite(true)  // true
isFinite(false) // true
isFinite([])    // true

isFinite(NaN)      // false
isFinite(Infinity) // false
```

整合成一个兼容 es5 的方法

``` javascript
var isNumber = Number.isFinite || function(x) {
  return typeof x == 'number' && isFinite(x)
}
```

### NaN

全局方法 `isNaN` 会触发隐式类型转换，不能转换成数字的或者就是 `NaN` 都会返回 `true`

``` javascript
// 这些值要么就是 NaN，要么不能隐式转换为数字
isNaN(NaN)       // true
isNaN(0/0)       // true
isNaN('a')       // true
isNaN(undefined) // true

// 下面这些都可以隐式转换为数字
isNaN('0')   // false
isNaN(true)  // false
isNaN(false) // false
isNaN([])    // false
```

es2015 新增了一个 `Number.isNaN` 方法，保证了只有数字类型并且 `NaN` 的时候才会返回 `true`，真正判断一个值是 `NaN` 的方法

``` javascript
Number.isNaN(NaN) // true
Number.isNaN(0/0) // true

// 其它都是 false
Number.isNaN('a')       // false
Number.isNaN(undefined) // false
```

`NaN` 还有一个特殊的地方，自己和自己都不相等，目前应该只有这个值有这个特性

``` javascript
NaN != NaN // true
```

整合成一个兼容 es5 的方法，由于和全局的 `isNaN` 方法同名了，所以前面加了一个下划线

``` javascript
var _isNaN = Number.isNaN || function(x) {
  return typeof x == 'number' && x != +x
}
```

全局的 `isFinite` 和 `isNaN` 方法都具备 JavaScript 的特性隐式类型转换，而 `Number.isFinite` 和 `Number.isNaN` 方法由于其定义在 `Number` 构造函数上，所以仅针对 Number 类型

### 对象

对对象使用 `typeof` 操作符会返回 `'object'`，包括对象，数组以及特殊值 `null`

``` javascript
typeof {}   // object
typeof []   // object
typeof null // object
```

通常情况下不需要 `null` 值，可以将之排除

``` javascript
var isObject = (x) => return x != null && typeof x == 'object'
```

### 数组

前面提到对数组使用 `typeof` 操作符会返回 `'object'`，这显然不符合预期，因此 es5 新增加了一个 `Array.isArray` 方法用来判断数组

``` javascript
Array.isArray([]) // true
```

如果是 es3 则使用 `Object.prototype.toString`

``` javascript
Object.prototype.toString.call([]) == '[object Array]'
```

整合成一个兼容 es3 的方法

``` javascript
var isArray = Array.isArray || function(x) {
  return ({}).toString.call(x) == '[object Array]'
}
```

