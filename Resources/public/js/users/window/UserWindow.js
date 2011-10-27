/**
 * User window
 */
(function() {
    
    Ext.define('HatimeriaAdmin.users.window.UserWindow', {
        extend: 'Ext.window.Window',
        config: {
            formConfig: {}
        },
        
        /**
         * Constructor
         * 
         * @parent {} cfgas
         */
        constructor: function(cfg)
        {
            this.callParent([cfg]);
            this.initConfig(cfg);
            
            return this;
        },
        
        afterSave: function()
        {
            Ext.getCmp("all-users-grid").load();
            this.destroy();
        },
        
        /**
         * Initializes window
         */
        initComponent: function()
        {
            var formConfig = this.formConfig;
            formConfig.id = 'admin-user-form';
            formConfig.submitConfig.success = Ext.Function.bind(this.afterSave, this);
            
            var config = {
                width: 450,
                padding: 10,
                items: [
                    Ext.create('HatimeriaAdmin.users.form.UserForm', formConfig)
                ]
            };
            
            Ext.apply(this, Ext.apply(config, this.initialConfig));
            this.callParent();
        },
        
        /**
         * Populate form
         * 
         * @param Ext.data.Model record
         */
        populate: function(record)
        {
            this.getComponent('admin-user-form').populate(record);
        }
    });
    
})();