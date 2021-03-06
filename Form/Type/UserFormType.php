<?php

namespace Hatimeria\AdminBundle\Form\Type;

use Symfony\Component\Form\AbstractType,
    Symfony\Component\Form\FormBuilder;

use Hatimeria\FrameworkBundle\Form\EventListener\RemoveExtraDataListener;

class UserFormType extends AbstractType
{
    protected $extend = array();

    public function buildForm(FormBuilder $builder, array $options)
    {
        $builder->add("email","email");
        $builder->add("administrator","checkbox");
        $builder->add("enabled","checkbox");
        $builder->add('plainPassword', 'repeated', array('type' => 'password', 'invalid_message' => "Hasła nie są takie same"));

        foreach ($this->extend as $type) {
            /* @var \Symfony\Component\Form\AbstractType $type */
            $type->buildForm($builder, $options);
        }

        $builder->addEventSubscriber(new RemoveExtraDataListener());
    }
    
    public function setExtend(array $extend)
    {
        $this->extend = $extend;
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
