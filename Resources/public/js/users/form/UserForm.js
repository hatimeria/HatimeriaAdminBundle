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
            success: function() {
                Ext.getStore('users-store').load();
                this.formPanel.up('window').destroy();
            }
        },
        
        transNS: 'users.headers',

        constructor: function(cfg)
        {
            var config = {
                height: 300,
                defaults: {
                    anchor: '90%'
                },
                frame: false,
                border: false,
                bodyPadding: 10,
                items: [
                    {
                        xtype: 'textfield',
                        hidden: true,
                        name: 'id'
                    },                    
                    {
                        xtype: 'textfield',
                        width: 400,
                        name: 'email',
                        fieldLabel: this.__('username')
                    },
                    {
                        xtype: 'checkbox',
                        name: 'enabled',
                        fieldLabel: this.__('enabled')
                    }
                ]
            };

            Ext.apply(config, cfg || {});

            this.callParent([config]);
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