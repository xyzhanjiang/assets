# Front-end Solutions

only for my work.

* [CanIuse](http://caniuse.com/)
* [HTML5 Boilerplate](https://html5boilerplate.com/)
* [HTML5 Please](http://html5please.com/)
* [Modernizr](https://modernizr.com) is a JavaScript library that detects HTML5 and CSS3 features in the user’s browser.

## CSS

### Style Guide 

[Airbnb CSS / Sass Styleguide](https://github.com/airbnb/css).

See other: [Idiomatic CSS](https://github.com/necolas/idiomatic-css), [Code Guide by @mdo](http://mdo.github.io/code-guide/#css).

### Normalize/Reset

[Normalize.css](http://necolas.github.io/normalize.css/) is a customisable CSS file that makes browsers render all elements more consistently and in line with modern standards.

### Effect

* [Animate.css](http://daneden.github.io/animate.css/) is a bunch of cool, fun, and cross-browser animations for you to use in your projects. Great for emphasis, home pages, sliders, and general just-add-water-awesomeness.
* [Hover.css](http://ianlunn.github.io/Hover/). A collection of CSS3 powered hover effects to be applied to links, buttons, logos, SVG, featured images and so on. Easily apply to your own elements, modify or just use for inspiration. Available in CSS, Sass, and LESS.
* [iHover](http://gudh.github.io/ihover/dist/index.html) is a collection of hover effects using pure CSS, inspired by codrops article, powered by Sass.

### CSS Pre-processor

#### Less

[Less](http://lesscss.org) is a CSS pre-processor, meaning that it extends the CSS language, adding features that allow variables, mixins, functions and many other techniques that allow you to make CSS that is more maintainable, themable and extendable.

#### Sass

* [Sass](http://sass-lang.com) is the most mature, stable, and powerful professional grade CSS extension language in the world.
* [Compass](http://compass-style.org) is a Stylesheet Authoring Environment that makes your website design simpler to implement and easier to maintain.
* [Bourbon](http://bourbon.io) is a simple and lightweight mixin library for Sass.
* [Susy](http://susy.oddbird.net/), Responsive layout toolkit for Sass.
* [SassMeister](http://www.sassmeister.com/)

See other: [Stylus](http://stylus-lang.com) expressive, dynamic, robust css.

### Icon Font

* [Font-Awesome](http://fontawesome.io) gives you scalable vector icons that can instantly be customized — size, color, drop shadow, and anything that can be done with the power of CSS.

## JavaScript

### Style Guide

[Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript).

### Bundlers

[Webpack](https://webpack.github.io) - Packs CommonJs/AMD modules for the browser, `$ npm install webpack --save-dev`.

### altJS

#### CoffeeScript

[CoffeeScript](http://coffeescript.org) is a little language that compiles into JavaScript, `$ npm install -g coffee-script`.

#### Babel

[Babel](https://babeljs.io/) is a compiler for writing next generation JavaScript.

Installation for Webpack, `$ npm install --save-dev babel-loader babel-core`.

Usage:

``` javascript
var Person = require("babel!./Person.js").default;
new Person();
```

### Compressor

* [UglifyJS 2](http://lisperator.net/uglifyjs/) is a JavaScript parser, minifier, compressor or beautifier toolkit, `$ npm install uglify-js -g`.

### Legacy

Can support for IE 6.

#### jQuery 1.x

[jQuery](http://jquery.com) is a fast, small, and feature-rich JavaScript library.

##### jQuery Plugins

* [jQuery Validation Plugin](http://jqueryvalidation.org) Form validation with jQuery.
* [noty](http://ned.im/noty) is a jQuery notification plugin that makes it easy to create alert - success - error - warning - information - confirmation messages as an alternative the standard alert dialog.
* [Timeago](http://timeago.yarp.com) is a jQuery plugin that makes it easy to support automatically updating fuzzy timestamps (e.g. "4 minutes ago").
* [jQuery Mockjax](https://github.com/jakerella/jquery-mockjax) provides a simple and extremely flexible interface for mocking or simulating ajax requests and responses.

#### Backbone

[Backbone.js](http://backbonejs.org) gives structure to web applications by providing models with key-value binding and custom events, collections with a rich API of enumerable functions, views with declarative event handling, and connects it all to your existing API over a RESTful JSON interface.

##### Dependencies

* [JSON2.js](https://github.com/douglascrockford/JSON-js/blob/master/json2.js)
* [jQuery 1.x](http://jquery.com)
* [Underscore.js](http://underscorejs.org)

Installation, `$ npm install --save backbone`.

Usage:

``` javascript
var Backbone = require('backbone');
Backbone.$ = require('jquery');
```

#### Mithril

[Mithril](http://mithril.js.org) is a client-side MVC framework - a tool to organize code in a way that is easy to think about and to maintain.

##### Compatibility

* [es5-shim](https://github.com/es-shims/es5-shim)
* [JSON2.js](https://github.com/douglascrockford/JSON-js/blob/master/json2.js)

#### Utils

* [is.js](http://is.js.org) is a general-purpose check library. `npm install is_js`
* [Feature.js](http://featurejs.com) is a fast, simple and lightweight browser feature detection library.

#### Plugins

* [spin.js](http://spin.js.org), An animated CSS3 loading spinner with VML fallback for IE.

#### Templates

* [Handlebars.js](http://handlebarsjs.com) is an extension to the Mustache templating language.

#### Polyfill

* [EasyXDM](http://easyxdm.net/wp/) is a Javascript library that enables you as a developer to easily work around the limitation set in place by the Same Origin Policy, in turn making it easy to communicate and expose javascript API’s across domain boundaries.
* [History.js](https://browserstate.github.com/history.js/demo/) gracefully supports the HTML5 History/State APIs (pushState, replaceState, onPopState) in all browsers.
* [store.js](https://github.com/marcuswestin/store.js) exposes a simple API for cross browser local storage.
* [Selectivizr](http://selectivizr.com) is a JavaScript utility that emulates CSS3 pseudo-classes and attribute selectors in Internet Explorer 6-8.

### Now

Can support for IE 8.

#### jQuery Plugins

* [Select2](https://select2.github.io) is a jQuery based replacement for select boxes. It supports searching, remote data sets, and infinite scrolling of results.

#### Bootstrap

[Bootstrap](http://getbootstrap.com) is the most popular HTML, CSS, and JS framework for developing responsive, mobile first projects on the web.

##### Compatibility

* [Respond.js](https://github.com/scottjehl/Respond), a fast & lightweight polyfill for min/max-width CSS3 Media Queries (for IE 6-8, and more).

##### Extend

* [bootstrap-datepicker](http://eternicode.github.io/bootstrap-datepicker/)
* [Bootstrap Timepicker](http://jdewit.github.io/bootstrap-timepicker/)

#### AngularJS

[AngularJS](https://angularjs.org)

* [Angular Style Guide](https://github.com/johnpapa/angular-styleguide)

#### Template

* [Jade](http://jade-lang.com) is a high performance template engine heavily influenced by Haml and implemented with JavaScript for node and browsers.
* [Mustache](http://mustache.github.com/) is a logic-less template syntax.

### Future

Not support for IE 8.

#### jQuery 2.x

[jQuery](http://jquery.com) is a fast, small, and feature-rich JavaScript library.

#### React

[React](https://facebook.github.io/react/) - A declarative, efficient, and flexible JavaScript library for building user interfaces.

Installation, `$ npm install --save react react-dom`.

Usage:

``` javascript
var React = require('react');
var ReactDOM = require('react-dom');
```

#### D3.js

[D3.js](https://d3js.org) is a JavaScript library for manipulating documents based on data.

#### Vue.js

[Vue.js](http://vuejs.org) is a library for building interactive web interfaces.

### Mobile

* [Ratchet](http://goratchet.com). Build mobile apps with simple HTML, CSS, and JS components.
* [ionic](http://ionicframework.com) is the open source HTML5 Mobile Framework for building amazing, cross-platform hybrid native apps and mobile websites with HTML, JavaScript, and CSS.
* [Hammer.js](http://hammerjs.github.io), A javascript library for multi-touch gestures.

#### Zepto

[Zepto](http://zeptojs.com) is a minimalist JavaScript library for modern browsers with a largely jQuery-compatible API.

## Interview

[Front-end Job Interview Questions](https://github.com/h5bp/Front-end-Developer-Interview-Questions).