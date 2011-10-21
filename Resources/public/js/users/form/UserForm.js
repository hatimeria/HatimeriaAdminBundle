/**
 * User Form
 */
(function() {
    
    Ext.define('HatimeriaAdmin.users.form.UserForm', {
        extend: 'Ext.form.Panel',
        
        /**
         * Initializes form
         */
        initComponent: function()
        {
            var config = {
                frame: false,
                border: false,
                defaults: {
                    labelWidth: 150,
                    width: 400,
                    margin: 10
                },
                items: [
                    {
                        xtype: 'textfield',
                        name: 'username',
                        fieldLabel: 'Użytkownik'
                    },
                    {
                        xtype: 'textfield',
                        name: 'email',
                        fieldLabel: 'Email'
                    },
                    {
                        xtype: 'checkbox',
                        name: 'enabled',
                        fieldLabel: 'Włączony'
                    }
                ],
                buttons: [
                    {
                        text: 'Zapisz',
                        scope: this,
                        handler: this.onSave
                    }
                ]
            };
            
            Ext.apply(this, Ext.apply(config, this.initialConfig));
            this.callParent();
        },
        
        /**
         * Populates form with a record
         * 
         * @param Ext.data.Model record
         */
        populate: function(record)
        {
            this.getForm().loadRecord(record);
        },
        
        /**
         * Event: on save click
         */
        onSave: function()
        {
            Ext.apply(this.getForm().getRecord().data, this.getForm().getValues());
            
            if (typeof this.onClickSave == 'function')
            {
                this.onClickSave(this, this.getForm().getRecord(), this.getForm());
            }
        }
        
    });
    
})();