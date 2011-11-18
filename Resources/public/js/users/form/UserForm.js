/**
 * User Form
 */
(function() {
    
    Ext.define('HatimeriaAdmin.users.form.UserForm', {
        extend: 'HatimeriaCore.form.BaseForm',
        mixins: {
            extrafeatures: 'HatimeriaAdmin.core.utils.ExtraFeatures'
        },        
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
                        hidden: true,
                        name: 'id'
                    },                    
                    {
                        xtype: 'textfield',
                        name: 'email',
                        fieldLabel: 'Email (login)'
                    },
                    {
                        xtype: 'textfield',
                        name: 'discount',
                        fieldLabel: 'Rabat'
                    },                    
                    {
                        xtype: 'checkbox',
                        name: 'enabled',
                        fieldLabel: 'Włączony'
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
        }
    });
    
})();