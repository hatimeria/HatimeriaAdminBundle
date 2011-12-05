<?php

namespace Hatimeria\AdminBundle\DependencyInjection;

use Symfony\Component\DependencyInjection\ContainerBuilder,
    Symfony\Component\Config\FileLocator,
    Symfony\Component\HttpKernel\DependencyInjection\Extension,
    Symfony\Component\DependencyInjection\Loader,
    Symfony\Component\DependencyInjection\Reference;

/**
 * This is the class that loads and manages your bundle configuration
 *
 * To learn more see {@link http://symfony.com/doc/current/cookbook/bundles/extension.html}
 */
class HatimeriaAdminExtension extends Extension
{
    /**
     * {@inheritDoc}
     */
    public function load(array $configs, ContainerBuilder $container)
    {
        $loader = new Loader\XmlFileLoader($container, new FileLocator(__DIR__.'/../Resources/config'));
        $loader->load('services.xml');

        if (!in_array('FOS\UserBundle\FOSUserBundle', $container->getParameter('kernel.bundles'))) {
            $container->removeDefinition('hatimeria_admin.user.form.extensions_collector');
            $container->removeDefinition('hatimeria_admin.user.form.handler');
        } else {
            $fos_class = $container->getParameterBag()->resolveValue($container->getParameterBag()->get('fos_user.model.user.class'));

            $builder = $container->getDefinition('hatimeria_admin.user.form.handler');
            $builder->replaceArgument(2, new Reference('fos_user.user_manager'));
            $builder->replaceArgument(3, $fos_class);
        }
    }
}
