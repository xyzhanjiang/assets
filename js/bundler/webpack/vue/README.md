## Webpack 开发

从零开始使用 Webpack 搭建 Vue 开发环境

### 创建项目

先创建一个空目录，在该目录打开命令行，执行 `npm init` 命令创建一个项目，这个过程会提示输入一些内容，随意输入就行，完成后会自动生成一个 package.json 文件，里面包含刚才输入的内容

创建一个 index.html 页面，由于使用的是 Vue 开发单页应用，所以通常一个 html 文件就够了，内容也很简单，就一个 div#app

``` html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>这是标题</title>
</head>
<body>
<div id="app"></div>
</body>
</html>
```

创建一个 index.js 作为项目的主入口，创建一个 webpack.config.js 文件作为 Webpack 的配置文件，内容如下

webpack.config.js

``` javascript
'use strict'

var path = require('path')

module.exports = {
  entry: './index.js',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist')
  }
}
```

执行 `npm install --save-dev webpack-cli` 安装 Webpack

在 package.json 文件对应的 `scripts` 处写入命令

``` json
{
  "scripts": {
    "build": "webpack"
  }
}
```

执行 `npm run build` 即可完成打包，打包成功后的文件放在 dist 目录里面（这是由配置文件自定义的），目前打包出来的只有一个 index.js 文件

### 启动本地服务

执行 `npm install --save-dev webpack webpack-dev-server`

在 package.json 文件对应的 `scripts` 处写入命令

``` json
{
  "scripts": {
    "dev": "webpack-dev-server",
    "build": "webpack"
  }
}
```

执行 `npm run dev` 即可启动本地服务，访问 localhost:8080 即可

### 生成 HTML 文件

执行 `npm install --save-dev html-webpack-plugin`

webpack.config.js

``` javascript
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './index.html'
    })
  ]
}
```

### 安装 Vue

执行 `npm install --save-dev vue-loader vue-template-compiler`

执行 `npm install --save vue vue-router`

在 webpack.config.js 中配置 vue-loader 用于引入 .vue 类型文件

webpack.config.js

``` javascript
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: [
          {
            loader: 'vue-loader'
          }
        ]
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin()
  ]
}
```

新建一个 app.vue 文件作为路由组件的容器

app.vue

``` html
<template>
<router-view></router-view>
</template>

<script>
export default {}
</script>
```

index.js

``` javascript
import Vue from 'vue'
import VueRouter from 'vue-router'

import appView from 'app.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/',
      component: require('./index.vue').default
    }
  ]
})

new Vue({
  el: '#app',
  router,
  render(h) { return h(appView) }
})
```

新建一个 index.vue 文件作为首页

index.vue

``` html
<template>
<div>
  <h1>这是首页</h1>
</div>
</template>

<script>
export default {}
</script>
```

### 添加页面

添加一个 about.vue 文件作为关于页

about.vue

``` html
<template>
<div>
  <h1>这是关于页</h1>
</div>
</template>

<script>
export default {}
</script>
```

配置关于页的路由

index.js

``` javascript
const router = new VueRouter({
  routes: [
    {
      path: '/',
      component: require('./index.vue').default
    },
    {
      path: '/about',
      component: require('./about.vue').default
    },
  ]
})
```

访问 http://localhost:8080/#/about 即可显示关于页

### 配置 Babel

由于前面的代码使用了 ES2015 的语法，为了使项目兼容更多浏览器，需要用 Babel 对代码进行转换

执行 `npm install --save-dev @babel/core @babel/preset-env babel-loader`

webpack.config.js

``` javascript
module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader'
          }
        ]
      }
    ]
  }
}
```

创建一个 .babelrc 文件

.babelrc

``` json
{
  "presets": ["@babel/preset-env"]
}
```

### CSS

项目中肯定会用到 CSS，新建一个 style.css 样式文件

style.css

``` css
@charset "utf-8";

body {
  color: #36f;
  margin: 0;
}
```

直接在 index.js 里面引用

index.js

``` javascript
import './style.css'
```

由于这里直接在 js 文件中引用了 css 文件，所以需要配置一下

执行 `npm install --save-dev css-loader style-loader`

webpack.config.js

``` javascript
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          }
        ]
      }
    ]
  }
}
```

### 提取样式文件

上面引入 css 的方式最终打包之后 CSS 代码都在 js 里面，为了网站的性能需要将 CSS 单独提取出来

执行 `npm install --save-dev mini-css-extract-plugin`

webpack.config.js

``` javascript
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          'css-loader'
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: `[name].css`
    })
  ]
}
```

### To be continued
