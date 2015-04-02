<?php

use Symfony\Component\HttpFoundation\Request;

use Cerad\Module\ApiModule\ApiKernel;

call_user_func(function()
{
  require '../vendor/autoload.php';

  $api = new ApiKernel('prod',false);

  $request = Request::createFromGlobals();
  $response = $api->handle($request);
  $response->send();
});