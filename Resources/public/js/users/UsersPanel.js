(function() {
    
    Ext.define('HatimeriaAdmin.users.UsersPanel', {   
        extend: 'Hatimeria.core.grid.BaseGrid',
        requires: ["HatimeriaAdmin.users.store.UserStore"],
        transNS: 'users',
        translateAll: true,
        windowEditClass: 'HatimeriaAdmin.users.window.UserWindow', 
        recordClass: 'HatimeriaAdmin.users.model.UserModel',
        
        constructor: function()
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
            this.filters = {
                items: [
                {
                    xtype: 'textfield',
                    fieldLabel: this.__('filter.username'),
                    name: 'username'
                },
                {
                    xtype: 'h-combobox',
                    fieldLabel: this.__('filter.enabled'),
                    valueField: 'Active',
                    value: this.__('filter.yes'),
                    store: [['true', this.__('filter.yes')],['false',this.__('filter.no')]],
                    name: 'enabled'
                }]
            }
            
            this.callParent([config]);
        }
    });
    
})();
