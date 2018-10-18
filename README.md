# Webpack 4 Config 
Webpack 4 config for starting a web-page design from scratch. It helps with rapid CSS styling and JS inclusion. 

### Prerequisites
You should have ```PHP 5.4.0+``` available on your cli. Check it out by running
```
php -v
```

### Installation
```sh 
# Clone project
git clone https://github.com/ossipov/webpack4php

# Install Webpack
yarn add fs webpack webpack-cli webpack-livereload-plugin --dev

# Install Babel support
yarn add babel-cli babel-core babel-preset-env babel-register --dev

# JS / CSS / SASS
yarn add css-loader sass-loader node-sass csso-webpack-plugin favicons-webpack-plugin mini-css-extract-plugin postcss-loader postcss-modules --dev
```

### Include CSS / JS libraries you want to use
#### Bulma example
```
yarn add bulma --dev
```
edit ```src/sass/app.sass``` to include needed styles
```scss
@import 'node_modules/bulma/scss/bulma.scss';
```

#### jQuery example
```
yarn add jquery --dev
```
edit ```src/js/app.js``` to include jQuery
```js
import $ from 'jquery'; 
console.log('hello');
$(function() {
  $('body').css('color', 'blue');
});
```

### Favicons creation
Put your logo to ``` src/favicon/logo.png ``` for webpack to create favicons based on your logo


### Watching project and livereloading
``` watch.cmd ``` — If you run Windows

``` yarn run watch ``` — Starting Webpack to see if there are changes in css / js files

```cd public && php -s loacalhost:5050``` — start php server in public directory

### Building project
``` yarn run build ```— this will build and minify css / jss (will also obfuscate css classes)
```cd public && php -s loacalhost:5050``` — start php server in public directory


