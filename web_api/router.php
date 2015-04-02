<?php
$uri = $_SERVER["REQUEST_URI"];

if (file_exists('.' . $uri)) return false;

require 'api.php';