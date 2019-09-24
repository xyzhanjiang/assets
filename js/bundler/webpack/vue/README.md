## Webpack 开发

从零开始使用 Webpack 搭建 Vue 开发环境

### 创建项目

先创建一个空目录，在该目录打开命令行，执行 `npm init` 命令创建一个项目（无法执行 npm 命令？需要先安装 [Node](https://nodejs.org/en/)），这个过程会提示输入一些内容，随意输入就行，完成后会自动生成一个 package.json 文件，里面包含刚才输入的内容

创建一个 index.html 页面，由于使用的是 Vue 开发单页应用，所以通常一个 html 文件就够了，内容也很简单，就一个 div#app

**project**

``` diff
  project-name
+ |- index.html
  |- package.json
```

**index.html**

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

**project**

``` diff
  project-name
  |- index.html
+ |- index.js
  |- package.json
+ |- webpack.config.js
```

创建一个 index.js 作为项目的主入口，创建一个 webpack.config.js 文件作为 Webpack 的配置文件，内容如下

**webpack.config.js**

``` javascript
'use strict'

const path = require('path')

module.exports = {
  mode: 'development',
  entry: './index.js',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist')
  }
}
```

执行 `npm install --save-dev webpack-cli` 安装 Webpack

在 package.json 文件对应的 `scripts` 处写入命令

**package.json**

``` diff
  {
    "scripts": {
+     "build": "webpack"
    }
  }
```

执行 `npm run build` 即可完成打包，打包成功后的文件放在 dist 目录里面（这是由配置文件自定义的），目前打包出来的只有一个 index.js 文件

### 启动本地服务

使用 [webpack-dev-server](https://github.com/webpack/webpack-dev-server) 来启动本地服务，方便开发以及本地调试

执行 `npm install --save-dev webpack webpack-dev-server`

在 package.json 文件对应的 `scripts` 处写入命令

**package.json**

``` diff
  {
    "scripts": {
+     "dev": "webpack-dev-server",
      "build": "webpack"
    }
  }
```

执行 `npm run dev` 即可启动本地服务，访问 localhost:8080 即可，8080 是默认的端口号，修改端口号配置如下

**webpack.config.js**

``` javascript
module.exports = {
  // ...
  devServer: {
    compress: true,
    port: 8080
  }
}
```

### 生成 HTML 文件

使用 [html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin) 来生成 HTML 文件

执行 `npm install --save-dev html-webpack-plugin`

在 webpack.config.js 配置文件中添加

**webpack.config.js**

``` javascript
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  // ...
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

**webpack.config.js**

``` javascript
const VueLoaderPlugin = require('vue-loader/lib/plugin')

module.exports = {
  // ...
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

**project**

``` diff
  project-name
+ |- app.vue
  |- index.html
  |- index.js
  |- package.json
  |- webpack.config.js
```

**app.vue**

``` html
<template>
<router-view></router-view>
</template>

<script>
export default {}
</script>
```

**index.js**

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

**project**

``` diff
  project-name
  |- app.vue
  |- index.html
  |- index.js
  |- package.json
+ |- index.vue
  |- webpack.config.js
```

**index.vue**

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

**project**

``` diff
  project-name
+ |- about.vue
  |- app.vue
  |- index.html
  |- index.js
  |- package.json
  |- index.vue
  |- webpack.config.js
```

**about.vue**

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

**index.js**

``` javascript
// ...

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

### 文件分类

随着页面的增加，vue 文件将会越来越多，放在项目根目录下面并不科学，在当前目录创建一个 src 目录用来放置开发源文件

在 src 目录中创建一个 pages 目录用来放置 vue 页面文件，将 app.vue、index.vue、about.vue 文件移入 pages 目录中，同时修改对应的引用路径

**project**

``` diff
  project-name
- |- about.vue
- |- app.vue
  |- index.html
  |- index.js
  |- package.json
- |- index.vue
  |- webpack.config.js
+ |- /src
+   |- /pages
+     |- about.vue
+     |- app.vue
+     |- index.vue
```

**index.js**

``` javascript
// ...

import appView from './src/pages/app.vue'

const router = new VueRouter({
  routes: [
    {
      path: '/',
      component: require('./src/pages/index.vue').default
    },
    {
      path: '/about',
      component: require('./src/pages/about.vue').default
    },
  ]
})
```

像 `./src/pages/index.vue` 这种长路径写起比较麻烦，在 webpack.config.js 中配置一个 alias 参数

**webpack.config.js**

``` javascript
module.exports = {
  // ...
  resolve: {
    alias: {
      '@': path.join(__dirname, 'src')
    }
  }
}
```

上面的页面路径可以再次改写

**index.js**

``` javascript
// ...

import appView from '@/pages/app.vue'

const router = new VueRouter({
  routes: [
    {
      path: '/',
      component: require('@/pages/index.vue').default
    },
    {
      path: '/about',
      component: require('@/pages/about.vue').default
    },
  ]
})
```

同时，将路由配置单独提取出来，新建一个 routes.js 文件放在 src/js 目录中（js 目录需要新建）

**project**

``` diff
  project-name
  |- index.html
  |- index.js
  |- package.json
  |- webpack.config.js
  |- /src
+   |- /js
+     |- routes.js
    |- /pages
      |- about.vue
      |- app.vue
      |- index.vue
```

**routes.js**

``` javascript
module.exports = [
  {
    path: '/',
    component: require('@/pages/index.vue').default
  },
  {
    path: '/about',
    component: require('@/pages/about.vue').default
  },
]
```

**index.js**

``` javascript
// ...

import routes from '@/js/routes'

const router = new VueRouter({
  routes
})
```

### 配置 Babel

由于前面的代码使用了 ES2015 的语法，为了使项目兼容更多浏览器，需要用 [Babel](https://github.com/babel/babel) 对代码进行转换

执行 `npm install --save-dev @babel/core @babel/preset-env babel-loader`

**webpack.config.js**

``` javascript
module.exports = {
  // ...
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

创建一个 .babelrc 文件（不知道怎么创建？可以直接从该项目中复制）

**project**

``` diff
  project-name
+ |- .babelrc
  |- index.html
  |- index.js
  |- package.json
  |- webpack.config.js
  ...
```

**.babelrc**

``` json
{
  "presets": ["@babel/preset-env"]
}
```

### CSS

项目中肯定会用到 CSS，新建一个 style.css 样式文件，随意写了点样式

**project**

``` diff
  project-name
  |- .babelrc
  |- index.html
  |- index.js
  |- package.json
+ |- style.css
  |- webpack.config.js
  ...
```

**style.css**

``` css
@charset "utf-8";

body {
  color: #36f;
  margin: 0;
}
```

直接在 index.js 里面引用

**index.js**

``` javascript
import './style.css'
// ...
```

由于这里直接在 js 文件中引用了 css 文件，所以需要 [css-loader](https://github.com/webpack-contrib/css-loader) 来处理

执行 `npm install --save-dev css-loader style-loader`

**webpack.config.js**

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

另外也可以在 vue 文件里面写 CSS

**index.vue**

``` html
<template>
<div>
  <h1>这是首页</h1>
</div>
</template>

<script>
export default {}
</script>

<style>
h1 {
  text-align: center;
}
</style>
```

两种方式可以根据具体需求选择使用

### 提取样式文件

上面引入 css 的方式最终打包之后 CSS 代码都在 js 里面，为了网站的性能需要将 CSS 单独提取出来，使用 [mini-css-extract-plugin](https://github.com/webpack-contrib/mini-css-extract-plugin) 插件来提取 CSS

执行 `npm install --save-dev mini-css-extract-plugin`

**webpack.config.js**

``` javascript
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  // ...
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader // 代替 style-loader
          },
          {
            loader: 'css-loader'
          }
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

### 处理图片

项目中如果有用到图片需要 [file-loader](https://github.com/webpack-contrib/file-loader) 来处理

执行 `npm install --save-dev file-loader`

**webpack.config.js**

``` javascript
module.exports = {
  // ...
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif)$/i,
        loader: 'file-loader'
      }
    ]
  }
}
```

准备一张图片 logo.gif 放在 src/images 目录中（images 目录需要新建，这张图片是用来测试的）

**project**

``` diff
  project-name
  |- .babelrc
  |- index.html
  |- index.js
  |- package.json
  |- style.css
  |- webpack.config.js
  |- /src
+   |- /images
+     |- logo.gif
    |- /js
      |- routes.js
    |- /pages
      |- about.vue
      |- app.vue
      |- index.vue
```

**index.vue**

``` html
<template>
<div>
  <h1>这是首页</h1>
  <img src="@/images/logo.gif">
</div>
</template>

<script>
export default {}
</script>

<style>
h1 {
  text-align: center;
}
</style>
```

执行 `npm run build` 打包后发现图片已经成功打包进来了，但是图片的名称改变了，如果不希望改变图片名称，可以给 file-loader 配置参数

**webpack.config.js**

``` javascript
module.exports = {
  // ...
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif)$/i,
        loader: 'file-loader',
        options: {
          name: 'images/[name].[ext]'
        }
      }
    ]
  }
}
```

### 压缩 CSS

使用 [cssnano](https://github.com/cssnano/cssnano) 压缩 CSS，该插件属于 PostCSS 生态系统，所以需要同时安装 [postcss-loader](https://github.com/postcss/postcss-loader)

执行 `npm install --save-dev cssnano postcss-loader`

创建一个 postcss.config.js 文件，这是 PostCSS 的配置文件，相关配置都写在这里面

**project**

``` diff
  project-name
  |- .babelrc
  |- index.html
  |- index.js
  |- package.json
