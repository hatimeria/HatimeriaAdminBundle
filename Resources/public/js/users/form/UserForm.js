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
                padding: 10,
                defaults: {
                    labelWidth: 150,
                    width: 400
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
            var _this = this;
            window.setTimeout(function() {
                _this.getForm().loadRecord(record);
            }, 500)
        }
        
    });
    
})();