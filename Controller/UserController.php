<?php

namespace Hatimeria\AdminBundle\Controller;

use JMS\SecurityExtraBundle\Annotation\Secure;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;


class UserController extends Controller
{
    /**
     * 
     * Users list data
     * 
     * @Secure("ROLE_ADMIN")
     * @remote
     */
    public function listAction($params)
    {
        $pager = $this->get('hatimeria_extjs.pager')->fromEntity($this->container->getParameter("fos_user.model.user.class"), $params);
        if($params->has('query')) {
            $qb  = $pager->getQueryBuilder();
            $dql = $qb->expr()->like('e.username', "'%".$params->get("query")."%'");
            $qb->andWhere($dql);
        }
        
        return $pager;
    }
    
    /**
     * Single exposed method.
     * 
     * @Secure("ROLE_ADMIN")
     *
     * @remote
     * @param  ParameterBag $params
     * @return string
     */
    public function indexAction($params)
    {
        return 'Hello ' . $params['name'];
    }
    
    /**
     * @remote
     * @Secure("ROLE_ADMIN")
     */
    public function removeAction($params)
    {
        $um = $this->get("fos_user.user_manager");
        $user = $um->findUserBy(array("id" => $params->get("id")));
        $um->deleteUser($user);
    }
}
