(function() {
    
    Ext.require('HatimeriaAdmin.newsletter.window.EditWindow');
    Ext.require('HatimeriaAdmin.newsletter.store.AllStore');

    Ext.define('HatimeriaAdmin.newsletter.NewsletterPanel', {
        extend: 'HatimeriaAdmin.core.grid.BaseGrid',
        dockedItems: [{
            xtype: 'toolbar',
            items: [{
                iconCls: 'icon-user-add',
                text: 'Dodaj',
                scope: this,
                handler: function() {
                    Ext.create('HatimeriaAdmin.newsletter.window.EditWindow').show();
                }
            }]
        }],
        
        initComponent: function()
        {
            var store = Ext.create('HatimeriaAdmin.newsletter.store.AllStore');
            var YesNoRenderrer = function(value) {return value ? 'Tak' : 'Nie'};

            var config = {
                id: 'newsletter-panel',
                title: 'Newsletter',
                store: store,
                hideContextRowMenuInterval: 3000,
                columns: [
                    {header: "Id", dataIndex: 'id'},
                    {header: "Tytuł", dataIndex: 'subject'},
                    {header: "W kolejce", dataIndex: 'sent', renderer: YesNoRenderrer}
                ],
                viewConfig: {
                    forceFit: true
                },
                bbar: Ext.create('Ext.PagingToolbar', {
                    store: store,
                    displayInfo: true,
                    displayMsg: 'Rekordy {0} - {1} of {2}',
                    emptyMsg: "Brak rekordów"
                })
            };

            Ext.apply(this, Ext.apply(config, this.initialConfig));
            this.callParent();
        },
        
        /**
         * Event: edit click
         */
        onEditClick: function(record)
        {
            var editWindow = Ext.create('HatimeriaAdmin.newsletter.window.EditWindow');
            editWindow.populate(record);
            editWindow.show();
        },

        onRemoveClick: function(record)
        {
            var store = this.store;
            Ext.Msg.confirm('Uwaga', 'Nastąpi usunięcie rekordu z bazy danych.<br/>Czy kontynuować?', function(response) {
                if (response == 'yes')
                {
                    Ext.create('Hatimeria.core.response.DirectHandler', {
                        params: {id: record.get('id')},
                        fn: Actions.HatimeriaAdmin_Newsletter.remove,
                        success: function() {
                            store.load();
                        }
                    });
                }
            });
        }
    });
    
})();