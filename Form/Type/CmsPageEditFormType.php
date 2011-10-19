<?php

namespace Hatimeria\AdminBundle\Form\Type;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilder;

use Hatimeria\FrameworkBundle\Form\EventListener\RemoveExtraDataListener;

class CmsPageEditFormType extends AbstractType
{
    public function buildForm(FormBuilder $builder, array $options)
    {
        $builder->add('body');
        $builder->add('is_published');
        $builder->add('publish_to', 'date', array('widget' => 'single_text', 'format' => 'yyyy-MM-dd'));
        $builder->add('publish_from', 'date', array('widget' => 'single_text', 'format' => 'yyyy-MM-dd'));
        $builder->add('author', 'extended_text', array('empty_value' => ''));
        $builder->add('meta_description', 'extended_text', array('empty_value' => ''));
        $builder->add('meta_keywords', 'extended_text', array('empty_value' => ''));

        $builder->addEventSubscriber(new RemoveExtraDataListener());
    }

    public function getParent(array $options)
    {
        return 'zenstruck_cms_node_base';
    }

    function getName()
    {
        return 'cms_page';
    }
}
