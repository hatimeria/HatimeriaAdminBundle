<?php

namespace Hatimeria\AdminBundle\DependencyInjection\Compiler;

use Symfony\Component\DependencyInjection\ContainerBuilder;
use Symfony\Component\DependencyInjection\Compiler\CompilerPassInterface;
use Symfony\Component\DependencyInjection\Reference;

class RegisterUserFormExtensionPass implements CompilerPassInterface
{
    public function process(ContainerBuilder $container)
    {
        if (!$container->hasDefinition('hatimeria_admin.user.form.extensions_collector')) {
            return;
        }

        $collector = $container->getDefinition('hatimeria_admin.user.form.extensions_collector');
        
        foreach ($container->findTaggedServiceIds('hatimeria_admin.user.form.extension') as $id => $attr) {
            $collector->addMethodCall('addExtension', array($id, $attr[0]));
        }
    }
    
}