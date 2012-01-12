(function() {
    
    Ext.define('HatimeriaAdmin.newsletter.NewsletterPanel', {
        extend: 'Hatimeria.core.grid.BaseGrid',
        requires: [
            'HatimeriaAdmin.newsletter.window.NewsletterWindow',
            'HatimeriaAdmin.newsletter.store.NewsletterStore'
        ],
        dockedItems: [{
            xtype: 'toolbar',
            items: [{
                iconCls: 'icon-user-add',
                text: 'Dodaj',
                scope: this,
                handler: function() {
                    Ext.create('HatimeriaAdmin.newsletter.window.NewsletterWindow').show();
                }
            }]
        }],
    
        windowEditClass: 'HatimeriaAdmin.newsletter.window.NewsletterWindow',
        
        initComponent: function()
        {
            var store = Ext.create('HatimeriaAdmin.newsletter.store.NewsletterStore');
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
        }
    });
    
})();