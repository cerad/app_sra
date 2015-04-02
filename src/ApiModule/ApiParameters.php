<?php

namespace Cerad\Module\ApiModule;

// Copy to AppParameters
class ApiParameters
{
  public function __construct($container)
  {
    $container->set('secret','someSecret');
    $container->set('cerad_user_master_password','zaysox');
    
    $container->set('db_url',       'mysql://impd:impd894@localhost/persons');
    $container->set('db_url_ng2014','mysql://impd:impd894@localhost/ng2014');
  }
}