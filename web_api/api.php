<?php

use Cerad\Component\HttpMessage\Request;

use Cerad\Module\ApiModule\ApiKernel;

call_user_func(function()
{
  require '../vendor/autoload.php';

  $api = new ApiKernel('prod',false);

  $request = new Request($_SERVER);
  $response = $api->handle($request);
  $response->send();
});