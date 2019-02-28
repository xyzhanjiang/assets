# Async

有 foo 和 bar 两个函数，其中 foo 函数是一个耗时的异步函数

``` javascript
function foo() {
  setTimeout(() => {
    ...
  }, 100)
}
function bar() {}
```

想要在 foo 函数执行完毕后再执行 bar 函数有如下方式

## 回调函数

将 bar 函数作为参数传递给 foo 函数

``` javascript
function foo(cb) {
  setTimeout(() => {
    ...
    cb()
  }, 100)
}
function bar() {}

foo(bar)
```

## Promise

``` javascript
function foo() {
  return new Promise((resolve) => {
    setTimeout(() => {
      ...
      resolve()
    }, 100)
  })
}
function bar() {}

foo().then(bar)
```

jQuery

``` javascript
function foo() {
  var dfd = $.Deferred()
  setTimeout(() => {
    ...
    dfd.resolve()
  }, 100)
  return dfd.promise
}
function bar() {}

foo().then(bar)
```

## Async Await

To be continued
