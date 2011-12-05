<?php

namespace Hatimeria\AdminBundle\Form\Handler;

use Symfony\Component\Form\FormFactory;

use FOS\UserBundle\Model\UserManagerInterface;

use Hatimeria\ExtJSBundle\Response\Form,
    Hatimeria\AdminBundle\Form\Type\UserFormType,
    Hatimeria\AdminBundle\Form\Extension\UserFormTypeExtensionCollector;

class UserFormHandler
{
    /**
     * @var \Symfony\Component\Form\FormFactory
     */
    protected $formFactory;
    /**
     * @var \FOS\UserBundle\Model\UserManagerInterface
     */
    protected $um;
    /**
     * @var string
     */
    protected $userClass;
    /**
     * @var \Hatimeria\AdminBundle\Form\Extension\UserFormTypeExtensionCollector
     */
    protected $extensionCollector;

    public function __construct(FormFactory $factory, UserFormTypeExtensionCollector $extensionCollector, UserManagerInterface $um, $userClass)
    {
        $this->formFactory        = $factory;
        $this->um                 = $um;
        $this->extensionCollector = $extensionCollector;
        $this->userClass          = $userClass;
    }

    /**
     * @param \Hatimeria\ExtJSBundle\Parameter\ParameterBag $params
     * @param mixed $user
     * @return \Hatimeria\ExtJSBundle\Response\Form
     */
    public function process($params, $user = null)
    {
        if (null === $user) {
            $user = new $this->userClass;
        }
        $options = array(
            'data_class' => $this->userClass
        );

        $type = new UserFormType();
        $type->setExtensions($this->extensionCollector->getExtensions());

        $form = $this->formFactory->create($type, $user, $options);
        $form->bind($params->all());

        $result = new Form($form);

        if($result->isValid()) {
            $this->um->updateUser($user);
        }

        return $result;
    }

}