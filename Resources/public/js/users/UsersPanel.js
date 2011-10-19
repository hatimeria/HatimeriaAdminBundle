(function() {
    
    var YesNoRenderer = function(value) { return value ? 'Tak': 'Nie' };
    
    Ext.define('HatimeriaAdmin.users.UsersPanel', {   
        extend: 'Ext.grid.Panel',
        requires: ["HatimeriaAdmin.users.store.UserStore"],

        initComponent: function()
        {
            var config = {
                title: __('users'),
                store: Ext.create('HatimeriaAdmin.users.store.UserStore'),
                columns: [
                    {header: 'Id', dataIndex: 'id', width: 50},
                    {header: 'Nazwa', dataIndex: 'username', width: 150},
                    {header: 'Email', dataIndex: 'email', width: 200},
                    {header: 'Włączony', dataIndex: 'enabled', width: 50, renderer: YesNoRenderer}
                ]
            };
            
            Ext.apply(this, Ext.apply(config, this.initialConfig));
            this.callParent();
        }
    });
    
})();
