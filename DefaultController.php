<?php

namespace Hatimeria\AdminBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;


class DefaultController extends Controller
{
    
    public function indexAction()
    {
        return $this->render('HatimeriaAdminBundle:Default:index.html.twig');
    }
}
