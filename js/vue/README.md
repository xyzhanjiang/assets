# Vue

[Vue.js](http://vuejs.org/)，中文网站：[https://cn.vuejs.org/](https://cn.vuejs.org/)

通过 npm 安装：`npm install --save vue`

和 webpack 一起使用，使用 [vue-loader](https://github.com/vuejs/vue-loader) 加载 .vue 组件，通过 npm 安装：

``` shell
npm install --save-dev vue-loader vue-template-compiler webpack
```

in webpack.config.js:

``` javascript
module: {
  rules: [
    {
      test: /\.vue$/,
      use: {
        loader: 'vue-loader'
      }
    }
  ]
}
```

`vue-loader@13` update:

``` javascript
// before
const about = require('./about.vue')

// after
const about = require('./about.vue').default
```

[release](https://github.com/vuejs/vue-loader/releases/tag/v13.0.0)

* 脚手架 [vue-cli](https://github.com/vuejs/vue-cli)
* 状态管理 [Vuex](https://vuex.vuejs.org/)
* 路由 [vue-router](https://github.com/vuejs/vue-router)
