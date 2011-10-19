<?php

namespace Hatimeria\AdminBundle\Form\Type;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilder;

use Hatimeria\FrameworkBundle\Form\EventListener\RemoveExtraDataListener;

class NewsletterEditFormType extends AbstractType
{
    public function buildForm(FormBuilder $builder, array $options)
    {
        $builder->add('body');
        $builder->add('subject');

        $builder->addEventSubscriber(new RemoveExtraDataListener());
    }

    public function getParent(array $options)
    {
        return 'form';
    }

    function getName()
    {
        return 'newsletter_mailing';
    }
}
