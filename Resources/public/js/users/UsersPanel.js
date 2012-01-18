(function() {
    
    Ext.define('HatimeriaAdmin.users.UsersPanel', {   
        extend: 'Hatimeria.core.grid.BaseGrid',
        requires: ["HatimeriaAdmin.users.store.UserStore"],
        transNS: 'users',
        translateAll: true,
        windowEditClass: 'HatimeriaAdmin.users.window.UserWindow', 
        
        initComponent: function()
        {
            var store = Ext.create('HatimeriaAdmin.users.store.UserStore');
            var config = {
                title: this.__('title'),
                id: 'users-grid',
                rowActions: ['edit', 'remove'],
                store: store,
                columns: [
                    {dataIndex: 'id', width: 80},
                    {dataIndex: 'username', flex: 1},
                    {dataIndex: 'email', flex: 1},
                    {dataIndex: 'enabled', width: 80, renderer: this.rendererYesNo}
                ]
            };
            
            Ext.apply(this, this.applyExternal(Ext.apply(config, this.initialConfig)));
            this.callParent();
        }
    });
    
})();
