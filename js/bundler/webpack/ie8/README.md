# webpack@3 for IE 8

webpack3 为了兼容 IE8 需要做的一些牺牲：

1. 引入模块时使用 `require` 方法(也就是 commonjs)代替 `import` 关键字(es6 module)，自己创建模块的时候避免使用 UMD 模式。
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
