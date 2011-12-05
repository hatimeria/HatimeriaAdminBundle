<?php

namespace Hatimeria\AdminBundle;

use Symfony\Component\HttpKernel\Bundle\Bundle,
    Symfony\Component\DependencyInjection\ContainerBuilder;

use Hatimeria\AdminBundle\DependencyInjection\Compiler\RegisterUserFormExtensionPass;

class HatimeriaAdminBundle extends Bundle
{
    public function build(ContainerBuilder $container)
    {
        parent::build($container);

        $container->addCompilerPass(new RegisterUserFormExtensionPass());
    }

}
