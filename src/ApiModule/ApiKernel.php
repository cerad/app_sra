<?php

namespace Cerad\Module\ApiModule;

use Cerad\Module\KernelModule\KernelApp;

use Cerad\Module\KernelModule\KernelServices;

use Cerad\Module\AuthModule\AuthServices;
use Cerad\Module\AuthModule\AuthRoutes;
    
use Cerad\Module\RefereeModule\RefereeServices;
use Cerad\Module\RefereeModule\RefereeRoutes;

class ApiKernel extends KernelApp
{
  protected function registerServices()
  {
    $container = $this->container;
    
    new ApiParameters($container);
    
    new KernelServices($container);
    
    new AuthServices($container);
    new AuthRoutes  ($container);
    
    new RefereeServices($container);
    new RefereeRoutes  ($container);
    
    new ApiServices($container);
  }
}