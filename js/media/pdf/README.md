# pdf.js

[pdf.js](https://github.com/mozilla/pdf.js)

Installation via npm: `npm install pdfjs-dist --save`

Usage

``` javascript
var pdfjsLib = require('pdfjs-dist/webpack')

var loadingTask = pdfjsLib.getDocument(url)
loadingTask.promise.then(function(pdfDocument) {

  return pdfDocument.getPage(1).then(function(pdfPage) {

    var viewport = pdfPage.getViewport(1.0)
    var canvas = document.getElementById('canvas')
    canvas.width = viewport.width
    canvas.height = viewport.height
    var ctx = canvas.getContext('2d')
    var renderTask = pdfPage.render({
      canvasContext: ctx,
      viewport: viewport
    })
    return renderTask.promise
  })
}).catch(function(reason) {
  console.error('Error: ' + reason)
})
```
