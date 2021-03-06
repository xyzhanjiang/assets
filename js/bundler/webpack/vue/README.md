## Webpack 开发

从零开始使用 Webpack 搭建 Vue 开发环境

### 创建项目

首先需要创建一个空目录，在该目录打开命令行，执行 `npm init` 命令创建一个项目（无法执行 npm 命令？需要先安装 [Node](https://nodejs.org/en/)），这个过程会提示输入一些内容，随意输入就行，完成后会自动生成一个 package.json 文件，里面包含了刚才输入的那些内容，其实这个步骤就只是生成一个 package.json 文件而已，手动创建也可以

然后创建一个 index.html 页面，由于使用的是 Vue 开发单页应用，所以通常情况下我们只需要一个 html 文件，内容也很简单，就只有一个 div#app

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

接着创建一个 src 目录，在 src 目录中创建一个 index.js 文件作为项目的主入口，项目的 JavaScript 代码都可以写在这个文件里面，在根目录创建一个 webpack.config.js 文件作为 Webpack 的配置文件

**project**

``` diff
  project-name
  |- index.html
  |- package.json
+ |- webpack.config.js
+ |- /src
+   |- index.js
```

Webpack 相关的配置都写在这个文件里面，Webpack 会根据这个配置文件进行打包，内容如下

**webpack.config.js**

``` javascript
'use strict'

const path = require('path')

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist')
  }
}
```

index.js 作为项目的主入口，目前还没有任何内容

执行 `npm install --save-dev webpack-cli` 安装 Webpack

在 package.json 文件对应的 `scripts` 处新增一条打包命令

**package.json**

``` diff
  {
    "scripts": {
+     "build": "webpack"
    }
  }
```

写在这里的命令可以通过 `npm run xxx` 执行，这里是 build，因此执行命令是 `npm run build`，如果打包成功后的话，打包后的文件将会放在 dist 目录里面（这是由配置文件自定义的），目前打包出来的只有一个 index.js 文件，如果打包失败则需要查看是什么原因导致

### 启动本地服务

为了方便开发和调试，我们需要启动一个本地服务，这可以通过使用 [webpack-dev-server](https://github.com/webpack/webpack-dev-server) 来实现

执行 `npm install --save-dev webpack webpack-dev-server`

在 package.json 文件对应的 `scripts` 处新增一条命令

**package.json**

``` diff
  {
    "scripts": {
+     "dev": "webpack-dev-server",
      "build": "webpack"
    }
  }
```

执行 `npm run dev` 即可启动本地服务，访问 localhost:8080 即可，8080 是默认的端口号，可以在 webpack 配置文件中修改端口号，如果当前端口号被占用的话，需要另外设置一个端口号

**webpack.config.js**

``` javascript
module.exports = {
  devServer: {
    compress: true,
    port: 8080
  }
}
```

### 生成 HTML 文件

使用 [html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin) 来自动生成 HTML 文件

执行 `npm install --save-dev html-webpack-plugin`

这是一个 webpack 插件，在 webpack 配置文件中使用

**webpack.config.js**

``` diff
+ const HtmlWebpackPlugin = require('html-webpack-plugin')

  module.exports = {
+   plugins: [
+     new HtmlWebpackPlugin({
+       filename: 'index.html', // 生成文件的名字
+       template: './index.html' // 模版，使用当前目录下的 index.html 文件
+     })
+   ]
  }
```

用当前目录下的 index.html 文件作为模版来生成一个 index.html 文件，生成的文件位于 dist 目录中，用于部署到服务器

### CSS

项目中肯定会用到 CSS，首先新建一个 style.css 样式文件，放在 src/css 目录中，项目中的样式就可以写在这里面

**project**

``` diff
  project-name
  |- /src
+   |- /css
+     |- style.css
```

然后安装 [Bulma](https://github.com/jgthms/bulma)，这是一个 CSS framework，提供了一些基础样式，本示例将以这个框架为主

执行 `npm install --save bulma`

直接在 index.js 里面引用

**src/index.js**

``` diff
+ import 'bulma/css/bulma.css'
+ import '@/css/style.css'
```

由于这里直接在 js 文件中引用了 css 文件，所以需要 [css-loader](https://github.com/webpack-contrib/css-loader) 来处理

执行 `npm install --save-dev css-loader style-loader` 命令安装，在 webpack 配置文件 rules 处添加规则

**webpack.config.js**

``` diff
  module.exports = {
    module: {
      rules: [
+       {
+         test: /\.css$/,
+         use: [
+           {
+             loader: 'style-loader'
+           },
+           {
+             loader: 'css-loader'
+           }
+         ]
+       },
      ]
    }
  }
```

### 提取样式文件

上面引入 css 的方式最终打包之后 CSS 代码都在 js 里面，为了网站的性能可以将 CSS 单独提取出来，使用 [mini-css-extract-plugin](https://github.com/webpack-contrib/mini-css-extract-plugin) 插件来提取 CSS

执行 `npm install --save-dev mini-css-extract-plugin`

**webpack.config.js**

``` diff
+ const MiniCssExtractPlugin = require('mini-css-extract-plugin')

  module.exports = {
    // ...
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            {
-             loader: 'style-loader'
+             loader: MiniCssExtractPlugin.loader
            },
            {
              loader: 'css-loader'
            }
          ]
        }
      ]
    },
    plugins: [
+     new MiniCssExtractPlugin({
+       filename: `[name].css`
+     }),
    ]
  }
```

### 处理图片

项目中如果有用到图片需要 [file-loader](https://github.com/webpack-contrib/file-loader) 来处理

执行 `npm install --save-dev file-loader`

**webpack.config.js**

``` diff
  module.exports = {
    module: {
      rules: [
+       {
+         test: /\.(png|jpe?g|gif)$/i,
+         loader: 'file-loader'
+         options: {
+           name: 'images/[name].[ext]'
+         }
+       },
      ]
    }
  }
```

在 src 目录中创建一个 images 目录用于存放图片

**project**

``` diff
  project-name
  |- /src
+   |- /images
```

### 压缩 CSS

使用 [cssnano](https://github.com/cssnano/cssnano) 压缩 CSS，该插件属于 PostCSS 生态系统，所以需要同时安装 [postcss-loader](https://github.com/postcss/postcss-loader)

执行 `npm install --save-dev cssnano postcss-loader`

创建一个 postcss.config.js 文件，这是 PostCSS 的配置文件，相关配置都写在这里面

**project**

``` diff
  project-name
  |- package.json
+ |- postcss.config.js
```

在其配置文件中使用 cssnano 插件

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

将 postcss-loader 写入 webpack 配置文件中

**webpack.config.js**

``` diff
  module.exports = {
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
+           {
+             loader: 'postcss-loader'
+           }
          ]
        }
      ]
    }
  }
```

### CSS 预处理

这里使用 [postcss-preset-env](https://github.com/csstools/postcss-preset-env) 来预处理 CSS（当然也可以选择使用 Sass/Less/Stylus）

执行 `npm install --save-dev postcss-preset-env`

该插件也属于 PostCSS 生态系统，只需要在 postcss.config.js 里增加配置即可

**postcss.config.js**

``` diff
  module.exports = {
    plugins: {
+     'postcss-preset-env': {},
      'cssnano': {
+       autoprefixer: false, // 这里两个插件都包含了 autoprefixer，只执行其中一个就行
        safe: true
      }
    }
  }
```

### 安装 Vue

执行 `npm install --save-dev vue-loader vue-template-compiler` 安装开发依赖

执行 `npm install --save vue vue-router vuex` 安装项目依赖

vue-loader 用于加载 .vue 后缀的文件，vue-template-compiler 模块是 Vue 模板的编译器，其版本和 Vue 必须保持一致

**webpack.config.js**

``` diff
+ const VueLoaderPlugin = require('vue-loader/lib/plugin')

  module.exports = {
    module: {
      rules: [
+       {
+         test: /\.vue$/,
+         use: [
+           {
+             loader: 'vue-loader'
+           }
+         ]
+       },
      ]
    },
    plugins: [
+     new VueLoaderPlugin()
    ]
}
```

在 src 目录下新建一个 app.vue 文件作为路由组件的容器

**project**

``` diff
  project-name
  |- package.json
  |- /src
+   |- app.vue
```

**app.vue**

``` html
<template>
<router-view/>
</template>
```

`<router-view>` 组件由 vue-router 模块提供，因此需要将其引入后再使用

**src/index.js**

``` javascript
import Vue from 'vue'

import router from './src/router'
import appView from './src/app.vue'

new Vue({
  router,
  render(h) { return h(appView) }
}).$mount('#app')
```

同时，在 src 目录中创建一个 router 目录，新建一个 index.js 文件放在 src/router 目录中

**project**

``` diff
  project-name
  |- package.json
  |- /src
+   |- /router
+     |- index.js
```

**src/router/index.js**

``` javascript
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: require('./src/views/index.vue').default
  },
]

const router = new VueRouter({
  routes
})

export default router
```

在 src 目录中创建一个 views 目录用来放置页面级别的 vue 文件，在 src/views 目录中新建一个 index.vue 文件作为首页，当路由地址为 `/` 时，`<router-view>` 组件内部就会渲染 index.vue 组件的内容

**project**

``` diff
  project-name
  |- package.json
  |- /src
+   |- /views
+     |- index.vue
```

**src/views/index.vue**

``` html
<template>
<div>
  <app-nav></app-nav>
  <section class="container">
    <p class="subtitle">这是首页</p>
  </section>
</div>
</template>
```

### 添加新页面

添加一个 login.vue 文件作为登录页

**project**

``` diff
  project-name
  |- package.json
  |- /src
    |- /views
+     |- login.vue
```

**src/views/login.vue**

``` html
<template>
<div>
  <app-nav></app-nav>
  <div class="container">
    <div class="column is-4 is-offset-4">
      <div class="card">
        <div class="card-content content">
          <form @submit.prevent="login" action="#" method="post">
            <h2>Login</h2>
            <div class="field">
              <label class="label">Name</label>
              <div class="control">
                <input class="input" type="text" placeholder="Name" v-model="name">
              </div>
            </div>
            <div class="field">
              <label class="label">Password</label>
              <div class="control">
                <input class="input" type="password" placeholder="Password" v-model="password">
              </div>
            </div>
            <div class="field">
              <div class="control">
                <button class="button is-link" type="submit">Login</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</div>
</template>
```

配置登录页的路由

**src/router/index.js**

``` diff
  const routes = [
    {
      path: '/',
      component: require('./src/views/index.vue').default
    },
+   {
+     path: '/login',
+     component: require('./src/views/login.vue').default
+   },
  ]
```

访问 http://localhost:8080/#/login 即可显示登录页，也可点击导航访问

### 组件

`<app-nav>` 是自定义的组件，在 src 目录中创建一个 components 目录用于存放组件，在其中新建一个 nav.vue 文件

**project**

``` diff
  project-name
  |- package.json
  |- /src
+   |- /components
+     |- nav.vue
```

**src/components/nav.vue**

``` html
<template>
<nav class="navbar" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">
    <a class="navbar-item" href="https://bulma.io">
      <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28">
    </a>
    <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </a>
  </div>
  <div id="navbarBasicExample" class="navbar-menu">
    <div class="navbar-start">
      <router-link class="navbar-item" to="/">Home</router-link>
    </div>
    <div class="navbar-end">
      <div class="navbar-item">
        <div class="field is-grouped">
          <p class="control">
            <router-link class="button is-small is-info is-outlined" to="/login">
              <span>Login</span>
            </router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</nav>
</template>
```

在需要的地方引用该组件

**src/views/index.vue**

``` diff
+ import appNav from '../components/nav.vue'

  export default {
+   components: {
+     appNav
+   },
  }
```

### 别名

像 `./src/views/index.vue` 这种长路径写起比较麻烦，同时这种相对路径一旦文件的位置发生改变就需要跟着修改，可以在 webpack.config.js 中配置一个 alias 参数解决这个问题

**webpack.config.js**

``` diff
  module.exports = {
+   resolve: {
+     alias: {
+       '@': path.join(__dirname, 'src')
+     }
+   },
  }
```

上面的页面路径可以改写

**src/router/index.js**

``` diff
  const routes = [
    {
      path: '/',
-     component: require('./src/views/index.vue').default
+     component: require('@/views/index.vue').default
    },
    {
      path: '/login',
-     component: require('./src/views/login.vue').default
+     component: require('@/views/login.vue').default
    },
  ]
```

修改 index.js 中的引用路径

**src/index.js**

``` diff
- import router from './src/router'
- import appView from './src/app.vue'
+ import router from '@/router'
+ import appView from '@/app.vue'
```

### 配置 Babel

由于前面的代码使用了 ES2015 的语法，为了使项目兼容更多浏览器，需要用 [Babel](https://github.com/babel/babel) 对代码进行转换

执行 `npm install --save-dev @babel/core @babel/preset-env babel-loader`

**webpack.config.js**

``` diff
  module.exports = {
    module: {
      rules: [
+       {
+         test: /\.js$/,
+         exclude: /node_modules/, // 不用处理 node_modules 目录里面文件
+         use: [
+           {
+             loader: 'babel-loader'
+           }
+         ]
+       },
      ]
    }
  }
```

创建一个 .babelrc 文件（不知道怎么创建？可以直接从该项目中复制）

**project**

``` diff
  project-name
+ |- .babelrc
  |- package.json
```

**.babelrc**

``` json
{
  "presets": ["@babel/preset-env"]
}
```

这是 Babel 的配置文件，其转换的规则由这个文件定义

### 状态管理

在 src 目录中创建一个 store 目录，并在其中新建一个 index.js 文件

**project**

``` diff
  project-name
  |- package.json
  |- /src
+   |- /store
+     |- index.js
```

**src/store/index.js**

``` javascript
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {}
})
```

### HTTP 请求

使用 [Axios](https://github.com/axios/axios) 发送 HTTP 请求，Axios 是同构的，前后端通用，同时安装 [es6-promise](https://github.com/stefanpenner/es6-promise) polyfill 用以兼容更多设备

执行 `npm install --save axios es6-promise` 安装好后将两者都引入项目中

**src/index.js**

``` diff
+ import 'es6-promise/auto'
```

### 登录请求

**src/views/login.vue**

``` diff
export default {
  data() {
    return {
      name: '',
      password: ''
    }
  },
  components: { appNav },
  methods: {
    login() {
      this.$store.dispatch('login', {
        name: this.name,
        password: this.password
      })
    }
  }
}
```

在 store 文件中添加一个名为 login 的 action

**src/store/index.js**

``` diff
+ import axios from 'axios'

  export default new Vuex.Store({
    actions: {
+     login({commit}, user) {
+       return axios.post('/login', user).then(({data}) => {
+         console.log(data)
+       })
+     }
    }
  })
```

运行后当发出这个请求后会明显返回一个 404，那么如何让它返回有效的数据呢，在 webpack.config.js 里配置 `devServer` 参数在本地添加这个接口

**webpack.config.js**

``` diff
  module.exports = {
    devServer: {
+     before(app, server) {
+       app.post('/login', (req, res) => {
+         res.json({token: 'xxx'})
+       })
+     },
    }
  }
```

重新启动后，就可以看到请求 /login 地址成功返回了数据 `{"token": "xxx"}`，将返回的 token 数据保存在 state 里面

**src/store/index.js**

``` diff
  export default new Vuex.Store({
    state: {
+     user: null
    },
    mutations: {
+     user(state, user) {
+       state.user = user
+     }
    },
    actions: {
      login({ commit }, user) {
        return axios.post('/login', user).then(({data}) => {
-         console.log(data)
+         commit('user', {
+           name: user.name,
+           token: data.token
+         })
        })
      }
    }
  })
```

### 数据请求

另外，还可以用 `proxy` 参数将请求接口代理到其它地址去

**webpack.config.js**

``` diff
  module.exports = {
    devServer: {
+     proxy: {
+       '/api': {
+         target: 'http://localhost:3000',
+         pathRewrite: {'^/api' : ''}
+       }
+     },
    }
  }
```

这时，例如请求 /api/posts 实际上会被代理到 `http://localhost:3000/posts`，为了使这个地址生效，可以使用 json-server

执行 `npm install --save-dev json-server` 命令安装，并在项目根目录新建一个 db.json 文件用来保存数据

**project**

``` diff
  project-name
  |- .babelrc
+ |- db.json
```

**db.json**

``` json
{
  "posts": [
    {
      "title": "Lorem ipsum dolor sit amet",
      "content": "...",
      "id": 1
    }
  ]
}
```

在 package.json 文件对应的 `scripts` 处新增一条命令用来启动 json-server

**package.json**

``` diff
  {
    "scripts": {
      "dev": "webpack-dev-server",
      "build": "webpack",
+     "db": "json-server --watch db.json"
    }
  }
```

执行 `npm run db` 命令然后在浏览器中访问 http://localhost:3000/posts 地址即可看见 db.json 中保存的数据

### 打包

配置 mode 参数

**webpack.config.js**

``` diff
  module.exports = {
-   mode: 'development',
+   mode: 'production',
    // ...
  }
```

`production` 和 `development` 两种 mode 参数很明显，`production` 用于发布，`development` 用于开发，具体有什么区别，看这里 [Click here](https://webpack.js.org/configuration/mode/)

执行 `npm run build` 即可打包，打包后生成的文件都在 dist 目录中

### 服务端渲染

TODO

### 更多

* [在 Webpack 项目中配置支持 async/await](https://github.com/xyzhanjiang/assets/tree/master/js/es2015/async-await/)
