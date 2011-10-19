<?php

namespace Hatimeria\AdminBundle\Form\Handler;

use Symfony\Component\Form\FormFactory,
    Symfony\Component\HttpKernel\Exception\NotFoundHttpException,
    Symfony\Component\Security\Core\SecurityContext;

use Doctrine\ORM\EntityManager;

use Hatimeria\ExtJSBundle\Response\Form,
    Hatimeria\NewsletterBundle\Entity\Mailing;

use Hatimeria\AdminBundle\Form\Type\NewsletterEditFormType;

class NewsletterEditFormHandler
{
    protected $em;
    protected $formFactory;
    protected $securityContext;

    public function __construct(FormFactory $formFactory, EntityManager $em, SecurityContext $securityContext)
    {
        $this->formFactory     = $formFactory;
        $this->em              = $em;
        $this->securityContext = $securityContext;
    }

    /**
     * @param \Hatimeria\ExtJSBundle\Parameter\ParameterBag $params
     * @return bool|\Hatimeria\ExtJSBundle\Validation\FormResponse
     */
    public function process($params)
    {
        $options = array(
            'data_class' => 'Hatimeria\NewsletterBundle\Entity\Mailing'
        );

        /* @var \Hatimeria\NewsletterBundle\Entity\Mailing $object */
        if ($params->has('id')) {
            $repository = $this->em->getRepository('HatimeriaNewsletterBundle:Mailing');
            $object     = $repository->find(array((int)$params->get('id')));
            if (!is_object($object)) {
                throw new NotFoundHttpException('Object with given id not found');
            }
        } else {
            $object = new Mailing();
        }

        $form = $this->formFactory->create(new NewsletterEditFormType(), $object, $options);
        $form->bind($params->all());

        if ($form->isValid()) {
            $this->onSuccess($object);

            return true;
        }

        return new Form($form);
    }

    /**
     * @param \Hatimeria\NewsletterBundle\Entity\Mailing $object
     * @return bool
     */
    protected function onSuccess(Mailing $object)
    {
        $this->em->persist($object);
        $this->em->flush();

        return true;
    }

}