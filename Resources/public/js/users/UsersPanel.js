(function() {
    
    Ext.define('HatimeriaAdmin.users.UsersPanel', {   
        extend: 'Hatimeria.core.grid.BaseGrid',
        requires: ["HatimeriaAdmin.users.store.UserStore"],
        transNS: 'users',
        translateAll: true,
        windowEditClass: 'HatimeriaAdmin.users.window.UserWindow', 
        recordClass: 'HatimeriaAdmin.users.model.UserModel',
        
        initComponent: function()
        {
            var store = Ext.create('HatimeriaAdmin.users.store.UserStore');
            var config = {
                title: this.__('title'),
                id: 'users-grid',
                dockedElements: ['paging', 'add'],
                rowActions: ['edit', 'remove'],
                store: store,
                columns: [
                    {dataIndex: 'id', width: 80},
                    {dataIndex: 'username', flex: 1},
                    {dataIndex: 'email', flex: 1},
                    {dataIndex: 'enabled', width: 80, renderer: this.rendererYesNo},
                    {dataIndex: 'administrator', width: 150, renderer: this.rendererYesNo},
                    {dataIndex: 'created_at', width: 150},
                    {dataIndex: 'updated_at', width: 200}
                ]
            };
            
            Ext.apply(this, this.applyExternal(Ext.apply(config, this.initialConfig)));
            this.callParent();
        }
    });
    
})();
