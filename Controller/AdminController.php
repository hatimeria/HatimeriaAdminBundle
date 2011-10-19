<?php

namespace Hatimeria\AdminBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;


class AdminController extends Controller
{
    
    public function indexAction()
    {
        if ($this->container->hasParameter('admin_menu')) {
            $config = $this->container->getParameter('admin_menu');
        } else {
            throw new \Exception("You must configure admin panels, see HatimeriaAdmin docs");
        }
        
        return $this->render('HatimeriaAdminBundle:Admin:signed.html.twig', array(
            'menu' => $config
        ));
    }
}
