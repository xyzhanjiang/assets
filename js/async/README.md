# 处理异步的几种方法

有 foo 和 bar 两个函数，其中 foo 函数是一个耗时的异步函数

``` javascript
function foo() {
  setTimeout(() => {
    console.log('foo done')
  }, 100)
}

function bar() {
  console.log('bar done')
}
```

无论怎么指定执行顺序

``` javascript
foo()
bar()
```

最后控制台得到的结果都是

``` diff
bar done
foo done
```

如何在 foo 函数执行完毕后再执行 bar 函数呢，有如下方式

## 回调函数

将 bar 函数作为参数传递给 foo 函数，在 foo 函数内部执行传入的 bar 函数

``` javascript
function foo(cb) {
  setTimeout(() => {
    console.log('foo done')
    cb()
  }, 100)
}

function bar() {
  console.log('bar done')
}

foo(bar) // foo done, bar done
```

回调函数是最基础的处理异步的方式，但是它有个最大的问题就是回调地狱

``` javascript
foo(function(result1) {
  callback1(function(result2) {
    callback2(function(result3) {
      callback3(function(result4) {
        // ...
      })
    })
  })
})
```

像这样一层又一层，代码将会被向右推到天边去，为了解决这个问题，推出了 Promise

## Promise

``` javascript
function foo() {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('foo done')
      resolve()
    }, 100)
  })
}

function bar() {
  console.log('bar done')
}

foo().then(bar) // foo done, bar done
```

咋看之下比回调函数还复杂，但是把回调地狱的代码使用 Promise 方式改写将变得清晰

``` javascript
foo().then(function(result1) {
  return callback1()
}).then(function(result2) {
  return callback2()
}).then(function(result3) {
  callback3()
}).then(function(result4) {
  // ...
})
```

至少不会无止尽地向右推了

相关兼容性可以参考 [caniuse](https://caniuse.com/#feat=promises)，polyfill 可以使用 [ES6-Promise](https://github.com/stefanpenner/es6-promise)

## jQuery.Deferred

jQuery 也有自己的 Promise 实现，使用方式如下

``` javascript
function foo() {
  var dfd = $.Deferred()
  setTimeout(() => {
    console.log('foo done')
    dfd.resolve()
  }, 100)
  return dfd.promise
}

function bar() {
  console.log('bar done')
}

foo().then(bar) // foo done, bar done
```

jQuery 从 1.5 版本开始支持，但是 1.8 版本更完善

## Async Await

本质还是基于 promise 的

``` javascript
function foo() {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('foo done')
      resolve()
    }, 100)
  })
}

function bar() {
  console.log('bar done')
}

;(async function() {
  await foo()
  bar()
})() // foo done, bar done
```

相关兼容性可以参考 [caniuse](https://caniuse.com/#feat=async-functions)
