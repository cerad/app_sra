<?php

use Cerad\Component\HttpMessage\Request as CeradRequest;

require '../vendor/autoload.php';
require '../config/config.php';  // loads ceradApiPrefix

$ceradRequest = new CeradRequest($_SERVER);

$baseHref = $ceradRequest->getBaseHref();
?>
<!DOCTYPE html>
<html lang="en" ng-app="CeradSraApp" ng-strict-di>
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>SRA</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <base href="<?php echo $baseHref; ?>">
  </head>
  <body>
    <div ng-view></div>
    <script src="js/vendor.js"></script>
    <script src="app.js"></script>
    <script src="modules/auth/auth.js"></script>
    <script src="modules/referee/referee-model.js"></script>
    <script src="modules/referee/referee-controller.js"></script>
    <script>
    (function(angular) { 'use strict';
      
      var appModule = angular.module('CeradSraApp');

      appModule.constant('CeradApiPrefix','<?php echo $apiPrefix; ?>');

    })(angular);
    </script>
  </body>
</html>
  