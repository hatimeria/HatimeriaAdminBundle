<?php

namespace Hatimeria\AdminBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;


class UserController extends Controller
{
    /**
     * Users list data
     * 
     * @remote
     */
    public function listAction($params)
    {
        return $this->get('hatimeria_extjs.pager')->fromEntity($this->container->getParameter("fos_user.model.user.class"), $params);
    }
    
    /**
     * Single exposed method.
     *
     * @remote
     * @param  ParameterBag $params
     * @return string
     */
    public function indexAction($params)
    {
        return 'Hello ' . $params['name'];
    }
}
