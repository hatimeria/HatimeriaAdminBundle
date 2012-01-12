(function() {
    
    Ext.define('HatimeriaAdmin.users.UsersPanel', {   
        extend: 'Hatimeria.core.grid.BaseGrid',
        requires: ["HatimeriaAdmin.users.store.UserStore"],
        transDomain: 'HatimeriaAdminBundle',
        transNS: 'users',
        
        initComponent: function()
        {
            var store = Ext.create('HatimeriaAdmin.users.store.UserStore');
            var config = {
                title: this.__('title'),
                rowActions: ['edit', 'remove'],
                id: 'all-users-grid',
                store: store,
                columns: [
                    {dataIndex: 'id', width: 80},
                    {dataIndex: 'username', width: 180},
                    {dataIndex: 'email', width: 220},
                    {dataIndex: 'enabled', width: 80, renderer: this.rendererYesNo}
                ]
            };
            
            Ext.apply(this, this.applyExternal(Ext.apply(config, this.initialConfig)));
            this.callParent();
        }
    });
    
})();
