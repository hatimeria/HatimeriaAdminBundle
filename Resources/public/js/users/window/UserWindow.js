/**
 * User window
 */
(function() {
    
    Ext.define('HatimeriaAdmin.users.window.UserWindow', {
        extend: 'Ext.window.Window',
        config: {
            /**
             * Save callback
             */
            onSave: Ext.emptyFn
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
        
        /**
         * Initializes window
         */
        initComponent: function()
        {
            var config = {
                width: 450,
                padding: 10,
                items: [
                    Ext.create('HatimeriaAdmin.users.form.UserForm', {
                        id: 'admin-user-form',
                        onClickSave: this.getOnSave()
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