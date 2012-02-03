(function() {
    
    Ext.define('HatimeriaAdmin.users.UsersPanel', {   
        extend: 'Hatimeria.core.grid.BaseGrid',
        requires: ["HatimeriaAdmin.users.store.UserStore"],
        transNS: 'users',
        translateAll: true,
        onSwitchClick: function(record, index) 
        {
            location.href = Routing.generate('homepage') + '?_switch_user=' + record.get('username');
        },
        constructor: function(cfg)
        {
            var store = Ext.create('HatimeriaAdmin.users.store.UserStore');
            var config = {
                title: this.__('title'),
                id: 'users-grid',
                dockedElements: ['paging', 'add'],
                rowActions: ['edit', 'remove', 'switch'],
                store: store,
                formConfig: {
                    useFormSubmit: true,
                    useFormLoad: false,
                    formClass: 'HatimeriaAdmin.users.form.UserForm'
                },                
                columns: [
                    {dataIndex: 'id', width: 80},
                    {dataIndex: 'username', flex: 1},
                    {dataIndex: 'email', flex: 1},
                    {dataIndex: 'enabled', width: 80, renderer: this.rendererYesNo},
                    {dataIndex: 'administrator', width: 150, renderer: this.rendererYesNo},
                    {dataIndex: 'created_at', width: 150},
                    {dataIndex: 'updated_at', width: 150},
                    {dataIndex: 'last_login', width: 150}
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
                    store: [['true', this.__('filter.yes')],['false',this.__('filter.no')]],
                    name: 'enabled'
                }]
            }
            
            Ext.apply(config, cfg);
            
            this.callParent([config]);
        }
    });
    
})();
