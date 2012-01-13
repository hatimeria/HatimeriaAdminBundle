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
                id: 'users-grid',
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
