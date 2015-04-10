<?php
$uri = $_SERVER["REQUEST_URI"];

if (file_exists('.' . $uri)) return false;

$stdout = fopen('php://stdout', 'w');

fwrite($stdout, 'XXX ' . $uri . "\n");

fclose($stdout);

require 'api.php';