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

# Install Webpack and all dependencies for the project
yarn install

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
Put your logo to ``` src/favicon/logo.png ``` for Webpack to create favicons based on your logo

### Watching project and livereloading
``` watch.cmd ``` — If you run Windows

### Building project
You can build project from browser by adding ```?build=prod``` or ```?build=dev``` to the url
