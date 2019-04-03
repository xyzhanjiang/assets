# jQuery

当前最新版本(@3)兼容到 IE9+，如果需要兼容 IE6-8 使用 v1.12

事件节流

``` javascript
$(() => {
  let timer = 0
  $(window).scroll(() => {
    if (!timer) {
      timer = setTimeout(() => {
        // dosomething()
        timer = 0
      }, 150)
    }
  })
})
```

### <a name="jquery-plugins">jQuery plugins</a>

* [jQuery Validation Plugin](https://github.com/xyzhanjiang/assets/tree/master/js/jquery/plugins/jquery-validation/)
* [slick](https://github.com/xyzhanjiang/assets/tree/master/js/jquery/plugins/slick/)
* [jquery-confirm](https://github.com/xyzhanjiang/assets/tree/master/js/jquery/plugins/jquery-confirm/)
