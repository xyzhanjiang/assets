# 处理异步的几种方法

有 foo 和 bar 两个函数，其中 foo 函数是一个比较耗时的函数（可以是动画效果或者 Ajax），这里用一个 setTimeout 来模拟耗时效果，而 bar 函数是一个普通函数

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

这两个函数无论怎么指定执行顺序

``` javascript
foo()
bar()

// 还是
bar()
foo()
```

最后控制台得到的结果都是

``` diff
bar done
foo done
```

那么如何在 foo 函数执行完毕后才执行 bar 函数呢，也就是说让控制台打印出

``` diff
foo done
bar done
```

这就需要一些处理异步的方式了

## 回调函数

将 bar 函数作为参数传递给 foo 函数，在 foo 函数内部执行传入的 bar 函数

``` javascript
function foo(cb) {
  setTimeout(() => {
    console.log('foo done')
    cb() // 在这里执行
  }, 100)
}

foo(bar) // foo done, bar done
```

给回调函数传入参数，直接在函数执行的时候传入

``` javascript
function foo(cb) {
  setTimeout(() => {
    console.log('foo done')
    cb('bar done')
  }, 100)
}
```

在回调函数中使用这个参数

``` javascript
function bar(msg) {
  console.log(msg) // bar done
}
```

回调函数是最基础的处理异步的方式，但是它有个最大的问题就是回调地狱

``` javascript
foo((res1) => {
  cb1((res2) => {
    cb2((res3) => {
      cb3((res4) => {
        // ...
      })
    })
  })
})
```

像这样一层又一层，代码将会被向右推到天边去

## 事件发生器

通过绑定事件，触发事件可以实现和回调函数类似的效果，由于客户端没有事件发生器，使用 jQuery 自带的

``` javascript
var $emit = $({})
$emit.on('done', bar)
```

用一个空对象来生成一个 jQuery 对象，给这个 jQuery 对象绑定了一个 done 事件，这个事件名称是可以任意指定的，当触发这个事件的时候就执行 bar 函数，在 foo 函数内部触发这个事件，最后执行 foo 函数

``` javascript
function foo() {
  setTimeout(() => {
    console.log('foo done')
    $emit.trigger('done')
  }, 100)
}

foo() // foo done, bar done
```

给事件处理程序传入参数

``` javascript
$emit.trigger('done', 'bar done')
```

在事件处理程序中使用这个参数，由于这是事件处理程序，所以第一个参数是事件对象，第二个参数才是之前传入的参数

``` javascript
function bar(e, msg) {
  console.log(msg) // bar done
}
```

事件发生器原理其实和回调函数差不多

为了更好地解决异步问题，ES2015 推出了 Promise 承诺对象

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

foo().then(bar) // foo done, bar done
```

咋看之下比回调函数还复杂，但是把之前回调地狱的代码使用 Promise 方式改写将变得清晰

``` javascript
foo().then((res1) => {
  return cb1()
}).then((res2) => {
  return cb2()
}).then((res3) => {
  return cb3()
}).then((res4) => {
  // ...
})
```

至少不会无止尽地向右推代码了

Promise 对象的兼容性可以参考 [caniuse](https://caniuse.com/#feat=promises)，polyfill 可以使用 [ES6-Promise](https://github.com/stefanpenner/es6-promise)

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

foo().then(bar) // foo done, bar done
```

jQuery 从 1.5 版本开始支持，但是 1.8 版本更完善

## Async Await

使用 async/await 语法可以像同步那样编写异步代码，在 function 前面加一个 async 关键字即可定义一个异步函数

``` javascript
async function() {
  //
}
```

异步函数和普通函数的区别是，异步函数执行后会返回一个 Promise 对象，为什么要定义一个异步函数这是因为 await 关键字必须在异步函数中才能使用

``` javascript
async function() {
  await foo() // await 在这里相当于一个等待的效果
  // 这后面的代码会等到 foo 执行完毕才执行
}
```

因此前面的例子可以改成如下

``` javascript
function foo() {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('foo done')
      resolve()
    }, 100)
  })
}

// await 关键字必须在异步函数中使用
// 所以这里定义了一个立即执行的异步函数
;(async function() {
  await foo()
  bar()
})() // foo done, bar done
```

但是其本质还是基于 Promise 的

async/await 语法的兼容性可以参考 [caniuse](https://caniuse.com/#feat=async-functions)

[在 Webpack 项目中配置支持 async/await](https://github.com/xyzhanjiang/assets/tree/master/js/es2015/async-await/)
