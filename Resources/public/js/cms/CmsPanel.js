(function() {

    Ext.define('HatimeriaAdmin.cms.CmsPanel', {
        extend: 'Hatimeria.core.grid.BaseGrid',
        requires: [
            'HatimeriaAdmin.cms.store.CmsStore',
            'HatimeriaAdmin.cms.window.CmsWindow'
        ],
        mixins: {
            translationable: 'Hatimeria.core.mixins.Translationable'
        },
        
        windowEditClass: 'HatimeriaAdmin.cms.window.CmsWindow',

        initComponent: function()
        {
            var store = Ext.create('HatimeriaAdmin.cms.store.CmsStore');
            var config = {
                id: 'cms-panel',
                dockedElements: ['paging', 'add'],
                rowActions: ['edit', 'clone', 'remove'],
                title: 'Podstrony systemowe',
                store: store,
                hideContextRowMenuInterval : 3000,
                columns: [
                    {
                        header: "Id", 
                        dataIndex: 'id',
                        width: 50
                    },
                    {
                        header: "Tytuł", 
                        dataIndex: 'title',
                        flex: 1
                    },
                    {
                        header: "Adres",
                        dataIndex: 'path',
                        flex: 1
                    },
                    {
                        width: 160,
                        header: "Data aktualizacji",
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