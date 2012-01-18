(function() {

    Ext.define('HatimeriaAdmin.cms.CmsPanel', {
        extend: 'Hatimeria.core.grid.BaseGrid', 
        requires: [
            'HatimeriaAdmin.cms.store.CmsStore',
            'HatimeriaAdmin.cms.window.CmsWindow'
        ],
        transNS: 'cms',
        translateAll: true,
        windowEditClass: 'HatimeriaAdmin.cms.window.CmsWindow',

        initComponent: function()
        {
            var store = Ext.create('HatimeriaAdmin.cms.store.CmsStore');
            var config = {
                id: 'cms-panel',
                dockedElements: ['paging', 'add'],
                rowActions: ['edit', 'clone', 'remove'],
                store: store,
                hideContextRowMenuInterval : 3000,
                columns: [
                    {
                        dataIndex: 'id',
                        width: 50
                    },
                    {
                        dataIndex: 'title',
                        flex: 1
                    },
                    {
                        dataIndex: 'path',
                        flex: 1
                    },
                    {
                        width: 160,
                        dataIndex: 'updated_at'
                    }
                ],
                viewConfig: {
                    forceFit:true
                }
            };

            Ext.apply(this, Ext.apply(config, this.initialConfig));
            
            this.callParent();
        }
    });
    
})();