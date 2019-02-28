## webpack@4 for IE 8

webpack@4 兼容 IE8 方案

1. 引入模块时使用 `require` 方法(也就是 commonjs)代替 `import` 关键字(es6 module)，创建模块的时候避免使用 UMD 模式和 ES6 Module
1. 引入样式时也使用 `require` 方法替代 `import`
    
    ``` javascript
    // No
    import 'style.css'

    // Yes
    require('style.css')
    ```
1. 配置 UglifyJs 插件输出时兼容 IE 8

    webpack.config.js:

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
            mangle: true
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

1. 其它 polyfill/shim/sham

## webpack@3 for IE 8

webpack@3 兼容 IE8 方案：

1. 引入模块时使用 `require` 方法(也就是 commonjs)代替 `import` 关键字(es6 module)，创建模块的时候避免使用 UMD 模式和 ES6 Module
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

1. 其它 polyfill/shim/sham
