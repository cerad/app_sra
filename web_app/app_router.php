<?php
$uri = $_SERVER["REQUEST_URI"];

// echo sprintf("URI: %s<br>" ,$uri);

// TODO: Figure your why / matches this
if ($uri != '/' && file_exists('.' . $uri)) return false;

require 'app.php';