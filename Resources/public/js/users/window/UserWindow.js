/**
 * User window
 */
(function() {
    
    Ext.define('HatimeriaAdmin.users.window.UserWindow', {
        extend: 'Ext.window.Window',
        
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