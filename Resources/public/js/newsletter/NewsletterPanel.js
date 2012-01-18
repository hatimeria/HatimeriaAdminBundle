(function() {
    
    Ext.define('HatimeriaAdmin.newsletter.NewsletterPanel', {
        extend: 'Hatimeria.core.grid.BaseGrid',
        requires: [
            'HatimeriaAdmin.newsletter.window.NewsletterWindow',
            'HatimeriaAdmin.newsletter.store.NewsletterStore'
        ],
        transNS: 'newsletter',
        translateAll: true,
    
        windowEditClass: 'HatimeriaAdmin.newsletter.window.NewsletterWindow',
        
        initComponent: function()
        {
            var store = Ext.create('HatimeriaAdmin.newsletter.store.NewsletterStore');

            var config = {
                id: 'newsletter-panel',
                rowActions: ['edit', 'clone', 'remove'],
                dockedElements: ['paging', 'add'],
                store: store,
                hideContextRowMenuInterval: 3000,
                columns: [
                    {dataIndex: 'id', width: 50},
                    {dataIndex: 'subject', flex: 1},
                    {dataIndex: 'sent', renderer: this.rendererYesNo}
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