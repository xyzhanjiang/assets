# In Action

全弹发射

## HTML

### <a name="doctype">HTML5 文档类型声明</a>

``` html
<!DOCTYPE html>
<html lang="zh-CN">
```

### <a name="conditional-comments">IE Conditional Comments</a>

``` html
<!--[if (lt IE 9) & (!IEMobile)]>
<script src="js/respond.min.js"></script>
<![endif]-->
```

IE 中的条件注释(Conditional comments)对 IE 的版本和 IE 非 IE 有优秀的区分能力，是 WEB 设计中常用的 hack 方法，推荐使用。

lt = 小于，lte = 小于等于，gt = 大于，gte = 大于等于

Internet Explorer 10 浏览器删除了对条件注释的支持，参考 [不再支持条件注释](https://msdn.microsoft.com/zh-cn/library/ie/hh801214.aspx)

## CSS

#### Timing Function

抖动效果的贝塞尔曲线：`cubic-bezier(0.68, -0.55, 0.27, 1.55)`

## JavaScript

### <a name="package">Package</a>

[npm](https://www.npmjs.com/)

[Node](https://nodejs.org/en/) 安装完成后 npm 也安装好了

如果使用 npm 安装模块因为网络原因安装不成功，可以使用 [cnpm](https://npm.taobao.org)，例如

``` shell
npm install gulp-cli --global --registry=https://registry.npm.taobao.org
```

### <a name="bundler">Bundler</a>

* [Webpack](https://github.com/xyzhanjiang/assets/tree/master/js/bundler/webpack/)

### <a name="blog">Blog</a>

部落格

* [处理异步](https://github.com/xyzhanjiang/assets/tree/master/js/async/)
* [文件上传](https://github.com/xyzhanjiang/assets/tree/master/js/upload/)
* [Http 请求](https://github.com/xyzhanjiang/assets/tree/master/js/http-request/)
* [Modal](https://github.com/xyzhanjiang/assets/tree/master/js/modal/)
* [Spin](https://github.com/xyzhanjiang/assets/tree/master/js/spin/)
* [客户端存储](https://github.com/xyzhanjiang/assets/tree/master/js/storage/)
* [常用 JavaScript 判断](https://github.com/xyzhanjiang/assets/tree/master/js/core/is/)
* [那些啰儿八嗦的 JavaScript 代码](https://github.com/xyzhanjiang/assets/tree/master/js/core/verbose/)
* [从零开始使用 Webpack 搭建 Vue 开发环境](https://github.com/xyzhanjiang/assets/tree/master/js/bundler/webpack/vue)
* [从零开始使用 Webpack 搭建 React 开发环境](https://github.com/xyzhanjiang/assets/tree/master/js/bundler/webpack/react)
* [让 Webpack 项目兼容 IE8](https://github.com/xyzhanjiang/assets/tree/master/js/bundler/webpack/ie8)
* [在 Webpack 项目中配置 Babel](https://github.com/xyzhanjiang/assets/tree/master/js/es2015/babel/)
* [在 Webpack 项目中配置支持 async/await](https://github.com/xyzhanjiang/assets/tree/master/js/es2015/async-await/)
* [在 Webpack 项目中使用 Handlebars](https://github.com/xyzhanjiang/assets/tree/master/js/template/handlebars/)
