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
        $query = $this->get('doctrine.orm.entity_manager')
                      ->getRepository('HatimeriaNewsletterBundle:Mailing')
                      ->createQueryBuilder('e');

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
        $result = $this->get('sfera_admin.newsletter.form.handler')->process($params);

        if ($result !== true) {
            return $result;
        }
    }

}