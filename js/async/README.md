# 处理异步的几种方法

有 foo 和 bar 两个函数，其中 foo 函数是一个耗时的异步函数

``` javascript
function foo() {
  setTimeout(() => {
    var result = 5
  }, 100)
}

function bar(n) {
  console.log(n)
}
```

想要在 foo 函数执行完毕后再执行 bar 函数有如下方式

## 回调函数

将 bar 函数作为参数传递给 foo 函数

``` javascript
function foo(cb) {
  setTimeout(() => {
    var result = 5
    cb(result)
  }, 100)
}

function bar(n) {
  console.log(n)
}

foo(bar)
```

Compatibility: all

Dependencies: none

## Promise

``` javascript
function foo() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(5)
    }, 100)
  })
}

function bar(n) {
  console.log(n)
}

foo().then(bar)
```

Compatibility: see [caniuse](https://caniuse.com/#feat=promises)

Dependencies: [ES6-Promise](https://github.com/stefanpenner/es6-promise)

## jQuery.Deferred

``` javascript
function foo() {
  var dfd = $.Deferred()
  setTimeout(() => {
    dfd.resolve(5)
  }, 100)
  return dfd.promise
}

function bar(n) {
  console.log(n)
}

foo().then(bar)
```

Compatibility: IE6+

Dependencies: jQuery 1.8+

## Async Await

本质还是基于 promise 的

``` javascript
function foo() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(5)
    }, 100)
  })
}

function bar(n) {
  console.log(n)
}

;(async function() {
  var result = await foo()
  bar(result)
})()
```

Compatibility: IE9+ see [caniuse](https://caniuse.com/#feat=async-functions)

Dependencies: [Babel](https://babeljs.io/), [regenerator-runtime](https://github.com/facebook/regenerator/tree/master/packages/regenerator-runtime), [ES6-Promise](https://github.com/stefanpenner/es6-promise)
