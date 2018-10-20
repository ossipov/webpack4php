<?php require('../bootstrap.php')
?><!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
  <link rel="stylesheet" href="<?= $asset->css ?>">
  <?= $favicons ?> 
  <?// don't forget to remove on production --------------- ?>
  <script src="http://localhost:35729/livereload.js"></script>
  <?// ---------------------------------------------------- ?>
</head>
<body>



<h1>PHP here</h1>
<div class="<?=_('primary')?>">Primary</div>



<script src="<?= $asset->js ?>"></script>
</body>
</html>