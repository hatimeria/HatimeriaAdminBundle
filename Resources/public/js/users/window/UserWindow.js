/**
 * User window
 */
(function() {
    
    Ext.define('HatimeriaAdmin.users.window.UserWindow', {
        extend: 'Hatimeria.core.window.BaseWindow',
        transDomain: 'HatimeriaAdminBundle',
        transNS: 'users.edit',
        
        /**
         * Constructor
         * 
         * @parent {} cfgas
         */
        constructor: function(cfg)
        {
            this.title = this.__('title');
            this.callParent([cfg]);
            this.initConfig(cfg);
            
            return this;
        },
        
        /**
         * Event: after save action
         */
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
            var config = {
                width: 450,
                bodyPadding: 10,
                items: [
                    Ext.create('HatimeriaAdmin.users.form.UserForm', {
                        id: 'admin-user-form'
                    })
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