# Form

表单相关

## setCustomValidity

自定义校验信息，调用该方法会使表单元素的 `validity.customError` 属性变为 `true`，造成该表单元素无法通过校验，所以需要在适当的时候再次调用该方法并传入一个空字符串值，这里选择了 `oninput` 事件

``` html
<input oninput="setCustomValidity('')" oninvalid="setCustomValidity('请输入')" required type="text">
```

