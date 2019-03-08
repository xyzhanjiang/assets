## webpack@4 for IE 8

webpack@4 兼容 IE8 方案

### Object.defineProperty

IE 8 不完全支持这个方法，webpack/babel 编译后的代码可能会使用这个方法，或者引用的第三方包自带自带这个，要避免编译后的代码中出现这个方法

1. 引入模块时使用 `require` 方法(也就是 commonjs)代替 `import` 关键字(es6 module)，创建模块的时候避免使用 UMD 模式和 ES6 Module

    ``` javascript
    // No
    import axios from 'axios'

    // Yes
    const axios = require('axios')
    ```

1. 引入样式时也使用 `require` 方法替代 `import`
    
    ``` javascript
    // No
    import 'style.css'

    // Yes
    require('style.css')
    ```

### 缺少标识符错误

代码中出现了 default, class, catch 等关键字/保留字作为对象属性的时候会报这个错误，比如

``` javascript
axios.get('/url').catch(err => console.log(err))
```

这里的 catch 在 IE 8 会报缺少标识符错误，加上引号可以解决这个问题

``` javascript
axios.get('/url')['catch'](err => console.log(err))
```

可以配置一下 UglifyJs 插件自动解决这个问题

webpack.config.js

``` javascript
const webpack = require('webpack')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  optimization: {
    minimizer: [new UglifyJsPlugin({
      uglifyOptions: {
        warnings: false,
        parse: {},
        compress: {
          properties: false
        },
        mangle: true,
        output: {
          comments: /^!/
        },
        toplevel: false,
        nameCache: null,
        ie8: true,
        keep_fnames: false,
      }
    })]
  }
}
```

### 各种 Api 不支持

引入对应的 polyfill/shim/sham

### ES2015

如果使用 babel 编译代码，则以下语法可以安全地使用

* Arrows and Lexical This
* Template Strings
* Destructuring
* Default + Rest + Spread
* Let + Const

## webpack@3 for IE 8

### Object.defineProperty

同4

### 缺少标识符错误

1. 使用 `es3ify-webpack-plugin` 插件将代码转化为 ES3 环境兼容

    ``` shell
    npm install es3ify-webpack-plugin --save-dev
    ```

    webpack.config.js:

    ``` javascript
    var webpack = require('webpack')
    var es3ifyPlugin = require('es3ify-webpack-plugin')

    plugins: [
      new es3ifyPlugin()
    ]
    ```

1. 配置 UglifyJs 插件

    webpack.config.js:

    ``` javascript
    var webpack = require('webpack')
    var UglifyJsPlugin = webpack.optimize.UglifyJsPlugin

    plugins: [
      new UglifyJsPlugin({
        compress: {
          properties: false,
          warnings: false
        },
        output: {
          beautify: true,
          quote_keys: true
        },
        mangle: {
          screw_ie8: false
        },
        sourceMap: false
      })
    ]
    ```

### 各种 Api 不支持

引入对应的 polyfill/shim/sham
