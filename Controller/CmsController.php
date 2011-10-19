<?php

namespace Hatimeria\AdminBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\Security\Core\Exception\AccessDeniedException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

use JMS\SecurityExtraBundle\Annotation\Secure;

/**
 * Komunikaty systemowe
 */
class CmsController extends Controller
{
    /**
     * Lista
     *
     * @Secure(roles="ROLE_SUPERADMIN")
     * @remote
     */
    public function listAction($params)
    {
        $query = $this->getRepository()->createQueryBuilder('e');
        
        return $this->get('hatimeria_extjs.pager')->fromQuery($query, $params);
    }
    
    /**
     * Nowy lub edycja istniejącego
     * 
     * @Secure(roles="ROLE_SUPERADMIN")
     * @form
     * @remote
     * 
     * @param \Hatimeria\ExtJSBundle\Parameter\ParameterBag $params
     */
    public function editAction($params)
    {
        $result = $this->get('sfera_admin.edit.form.handler')->process($params);

        if ($result !== true) {
            return $result;
        }
    }
    
    private function getRepository()
    {
        $model = $this->container->getParameter("admin_model_cms");
        return $this->getDoctrine()
                      ->getEntityManager()
                      ->getRepository($model);
    }
    
    /**
     * Usuwanie
     *
     * @remote
     * @Secure(roles="ROLE_SUPERADMIN")
     * 
     * @param \Hatimeria\ExtJSBundle\Parameter\ParameterBag $params
     */
    public function removeAction($params)
    {
        if (!$params->has('id')) {
            throw new NotFoundHttpException('You cant invoke this action without id parameter');
        }

        /* @var \Doctrine\ORM\EntityManager $em */
        $em = $this->get('doctrine.orm.entity_manager');

        $cmsPage = $this->getRepository()->find($params->get('id'));
        if (!is_object($cmsPage)) {
            throw new NotFoundHttpException('CmsPage with given id was not found');
        }

        $em->remove($cmsPage);
        $em->flush();
    }

}
