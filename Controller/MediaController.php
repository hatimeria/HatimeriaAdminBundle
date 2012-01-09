<?php

namespace Hatimeria\AdminBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\Security\Core\Exception\AccessDeniedException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use JMS\SecurityExtraBundle\Annotation\Secure;

/**
 * Komunikaty systemowe
 */
class MediaController extends Controller
{
    /**
     * @Template()
     * @Route(name="media_upload", pattern="media/upload")
     *
     * @param type $params 
     */
    public function uploadAction()
    {
        $params = array('uploaded' => false);
        
        if ($this->getRequest()->getMethod() == 'POST')
        {
            $params['uploaded'] = true;
            $params['file'] = '/media/logo.png';
        }
        
        return $params;
    }

}
