# 开始一个项目

### 安装 Node.js

访问 [http://nodejs.org](https://nodejs.org/en/)，下载最新版 Node.js 安装，安装完成后 npm (Node Package Manager) 也安装好了。

### 安装 [Gulp](http://gulpjs.com)

通过 npm 安装：

``` shell
$ npm install --global gulp-cli
```

--global 参数表示全局安装，这样安装之后才能执行 gulp 命令。

如果因为网络原因安装不成功，使用 [cnpm](https://npm.taobao.org)：

``` shell
$ npm install gulp-cli --global --registry=https://registry.npm.taobao.org
```

### 创建目录

初始化项目目录

``` shell
$ npm init
```

执行该命令后会生成一个 package.json 文件，该文件用于指明项目依赖的包，以及一些元信息，例如项目名称、版本、描述和作者等等。

在项目根目录下面创建 src 目录放源代码，创建 dist 目录放打包后的代码：

```
.
├── dist                      # 打包目录
├── src                       # 源码目录
├── package.json              # 配置文件
└── README.md                 # 项目说明
```

### 本地安装 Gulp 模块

``` shell
$ npm install --save-dev gulp
```

--save-dev 参数表示这是开发阶段依赖的模块，安装完成后它会自动将该依赖写入 package,json 文件：

``` javascript
{
  "name": "project-name",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "devDependencies": {
    "gulp": "^3.9.1"
  },
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "by.Genesis",
  "license": "MIT"
}
```

模块会安装到项目的 node_modules 目录里。

在项目根目录下面创建一个 gulpfile.js 文件：

``` javascript
const gulp = require('gulp');

gulp.task('default', () => {

});
```

执行该命令(目前这个命令什么事都不会做)：

``` shell
$ gulp default
```

### 使用 [Sass](http://sass-lang.com) 预处理 CSS

安装 [gulp-sass](https://github.com/dlmanning/gulp-sass) 模块：

``` shell
$ npm install --save-dev gulp-sass
```

在 gulpfile.js 中添加代码：

``` javascript
const gulp = require('gulp');
const sass = require('gulp-sass');

gulp.task('css', () =>
  gulp.src('src/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('dist'))
);
```

### 使用 [Autoprefixer](https://twitter.com/autoprefixer) 添加浏览器厂商前缀

Autoprefixer 使用 [CanIuse](http://caniuse.com/) 的数据来决定哪些前缀是需要的。

安装 [gulp-autoprefixer](https://github.com/sindresorhus/gulp-autoprefixer) 模块：

``` shell
$ npm install --save-dev gulp-autoprefixer
```

在 gulpfile.js 中添加代码：

``` javascript
const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');

gulp.task('css', () =>
  gulp.src('src/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(gulp.dest('dist'))
);
```

### 压缩 CSS

使用 [cssnano](http://cssnano.co) 压缩 CSS 代码。

安装 [gulp-cssnano](https://github.com/ben-eb/gulp-cssnano) 模块：

``` shell
$ npm install --save-dev gulp-cssnano
```

在 gulpfile.js 中添加代码：

``` javascript
const gulp = require('gulp');
const sass = require('gulp-sass');
const cssnano = require('gulp-cssnano');

gulp.task('css', () =>
  gulp.src('src/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(cssnano({
      autoprefixer: false
    }))
    .pipe(gulp.dest('dist'))
);
```

### 同时生成未压缩代码

安装 [gulp-rename](https://github.com/hparra/gulp-rename) 模块：

``` shell
$ npm install --save-dev gulp-rename
```

在 gulpfile.js 中添加代码：

``` javascript
const gulp = require('gulp');
const sass = require('gulp-sass');
const cssnano = require('gulp-cssnano');
const rename = require('gulp-rename');

gulp.task('css', () =>
  gulp.src('src/sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('dist'))
    .pipe(cssnano({
      autoprefixer: false
    }))
    .pipe(rename({
      suffix: '.min',
    }))
    .pipe(gulp.dest('dist'))
);
```

### Source Maps

安装 [gulp-sourcemaps](https://github.com/floridoo/gulp-sourcemaps) 模块：

``` shell
$ npm install --save-dev gulp-sourcemaps
```

在 gulpfile.js 中添加代码：

``` javascript
const gulp = require('gulp');
const sass = require('gulp-sass');
const cssnano = require('gulp-cssnano');
const sourcemaps = require('gulp-sourcemaps');

gulp.task('css', () =>
  gulp.src('src/sass/**/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(cssnano({
      autoprefixer: false
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('dist'))
);
```

### [Babel](https://babeljs.io/)

使用 Babel 来编译 ES2015 代码。

安装 [gulp-babel](https://github.com/babel/gulp-babel) 模块：

``` shell
$ npm install --save-dev gulp-babel babel-preset-es2015
```

在 gulpfile.js 中添加代码：

``` javascript
const gulp = require('gulp');
const babel = require('gulp-babel');

gulp.task('js', () =>
  gulp.src('src/js/app.js')
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(gulp.dest('dist'))
);
```

### 压缩 JavaScript

使用 [UglifyJS 2](http://lisperator.net/uglifyjs/) 压缩 JavaScript 代码。

安装 [gulp-uglify](https://github.com/terinjokes/gulp-uglify) 模块：

``` shell
$ npm install --save-dev gulp-uglify
```

在 gulpfile.js 中添加代码：

``` javascript
const gulp = require('gulp');
const uglify = require('gulp-uglify');

gulp.task('css', () =>
  gulp.src('src/js/app.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist'))
);
```

### [Webpack](https://webpack.github.io)

使用 Webpack 打包代码。

安装 [webpack-stream](https://github.com/shama/webpack-stream) 模块：

``` shell
$ npm install --save-dev webpack-stream
```

在 gulpfile.js 中添加代码：

``` javascript
const gulp = require('gulp');
const webpack = require('webpack-stream');

gulp.task('js', () =>
  gulp.src('src/js/app.js')
    .pipe(webpack(require('./webpack.config.js')))
    .pipe(gulp.dest('dist/'))
);
```

### [jQuery](http://jquery.com)

安装 jQuery 模块：

``` shell
$ npm install --save jquery@1.12.4
```

选装模块：

* 表单校验：[jQuery Validation Plugin](http://jqueryvalidation.org)

  ``` shell
  $ npm install --save jquery-validation@1.14.0
  ```

  使用示例：

  ``` javascript
  require('jquery-validation');

  $('form').validate({
    submitHandler: function(form) {
      form.submit()
    }
  });
  ```
