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
        return $this->get('hatimeria_extjs.pager')->fromEntity('Hatimeria\AdminBundle\Entity\User', $params);
    }
}
