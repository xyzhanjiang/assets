# Verbose

那些啰儿八嗦的 JavaScript 代码

### *

``` javascript
[1, 2, 3].forEach((x) => {
  alert(x)
})
```

forEach 方法的第一个参数需要一个函数，而 alert 本身就是一个函数，可以直接写成如下形式

``` javascript
[1, 2, 3].forEach(alert)
```

### *

``` javascript
if (condition) {
  statement
}
```

使用 `&&` 运算符，`&&` 运算符会先执行左边的表达式，只有左边表达式的值为 真值 时才会执行右边的表达式

``` javascript
condition && statement
```

### *

``` javascript
if (!x) {
  x = 1
}
```

使用 `||` 运算符，`||` 运算符会先执行左边的表达式，只有左边表达式的值为 假值 时才会执行右边的表达式

``` javascript
x = x || 1
```

### *

``` javascript
if (condition1) {
  statement1
} else {
  if (condition2) {
    statement2
  } else {
    statement3
  }
}
```

使用 `else if` 可以减少一层嵌套

``` javascript
if (condition1) {
  statement1
} else if (condition2) {
  statement2
} else {
  statement3
}
```

### *

``` javascript
if (x === 'foo' || x === 'bar' || x === 'baz') {
  statement
}
```

判断一个变量的值是几个其中的某一个，可以使用数组的 `includes` 方法

``` javascript
if (['foo', 'bar', 'baz'].includes(x)) {
  statement
}
```

### *

``` javascript
for (let key in obj) {
  console.log(obj[key])
}
```

当使用 for 循环遍历对象的时候，会将对象原型上的属性一同遍历，这时候不得不使用 hasOwnProperty 方法来排除

``` javascript
for (let key in obj) {
  if (obj.hasOwnProperty(key)) {
    console.log(obj[key])
  }
}
```

如果通过 Object.keys 方法将对象的键名转换为数组，然后再遍历这个数组则要相对简单一些，毕竟数组有遍历的方法，还不用关心对象原型的问题

``` javascript
Object.keys(obj).forEach((key) => {
  console.log(obj[key])
})
```

### *

``` javascript
const arr = [24, 7, 98]

Math.max.apply(null, arr)
Math.min.apply(null, arr)
```

获取一个数组的最大值/最小值的时候可以使用 `Math.max/Math.min` 方法，但是 `Math.max/Math.min` 方法的参数并不支持数组，需要一个一个单独传，所以可以使用 apply 方法来传入数组，不过这种方法已经过时了，使用展开操作符直接将数组转换为一个一个的值会更简洁

``` javascript
const arr = [24, 7, 98]

Math.max(...arr)
Math.min(...arr)
```
