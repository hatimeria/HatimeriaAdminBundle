<?php

namespace Hatimeria\AdminBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;


class AdminController extends Controller
{
    
    public function indexAction()
    {
        return $this->render('HatimeriaAdminBundle:Admin:index.html.twig', array(
            'menu' => $this->container->getParameter('admin')
        ));
    }
}
