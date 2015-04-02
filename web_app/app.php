<?php
/* Mostly html but use php to initialize a few things
 * 
 */
use Symfony\Component\HttpFoundation\Request;

require '../vendor/autoload.php';

$request = Request::createFromGlobals();

$host = $request->getHost();

?>
<html>
  <head>
    <title>SRA</title>
  </head>
  <body>
    <div>Host: <?php echo $host; ?></div>
  </body>
</html>
  