<?php

namespace Cerad\Module\ApiModule;

class ApiServices
{
  public function __construct($container)
  {
    // Point the auth controller to in memory instead of dao default
    $container->set('auth_token_controller',function($c)
    {
      return new \Cerad\Module\AuthModule\AuthTokenController
      (
        $c->get('jwt_coder'),
        $c->get('auth_user_provider_in_memory'),
        $c->get('auth_user_password_plain_text')
      );
    });
  }
}