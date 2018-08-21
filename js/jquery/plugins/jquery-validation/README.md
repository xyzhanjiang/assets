# jQuery Validation Plugin

[jQuery Validation Plugin](https://github.com/jquery-validation/jquery-validation), installation via npm: `npm install jquery-validation --save`

显示特定的错误提示，使用 `showErrors` 方法：

``` javascript
validator.showErrors({
  username: 'message'
})
```

多个字段使用相同的 `name` 属性时，添加 `class` 校验规则：

``` javascript
$.validator.addClassRules('js-input-required', {
  required: true
})
```

使用时只需要给元素添加这个 class 就能对该元素应用这个校验规则：

``` html
<input class="js-input-required" name="username" type="text">
<input class="js-input-required" name="username" type="text">
```
