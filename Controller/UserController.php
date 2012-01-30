<?php

namespace Hatimeria\AdminBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

use JMS\SecurityExtraBundle\Annotation\Secure;

use Hatimeria\ExtJSBundle\Response\Failure;

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
        $qb  = $pager->getQueryBuilder();
        
        if($params->has('query')) {
            $dql = $qb->expr()->like('e.username', $qb->expr()->literal("%".$params->get("query")."%"));
            $qb->andWhere($dql);
        }
        
        if($params->has('withoutMe')) {
            $user = $this->get('security.context')->getToken()->getUser();
            $qb->andWhere('e.id !=' . $user->getId());
        }
        
        return $pager;
    }
    /**
     * @remote
     * @Secure("ROLE_ADMIN")
     */
    public function createAction($params)
    {
        $result = $this->get('hatimeria_admin.user.form.handler')->process($params);

        if ($result !== true) {
            return $result;
        }
    }
    
    /**
     * @remote
     * @Secure("ROLE_ADMIN")
     */
    public function destroyAction($params)
    {
        /* @var \Carbon\UserBundle\Entity\Manager\UserManager $um */
        $um   = $this->get("fos_user.user_manager");
        $user = $um->findUserBy(array("id" => $params->get("id")));

        if (null === $user) {
            return new Failure("Brak użytkownika o podanym id");
        }

        $um->deleteUser($user);
    }

    /**
     * @remote
     * @Secure("ROLE_ADMIN")
     */
    public function updateAction($params)
    {
        $user = $this->get("fos_user.user_manager")->findUserBy(array('id' => $params['id']));

        if(!$user) {
            return new Failure("Brak użytkownika o podanym id");
        }

        /* @var \Hatimeria\AdminBundle\Form\Handler\UserFormHandler $handler */
        $handler = $this->get('hatimeria_admin.user.form.handler');
        $result  = $handler->process($params, $user);

        return $result;
    }

}