+ |- postcss.config.js
  |- style.css
  |- webpack.config.js
  ...
```

**postcss.config.js**

``` javascript
module.exports = {
  plugins: {
    'cssnano': {
      safe: true
    }
  }
}
```

**webpack.config.js**

``` javascript
module.exports = {
  // ...
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'postcss-loader'
          }
        ]
      }
    ]
  }
}
```

### CSS 预处理

这里使用 [postcss-preset-env](https://github.com/csstools/postcss-preset-env) 来预处理 CSS（也可以选择使用 Sass 或者 Less 等）

执行 `npm install --save-dev postcss-preset-env`

该插件也属于 PostCSS 生态系统，直接在 postcss.config.js 里增加配置即可

**postcss.config.js**

``` javascript
module.exports = {
  plugins: {
    'postcss-preset-env': {},
    'cssnano': {
      autoprefixer: false, // 这里两个插件都包含了 autoprefixer，只执行其中一个就行
      safe: true
    }
  }
}
```

### HTTP 请求

使用 [Axios](https://github.com/axios/axios) 发送 HTTP 请求，Axios 基于 Promise，所以同时安装 [es6-promise](https://github.com/stefanpenner/es6-promise) polyfill

执行 `npm install --save axios es6-promise`

**index.js**

``` javascript
import 'es6-promise/auto'
import axios from 'axios'
```

### 打包

配置 mode 参数

**webpack.config.js**

``` javascript
module.exports = {
  mode: 'production'
  // ...
}
```

`production` 和 `development` 两种 mode 参数很明显，`production` 用于发布，`development` 用于开发，具体有什么区别，看这里 [Click here](https://webpack.js.org/configuration/mode/)

执行 `npm run build` 即可打包，打包后生成的文件都在 dist 目录中

### 更多

* [在 Webpack 项目中配置支持 async/await](https://github.com/xyzhanjiang/assets/tree/master/js/es2015/async-await/)
