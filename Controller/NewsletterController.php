<?php

namespace Hatimeria\AdminBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

use JMS\SecurityExtraBundle\Annotation\Secure;

class NewsletterController extends Controller
{
    /**
     * @param $params
     * 
     * @Secure(roles="ROLE_ADMIN")
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
     * @Secure(roles="ROLE_ADMIN")
     * @form
     * @remote
     *
     * @param \Hatimeria\ExtJSBundle\Parameter\ParameterBag $params
     */
    public function editAction($params)
    {
        $result = $this->get('hatimeria_admin.newsletter.form.handler')->process($params);

        if ($result !== true) {
            return $result;
        }
    }

    /**
     * @return \Doctrine\ORM\EntityRepository
     */
    private function getRepository()
    {
        return $this->get('doctrine.orm.entity_manager')
                    ->getRepository('HatimeriaNewsletterBundle:Mailing');
    }

    /**
     * Usuwanie
     *
     * @remote
     * @Secure(roles="ROLE_ADMIN")
     *
     * @param \Hatimeria\ExtJSBundle\Parameter\ParameterBag $params
     */
    public function destroyAction($params)
    {
        if (!$params->has('id')) {
            throw new NotFoundHttpException('You cant invoke this action without id parameter');
        }

        /* @var \Doctrine\ORM\EntityManager $em */
        $em = $this->get('doctrine.orm.entity_manager');

        $object = $this->getRepository()->find($params->get('id'));
        if (!is_object($object)) {
            throw new NotFoundHttpException('Newsletter with given id was not found');
        }

        $em->remove($object);
        $em->flush();
    }

}