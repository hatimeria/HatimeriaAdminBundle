/**
 * User Form
 */
(function() {
    
    Ext.define('HatimeriaAdmin.users.form.UserForm', {
        extend: 'Hatimeria.core.form.BaseForm',
        mixins: {
            configurable: 'Hatimeria.core.mixins.ConfigurableExternal'
        },
        submitConfig: {
            submit: Actions.HatimeriaAdmin_User.update,
            text: 'Zapisz'
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
                        xtype: 'checkbox',
                        name: 'enabled',
                        fieldLabel: 'Włączony'
                    }
                ]
            };
            
            Ext.apply(this, this.applyExternals(Ext.apply(config, this.initialConfig)));
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
         * Merges external config
         * 
         * @param {} config
         * @return {}
         */
        applyExternals: function(cfg)
        {
            var config = this.getConnectedConfig();
            
            if (config && config.items)
            {
                for (var i in config.items)
                {
                    cfg.items.push(config.items[i]);
                }
            }
            
            return cfg;
        }
    });
    
})();