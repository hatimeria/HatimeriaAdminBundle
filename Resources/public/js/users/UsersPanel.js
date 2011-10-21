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
                    {header: 'Włączony', dataIndex: 'enabled', width: 60, renderer: YesNoRenderer}
                ],
                listeners: {
                    itemcontextmenu: {
                        scope: this,
                        fn: this.onContextMenu
                    },
                    itemdblclick: {
                        scope: this, 
                        fn: function(grid, record, el, index) {
                            this.onEditClick(record, index);
                        }
                    }
                }
            };
            
            Ext.apply(this, Ext.apply(config, this.initialConfig));
            this.callParent();
        },
        
        /**
         * Event: right click on row
         * 
         * @param Ext.tree.Panel
         * @param Ext.data.Node
         * @param DOMElement el
         * @param int index
         * @param Ext.Object.Event event
         */
        onContextMenu: function(grid, record, el, index, event)
        {
            Ext.create('Ext.menu.Menu', {
                width: 140,
                items: [
                    {
                        text: 'Edytuj Użytkownika',
                        cls: 'ux-edit',
                        scope: this,
                        handler: function() {
                            this.onEditClick(record, index);
                        }
                    },
                    {
                        text: 'Usuń Użytkownika',
                        cls: 'ux-remove',
                        scope: this,
                        handler: function() {
                            this.onRemoveClick(record, index);
                        }
                    }
                ]
            }).showAt(event.getXY());
            
            event.stopEvent();
        },
        
        /**
         * Event: edit click
         * 
         * @param Ext.data.Model record
         * @param int index
         */
        onEditClick: function(record, index)
        {
            var userwindow = Ext.create('HatimeriaAdmin.users.window.UserWindow', {
                title: Ext.String.format('Edycja użytkownika: "{0}"', record.get('email')),
                onSave: function(record) {
                    
                    // @TODO ZAPIS UŻYTKOWNIKA POPRZEZ CRUD API DIRECT
                    console.log(record);
                    
                }
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
            // ???
        }
    });
    
})();
