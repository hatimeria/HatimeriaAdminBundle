<?php

namespace Hatimeria\AdminBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

use Hatimeria\ExtJSBundle\Response\Failure;
use Hatimeria\ExtJSBundle\Response\Success;
use Hatimeria\ExtJSBundle\Response\Form;
use Hatimeria\ExtJSBundle\Response\Validation;

class TestController extends Controller
{
       /**
        * Single exposed method.
        *
        * @remote    // this annotation expose the method to API
        * @param  ParameterBag $params
        * @return string
        */
        public function indexAction($params)
        {
            return 'Hello '.$params['name'];
        }

    /*
     * Single exposed method with no custom response
     *
     * @remote    // this annotation expose the method to API
     * @param  ParameterBag $params
     * @return string
     */
    public function successAction($params)
    {
        // processing without return statement will generate direct success response
    }

    /*
     * Single exposed method with fail or success message
     *
     * @remote    // this annotation expose the method to API
     * @param  ParameterBag $params
     * @return string
     */
    public function simpleAction($params)
    {
        $success = false;
        
        if ($success) {
            return new Success;
        } else {
            return new Failure;
        }
    }

    /*
     * Validation on entity
     *
     * @remote    // this annotation expose the method to API
     * @param  ParameterBag $params
     *
     * @return Validation
     */
    public function validationAction($params)
    {
        // fetch entity, make same changes based on received params from extjs

        $errors = $validator->validate($entity);

        return new Validation($errors);
    }

    /*
     * Grid backend
     *
     * @remote    // this annotation expose the method to API
     * @param  ParameterBag $params
     * @return string
     */
    public function listAction($params)
    {
        // entity must have toStoreArray function which returns it's array representation
        $pager = $this->get('hatimeria_extjs.pager')->fromEntity('ExampleCompany\ExampleBundle\Entity\Example', $params);
        // use for sorting - map extjs column name to real entity column name
        $pager->addColumnAlias('createdAt.date', 'createdAt');

        // this function is called on every record found to make it accesible for json formatter
        // if not function is specified config mappings are used
        $pager->setToStoreFunction(function($entity) {
                    $entity->toStoreArray();
                });

        $qb = $pager->getQueryBuilder();

        // add filter if there is a name parameter send by javascript
        if (isset($params['name'])) {
            $qb->andWhere('e.name like :name');
            $qb->setParameter('name', '%' . $params['name'] . '%');
        }

        return $pager;
    }

    /*
     * An action to handle forms.
     *
     * @remote   // this annotation expose the method to API
     * @form     // this annotation expose the method to API with formHandler option
     * @param ParameterBag $params Form submited values
     * @param array $files  Uploaded files like $_FILES
     */
    public function testFormAction($params, $files)
    {
        // your proccessing
        // csrf protection must be disabled in this form, whole application, token transport to extjs is not implemented right now
        // Automatic response based on validation result, error list or clean succes message
        return new Form($form);
    }

}
