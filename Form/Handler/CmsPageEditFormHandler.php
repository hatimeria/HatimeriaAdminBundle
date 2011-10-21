<?php

namespace Hatimeria\AdminBundle\Form\Handler;

use Symfony\Component\Form\FormFactory;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\Security\Core\SecurityContext;

use Doctrine\ORM\EntityManager;

use Hatimeria\AdminBundle\Form\Type\CmsPageEditFormType;
use Hatimeria\ExtJSBundle\Response\Form;

class CmsPageEditFormHandler
{
    protected $em;
    protected $formFactory;
    protected $securityContext;

    public function __construct(FormFactory $formFactory, EntityManager $em, SecurityContext $securityContext, $dataClass, $repositoryClass)
    {
        $this->formFactory     = $formFactory;
        $this->em              = $em;
        $this->dataClass       = $dataClass;
        $this->repositoryClass = $repositoryClass;
        $this->securityContext = $securityContext;
    }

    /**
     * @param \Hatimeria\ExtJSBundle\Parameter\ParameterBag $params
     * @return bool|\Hatimeria\ExtJSBundle\Validation\FormResponse
     */
    public function process($params)
    {
        $options = array(
            'data_class' => $this->dataClass
        );

        if ($params->has('id')) {
            $repository = $this->em->getRepository($this->repositoryClass);
            $object     = $repository->find(array((int)$params->get('id')));
            if (!is_object($object)) {
                throw new NotFoundHttpException('Object with given id not found');
            }
        } else {
            $object = new CmsPage();
        }

        $form = $this->formFactory->create(new CmsPageEditFormType(), $object, $options);
        $form->bind($params->all());

        if ($form->isValid()) {
            $this->onSuccess($object);

            return true;
        }

        return new Form($form);
    }

    /**
     * @return bool
     */
    protected function onSuccess($object)
    {
        $object->setUser($this->securityContext->getToken()->getUser());

        $this->em->persist($object);
        $this->em->flush();

        return true;
    }

}