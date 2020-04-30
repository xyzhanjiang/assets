# Verbose

代码是写给人看的，既然如此，那就要写得漂亮，好看，而不是让人看了之后口吐芬芳，因此，我想到了一些让人看了不爽，啰儿八嗦的 JavaScript 代码

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

当某个条件为 true 时执行的代码可以使用 `&&` 运算符，`&&` 运算符会先执行其左边的表达式，只有左边表达式的值为 true 时才会执行其右边的表达式

``` javascript
condition && statement
```

### *

``` javascript
if (!x) {
  x = 1
}
```

当某个条件为 false 时执行的代码可以使用 `||` 运算符，`||` 运算符也会先执行其左边的表达式，和 `&&` 运算符相反，只有左边表达式的值为 false 时才会执行其右边的表达式

``` javascript
x = x || 1
```

### *

``` javascript
if (condition) {
  obj.show()
} else {
  obj.hide()
}
```

根据某个条件来调用一个对象不同的方法，首先，在获取对象属性的时候可以使用方括号语法，方括号里面是表达式

``` javascript
if (condition) {
  obj['show']()
} else {
  obj['hide']()
}
```

方括号里面的内容加上了引号，所以这里表示的是字符串，如果不加引号，那就成了变量；然后可以用一个三元表达式将代码合并成一行

``` javascript
obj[condition ? 'show' : 'hide']()
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

在 `else` 里嵌套 `if` 不如直接使用 `else if` 还可以减少嵌套缩进

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

判断一个变量的值是几个值的其中一个，可以将这些值组合成一个数组，然后使用数组的 `includes` 方法来判断，可以减少同一个变量出现的次数

``` javascript
if (['foo', 'bar', 'baz'].includes(x)) {
  statement
}
```

### *

``` javascript
function foo() {
  if (condition1) {
    statement1

    if (condition2) {
      statement2
    }
  }
}
```

在函数作用域中当需要满足某个条件时才执行后面的代码可以改写成当条件不满足时返回，这样可以减少嵌套缩进

``` javascript
function foo() {
  if (!condition1) return
  statement1

  if (!condition2) return
  statement2
}
```

### *

``` javascript
if (x === 'key1') {
  y = 'value1'
} else if (x === 'key2') {
  y = 'value2'
} else if (x === 'key3') {
  y = 'value3'
} else {
  y = 'value4'
}
```

根据一个变量不同的值来执行相应的代码，虽然可以使用 switch 结构来改写，但依然显得臃肿，既然是这样一一对应的值，那就先将其组合成一个对象，然后根据变量的值来得到这个对象对应的属性值

``` javascript
const obj = {
  'key1': 'value1',
  'key2': 'value2',
  'key3': 'value3'
}

y = obj[x]
```

等等，还有一个 `value4` 呢，这时就可以使用前面提到的 `||` 运算符

``` javascript
y = obj[x] || 'value4'
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

不如先使用 `Object.keys` 方法将对象的所有 key 转换为数组

``` javascript
Object.keys(obj) // ['key1', 'key2', 'key3']
```

这个方法不会获取到对象原型链上的属性，然后再遍历这个数组的话就简单了

``` javascript
Object.keys(obj).forEach((key) => {
  console.log(obj[key])
})
```

### *

``` javascript
const arr = [24, 7, 98]
Math.max.apply(null, arr)
```

求最大值的时候使用 `Math.max` 方法，但是 `Math.max` 方法是接受多个单独参数的，所以这里使用 apply 调用的方式来使其传入数组，这在以前是个相当厉害的技巧，不过现在已经过时了，使用展开操作符直接将数组转换为一个一个的值会更简洁

``` javascript
const arr = [24, 7, 98]
Math.max(...arr) // 等同于 Math.max(24, 7, 98)
```

求最小值同理
