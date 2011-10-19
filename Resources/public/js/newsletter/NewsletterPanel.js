(function() {
    
    Ext.require('HatimeriaAdmin.newsletter.window.EditWindow');
    Ext.require('HatimeriaAdmin.newsletter.store.AllStore');

    Ext.define('HatimeriaAdmin.newsletter.NewsletterPanel', {
        extend: 'Ext.grid.Panel',
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
                    {
                        header: "Id", 
                        dataIndex: 'id'
                    },
                    {
                        header: "Tytuł", 
                        dataIndex: 'subject'
                    },
                    {
                        header: "W kolejce", 
                        dataIndex: 'sent', 
                        renderer: YesNoRenderrer
                    }
                ],
                viewConfig: {
                    forceFit: true
                },
                bbar: Ext.create('Ext.PagingToolbar', {
                    store: store,
                    displayInfo: true,
                    displayMsg: 'Rekordy {0} - {1} of {2}',
                    emptyMsg: "Brak rekordów"
                }),
                listeners: {
                    itemdblclick: function(view, record) {
                        var editWindow = Ext.create('HatimeriaAdmin.newsletter.window.EditWindow');
                        editWindow.getComponent('newsletter-form-edit').loadRecord(record);
                        editWindow.show();
                    }
                }
            };

            Ext.apply(this, Ext.apply(config, this.initialConfig));
            this.callParent();
        }
    });
})();