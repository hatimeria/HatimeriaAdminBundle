(function() {
    
    Ext.define('HatimeriaAdmin.newsletter.NewsletterPanel', {
        extend: 'Hatimeria.core.grid.BaseGrid',
        requires: [
            'HatimeriaAdmin.newsletter.window.NewsletterWindow',
            'HatimeriaAdmin.newsletter.store.NewsletterStore'
        ],
    
        windowEditClass: 'HatimeriaAdmin.newsletter.window.NewsletterWindow',
        
        initComponent: function()
        {
            var store = Ext.create('HatimeriaAdmin.newsletter.store.NewsletterStore');
            var YesNoRenderrer = function(value) {return value ? 'Tak' : 'Nie'};

            var config = {
                id: 'newsletter-panel',
                rowActions: ['edit', 'clone', 'remove'],
                dockedElements: ['paging', 'add'],
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
                }
            };

            Ext.apply(this, Ext.apply(config, this.initialConfig));
            this.callParent();
        }
    });
    
})();