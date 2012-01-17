<?php

namespace Hatimeria\AdminBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

use Symfony\Component\HttpFoundation\RedirectResponse;
use JMS\SecurityExtraBundle\Annotation\Secure;


class AdminController extends Controller
{
    /**
     * @Secure("ROLE_ADMIN")
     *
     * @return type 
     */
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
    
    public function languageAction()
    {
        $url = $this->get("router")->generate('hatimeria_admin');
        
        return new RedirectResponse($url);
    }
}
