# Meta

## 定义文档字符集

``` html
<meta charset="utf-8">
```

通常来说 UTF-8 编码是最好的选择，它包含所有语言中所有字符的通用字符集

## IE 渲染模式

``` html
<meta http-equiv="X-UA-Compatible" content="IE=edge">
```

在网站里增加这个 Meta 元素，使 IE 浏览器以最新的模式渲染页面

## 国产双核浏览器渲染模式

``` html
<meta name="renderer" content="webkit">
```

在网站里增加这个 Meta 元素，告诉360浏览器这个网址应该用哪个内核渲染，那么360浏览器就会在读取到这个标签后，立即切换对应的内核。并将这个行为应用于这个二级域名下所有网址

## 响应式布局

``` html
<meta name="viewport" content="width=device-width, initial-scale=1">
```
