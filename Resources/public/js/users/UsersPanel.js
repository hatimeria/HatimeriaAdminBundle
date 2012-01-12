(function() {
    
    Ext.define('HatimeriaAdmin.users.UsersPanel', {   
        extend: 'Hatimeria.core.grid.BaseGrid',
        requires: ["HatimeriaAdmin.users.store.UserStore"],

        initComponent: function()
        {
            var store = Ext.create('HatimeriaAdmin.users.store.UserStore');
            var config = {
                title: __('users'),
                id: 'all-users-grid',
                store: store,
               bbar: Ext.create('Ext.PagingToolbar', {
                    store: store,
                    displayInfo: true,
                    displayMsg: 'Rekordy {0} - {1} of {2}',
                    emptyMsg: "Brak rekordów"
                }),                
                columns: [
                    {header: 'Id', dataIndex: 'id', width: 80},
                    {header: 'Nazwa', dataIndex: 'username', width: 180},
                    {header: 'Email', dataIndex: 'email', width: 220},
                    {header: 'Włączony', dataIndex: 'enabled', width: 80, renderer: this.rendererYesNo}
                ]
            };
            
            Ext.apply(this, this.applyExternal(Ext.apply(config, this.initialConfig)));
            this.callParent();
        },
        
        /**
         * Items for context menu
         * 
         * @return []
         */
        getContextMenuItems: function(record, index)
        {
            return [
                {
                    text: 'Edytuj',
                    cls: 'ux-edit',
                    scope: this,
                    handler: function() {
                        this.onEditClick(record, index);
                    }
                },
                {
                    text: 'Usuń',
                    cls: 'ux-remove',
                    scope: this,
                    handler: function() {
                        this.onRemoveClick(record, index);
                    }
                }
            ];
        },
        
        /**
         * Event: edit click
         * 
         * @param Ext.data.Model record
         * @param int index
         */
        onEditClick: function(record)
        {   
            var userwindow = Ext.create('HatimeriaAdmin.users.window.UserWindow', {
                title: Ext.String.format('Edycja użytkownika: "{0}"', record.get('email'))
            });
            userwindow.show();
            userwindow.populate(record);
        },
        
        /**
         * Event: edit click
         * 
         * @param Ext.data.Model record
         * @param int index
         */
        onRemoveClick: function(record, index)
        {
            var store = this.store;
            
            Ext.create('Hatimeria.core.response.DirectHandler', {
                fn: Actions.HatimeriaAdmin_User.remove,
                params: {id: record.get('id')},
                success: function() {
                    store.remove(record);
                }
            });               
        }
    });
    
})();
