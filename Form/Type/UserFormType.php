<?php

namespace Hatimeria\AdminBundle\Form\Type;

use Symfony\Component\Form\AbstractType,
    Symfony\Component\Form\FormBuilder;

use Hatimeria\FrameworkBundle\Form\EventListener\RemoveExtraDataListener;

class UserFormType extends AbstractType
{
    public function buildForm(FormBuilder $builder, array $options)
    {
        $builder->add("email","email");

        $builder->addEventSubscriber(new RemoveExtraDataListener());
    }

    public function getParent(array $options)
    {
        return 'form';
    }

    function getName()
    {
        return 'user_form';
    }
}
