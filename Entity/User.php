<?php

namespace Hatimeria\AdminBundle\Entity;

use FOS\UserBundle\Entity\User as BaseUser;
use Doctrine\ORM\Mapping as ORM;

class User extends BaseUser
{
    /**
     * @var datetime $updatedAt
     *
     * @ORM\Column(type="datetime")
     */
    protected $updatedAt;
    
    /**
     * @var datetime $createdAt
     *
     * @ORM\Column(type="datetime")
     */
    protected $createdAt;

    public function __construct()
    {
        $this->createdAt = new \DateTime();
        $this->updatedAt = new \DateTime();
        
        parent::__construct();
    }
    
    public function setEmail($v)
    {
        $this->setUsername($v);
        $this->email = $v;
    }
    
    public function isAdministrator()
    {
        return $this->hasRole('ROLE_ADMIN');
    }
    
    public function getUpdatedAt()
    {
        return $this->updatedAt;
    }

    public function setUpdatedAt($updatedAt)
    {
        $this->updatedAt = $updatedAt;
    }
    
    public function getCreatedAt()
    {
        return $this->createdAt;
    }

    public function setCreatedAt($createdAt)
    {
        $this->createdAt = $createdAt;
    }

    /**
     * @ORM\PreUpdate
     */
    public function preUpdate()
    {
        $this->updatedAt = new \DateTime();
    }
    
    public function setAdministrator($v)
    {
        if($v) {
            $this->addRole("ROLE_ADMIN");
        } else {
            $this->removeRole("ROLE_ADMIN");
        }
    }
}