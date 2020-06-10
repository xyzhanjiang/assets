## Webpack 开发

从零开始使用 Webpack 搭建 Vue 开发环境

### 创建项目

使用 [Create-react-app](#create-react-app) 跳过

首先需要创建一个空目录，在该目录打开命令行，执行 `npm init` 命令创建一个项目（无法执行 npm 命令？需要先安装 [Node](https://nodejs.org/en/)），这个过程会提示输入一些内容，随意输入就行，完成后会自动生成一个 package.json 文件，里面包含了刚才输入的那些内容，其实这个步骤就只是生成一个 package.json 文件而已，手动创建也可以

然后创建一个 index.html 页面，内容也很简单，就只有一个 div#app

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
<title>Forum</title>
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

Webpack 相关的配置都写在这个文件里面，Webpack 会根据这个配置文件进行打包，该文件导出一个对象

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

entry 属性告诉 webpack 哪个是应用的主入口

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

项目中肯定会用到 CSS，首先新建一个 style.css 样式文件，放在 src/css 目录中，项目中的样式就可以写在这里面，本示例不会写任何样式，所以这个文件是空的

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

### 配置 Babel

在项目中使用 ES2015 语法，为了使项目兼容更多浏览器，需要用 [Babel](https://github.com/babel/babel) 对代码进行转换

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

### 安装 React

执行 `npm install --save-dev @babel/preset-react` 安装开发依赖

执行 `npm install --save react react-dom` 安装项目依赖

React 拆分成了两个包，react 和 react-dom，react 是核心，与浏览器相关的特性都放在了 react-dom 中，这样做的好处是核心可以应用于不同的平台，比如移动端平台的 React Native

@babel/preset-react 用于编译 JSX 语法，在 .babelrc 文件中增加配置

**.babelrc**

``` diff
  {
-   "presets": ["@babel/preset-env"]
+   "presets": ["@babel/preset-env", "@babel/preset-react"]
  }
```

在 src 目录下新建一个 app.js 文件作为根组件

**project**

``` diff
  project-name
  |- package.json
  |- /src
+   |- app.js
```

**src/app.js**

``` js
import React from 'react'

export default () => (
  <div className="container">Hello world!</div>
)
```

PS. 在 JSX 中 `class="container"` 要写成 `className="container"`，因为 class 是 JavaScript 的保留字，这和 DOM 是一致的

函数体内只有一条语句的箭头函数可以省略 return 关键字和函数体的花括号，但是省略后的函数体不能单独起行，因此需要添加一对小括号包裹函数体，并且左小括号和箭头位于同一行

**src/app.js**

``` js
import React from 'react'

export default () => (
  <div className="container">Hello world!</div>
)
```

在入口文件中引入 App 组件并渲染在页面上

**src/index.js**

``` javascript
import React from 'react'
import ReactDOM from 'react-dom'

import App from './src/app'

ReactDOM.render(<App/>, document.getElementById('app'))
```

启动服务，访问 localhost:8080 即可

### <a name="create-react-app">Create-react-app</a>

如果使用 Create-react-app 来创建项目可以跳过前面所有步骤，通过 Create-react-app 创建项目直接执行 `npm init react-app project-name` 就可以

### Polyfill

React 依赖 ES2015 的 Map 和 Set，如需要兼容旧浏览器需要 polyfill

执行 `npm install --save core-js` 安装并在项目中引用，这些引用应该在入口文件最开始的地方

**src/index.js**

``` javascript
import 'core-js/features/set'
import 'core-js/features/map'
```

### 路由

执行 `npm install --save react-router-dom` 安装

**src/app.js**

``` js
import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom'

export default () => {
  return (
    <Router>
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <Link className="navbar-item" to="/">Home</Link>
        <Link className="button is-small is-info is-outlined" to="/login">
          <span>Login</span>
        </Link>
      </nav>
      <Switch>
        <Route path="/login">
          <div>Login</div>
        </Route>
        <Route path="/">
          <div>Home</div>
        </Route>
      </Switch>
    </Router>
  )
}
```

在 src 目录中创建一个 views 目录用来放置页面级别的组件文件，在 src/views 目录中新建一个 index.js 文件作为首页

**project**

``` diff
  project-name
  |- package.json
  |- /src
+   |- /views
+     |- index.js
```

**src/views/index.js**

``` javascript
import React from 'react'

export default () => {
  return (
    <section className="container">
      <p className="subtitle">Home</p>
    </section>
  )
}
```

将内容替换为组件，当路由地址为 `/` 时，就会渲染 Index 组件的内容

**src/app.js**

``` diff
+ import Index from './views/index'

  <Switch>
    <Route path="/login">
      <div>Login</div>
    </Route>
    <Route path="/">
-     <div>Home</div>
+     <Index/>
    </Route>
  </Switch>
```

### 添加新页面

添加一个 login.js 文件作为登录页

**project**

``` diff
  project-name
  |- package.json
  |- /src
    |- /views
+     |- login.js
```

**src/views/login.js**

``` javascript
import React from 'react'

export default () => {
  return (
    <section className="container">
      <p className="subtitle">Login</p>
    </section>
  )
}
```

将登录页也替换为组件

**src/app.js**

``` diff
+ import Login from './views/login'

  <Switch>
    <Route path="/login">
-     <div>Login</div>
+     <Login/>
    </Route>
    <Route path="/">
      <Index/>
    </Route>
  </Switch>
```

访问 http://localhost:8080/login 即可显示登录页，也可点击导航访问

由于路由使用的是 history 模式，在 http://localhost:8080/login 地址下刷新页面会返回 404 错误，需要在 webpack.config.js 中配置一个 devServer 参数

**webpack.config.js**

``` diff
  module.exports = {
    output: {
      filename: 'index.js',
      path: path.resolve(__dirname, 'dist'),
+     publicPath: '/'
    },
    devServer: {
+     historyApiFallback: true,
    },
  }
```

重新启动即可

### 别名

在 webpack.config.js 中配置一个 alias 参数

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

### HTTP 请求

使用 [Axios](https://github.com/axios/axios) 发送 HTTP 请求，Axios 是同构的，前后端通用，同时安装 [es6-promise](https://github.com/stefanpenner/es6-promise) polyfill 用以兼容更多设备

执行 `npm install --save axios es6-promise` 安装好后将两者都引入项目中

**src/index.js**

``` diff
+ import 'es6-promise/auto'
```

### 登录请求

重写登录组件，页面中是一个包含两个字段的表单，当表单提交的时候执行 handleSubmit

**src/views/login.js**

``` html
<form action="#" method="post" onSubmit={handleSubmit}></form>
```

在 handleSubmit 中阻止浏览器的默认行为，并向 /login 地址发送请求，提交 name 和 password 字段

**src/views/login.js**

``` javascript
function handleSubmit(e) {
  e.preventDefault()
  axios.post('/login', {
    name,
    password
  }).then(({ data }) => {
    console.log(data)
  })
}
```

定义 name 和 password 字段

**src/views/login.js**

``` javascript
import React, { useState } from 'react'

export default (props) => {
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
}
```

给文本输入框绑定 change 事件，当输入框的值发生改变的时候更新对应的字段

**src/views/login.js**

``` html
<input onChange={({ target }) => setName(target.value)}/>
```

PS. 在 JSX 中像 input 这种自闭合元素不能省略闭合斜线，要写成 `<input/>` 的形式

完整的登录组件

**src/views/login.js**

``` javascript
import React, { useState } from 'react'
import axios from 'axios'

export default () => {
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    axios.post('/login', {
      name,
      password
    }).then(({ data }) => {
      console.log(data)
    })
  }

  return (
    <div className="container">
      <form action="#" method="post" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <input
          className="input"
          name="name"
          onChange={({ target }) => setName(target.value)}
          type="text"
          placeholder="Name"/>
        <input
          className="input"
          name="password"
          onChange={({ target }) => setPassword(target.value)}
          type="password"
          placeholder="Password"/>
        <button className="button is-link" type="submit">Login</button>
      </form>
    </div>
  )
}
```

PS. 当一个元素属性很多的时候可以写成多行

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

重新启动后，就可以看到请求 /login 地址成功返回了数据 `{"token": "xxx"}`

### 组件间通信

Login 组件登录成功后得到用户信息，但是这里 Login 组件并不需要这些信息，将它们传递给 App 组件

首先在 App 组件中定义一个 user 字段，用来保存用户信息，再定义一个 login 函数并传递给 Login 组件

**src/App.js**

``` diff
const [user, setUser] = useState(null)

function login(data) {
  setUser(data)
}

<Login login={login}/>
```

在 Login 组件中通过 props 属性接收这个函数

**src/views/login.js**

``` diff
- export default () => {
+ export default (props) => {
    function handleSubmit(e) {
      e.preventDefault()
      axios.post('/login', {
        name,
        password
      }).then(({ data }) => {
-       console.log(data)
+       props.login({
+         name,
+         ...data
        })
      })
    }
  }
```

在 App 组件中根据是否登录展示不同信息

``` diff
{user ? <div className="navbar-item has-dropdown is-hoverable">
  <a className="navbar-link">{user.name}</a>
  <div className="navbar-dropdown">
    <a className="navbar-item" href="/logout">Logout</a>
  </div>
</div> : <Link className="button is-small is-info is-outlined" to="/login">
           <span>Login</span>
         </Link>}
```

在 JSX 中条件语句可以使用三元运算符来实现

### 数据请求

在 Index 组件中初始化一个 posts 数组，用来保存从服务器获取的数据

**src/views/index.js**

``` diff
import React, { useState, useEffect } from 'react'

export default () => {
  const [posts, setPosts] = useState([])
  // ...
}
```

请求 /posts 地址获取数据

**src/views/index.js**

``` diff
import React, { useState, useEffect } from 'react'

export default () => {
  const [posts, setPosts] = useState([])
  useEffect(() => {
    let ignore = false
    async function fetchData() {
      const { data } = await axios.get(`/api/posts`)
      if (!ignore) setPosts(data)
    }

    fetchData()
    return () => ignore = true
  }, [])
}
```

此时需要 /posts 地址来返回数据，在 webpack 配置文件中用 `proxy` 参数将请求接口代理到其它地址去

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
      "author": "velit",
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
+     "db": "json-server --watch db.json"
    }
  }
```

执行 `npm run db` 命令然后在浏览器中访问 http://localhost:3000/posts 地址即可看见 db.json 中保存的数据

在 Index 组件中遍历数据并展示

**src/views/index.js**

``` diff
<div className="content">
  {posts.map((post) => (
    <article className="box" key={post.id}>
      <h4><Link to={`/api/posts/${post.id}`}>{post.title}</Link></h4>
      <p>
        <a href="#">@{post.author}</a>
      </p>
    </article>
  ))} 
</div>
```

在 JSX 中循环语句可以通过数组的 map 方法实现，另外不要忘记给循环的元素添加一个唯一的 key 属性，Link 组件由 react-router-dom 提供，因此需要引入

**src/views/index.js**

``` diff
+ import { Link } from 'react-router-dom'
```

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
