<?php

namespace Hatimeria\AdminBundle\Form\Extension;

class UserFormTypeExtensionCollector
{
    protected $extensions = array();

    public function addExtension($extension)
    {
        $this->extensions[] = $extension;
    }

    public function getExtensions()
    {
        return $this->extensions;
    }

}