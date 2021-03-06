<?php
// Check if we ask to rebuild project from browser for production or development environment
if( in_array('build', array_keys($_GET)) ) {
  if( $_GET['build'] == 'prod' ) exec('yarn run build');
  elseif( $_GET['build'] == 'dev' ) exec('yarn run dev');
  header('Location: '.reset(explode("?", $_SERVER['REQUEST_URI'])));
}

// check current environment
if( glob(realpath(__DIR__.'\public\assets\css').'\*.map') )
  $env = 'dev';
else 
  $env = 'prod';

// getting assets from generated json
$asset = json_decode(file_get_contents(realpath(__DIR__.'/src/assets.json')))->main;
$favicons = implode("\r\n  ", json_decode(file_get_contents(realpath(__DIR__.'/src/favicon/favicons.json')))->html );

// function to replace css class names generated by postcss-modules
function _($class) {
  global $env;

  $class_array = json_decode(file_get_contents(realpath(__DIR__.'/src/sass/app.sass.json')));
  $class_mod = array_key_exists($class, $class_array) ? $class_array->$class : $class;

  return ($env == 'dev') ? $class : $class_mod;
}