# Async Await

要支持 async/await 语法，需要安装 [regenerator-runtime](https://github.com/facebook/regenerator/tree/master/packages/regenerator-runtime)，如果环境不支持 ES6 Promise 还需要使用 [ES6-Promise](https://github.com/stefanpenner/es6-promise)

``` shell
npm install --save regenerator-runtime es6-promise
```

在 JavaScript 中引入：

``` javascript
import 'es6-promise/auto'
import regeneratorRuntime from 'regenerator-runtime'
```

在引入这两个模块之后，使用了 async/await 语法的代码经过编译后可以支持到 IE 9