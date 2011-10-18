(function() {
    
    Ext.define('HatimeriaAdmin.users.UsersPanel', {   
        extend: 'Ext.grid.Panel',
        requires: ["HatimeriaAdmin.users.store.UserStore"],

        initComponent: function()
        {
            var config = {
                title: __('users'),
                store: Ext.create('HatimeriaAdmin.users.store.UserStore'),
                columns: [
                    {header: __('Id'), dataIndex: 'id'},
                    {header: __('user.username'), dataIndex: 'username'}, 
                    {header: __('Email'), dataIndex: 'email'}
                ]
            };
            Ext.apply(this, Ext.apply(config, this.initialConfig));
            
            this.callParent();
        }
    });
    
})();
