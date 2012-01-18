<?php

namespace Hatimeria\AdminBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;


class DefaultController extends Controller
{
    
    public function indexAction()
    {
        return $this->render('HatimeriaAdminBundle:Admin:unsigned.html.twig');
    }
    
    public function defaultHeadersAction()
    {
        if ($this->container->hasParameter('admin_loader'))
        {
            $namespaces = $this->container->getParameter('admin_loader');
        }
        
        if ($this->container->hasParameter('admin_title'))
        {
            $title = $this->container->getParameter('admin_title');
        } else {
            $title = 'Hatimeria Backend';
        }
        
        return $this->render('HatimeriaAdminBundle:Default:default_headers.html.twig', array(
            'namespaces' => $namespaces, 'title' => $title
            ));
    }
}
