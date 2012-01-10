<?php

namespace Hatimeria\AdminBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\Security\Core\Exception\AccessDeniedException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use JMS\SecurityExtraBundle\Annotation\Secure;

use Symfony\Component\HttpFoundation\File\Exception\FileException;

/**
 * Komunikaty systemowe
 */
class MediaController extends Controller
{
    /**
     * @Template()
     *
     * @param type $params 
     */
    public function uploadAction()
    {
        $params = array('uploaded' => false);
        
        if ($this->getRequest()->getMethod() == 'POST') {
            /* @var \Symfony\Component\HttpFoundation\File\UploadedFile $image */
            $image = $this->get('request')->files->get('image');
            $path  = '/media';

            try {
                $name = md5($image->getClientOriginalName() . time()) . '.' . pathinfo($image->getClientOriginalName(), PATHINFO_EXTENSION);;
                $image->move($this->container->getParameter('assetic.write_to') . $path, $name);

                $params['uploaded'] = true;
                $params['file'] = $path . '/' . $name;
            } catch (FileException $e) {
                $params['message'] = $e->getMessage();
            }
        }
        
        return $params;
    }

}
