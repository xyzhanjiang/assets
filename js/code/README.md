# Code

#### 数组取最大/最小值

Math.max() 和 Math.min() 方法接受多个单独的值作为参数，如果需要获取数组当中的最大值/最小值，则需要一些技巧

``` javascript
Math.max.apply(null, [1, 100, 55]) // 100
Math.min.apply(null, [1, 100, 55]) // 1
```

ES2015

``` javascript
Math.max(...[1, 100, 55]) // 100
Math.min(...[1, 100, 55]) // 1
```

#### 字符串翻转

``` javascript
'abc'.split('').reverse().join('') // cba
```

#### 驼峰转连字符

``` javascript
'userName'.replace(/([A-Z])/g, '-$1').toLowerCase() // user-name
```
