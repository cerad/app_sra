<?php
$uri = $_SERVER["REQUEST_URI"];

if (is_file('.' . $uri)) return false;

require 'app.php';