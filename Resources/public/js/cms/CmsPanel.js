(function() {

    Ext.define('HatimeriaAdmin.cms.CmsPanel', {
        extend: 'HatimeriaAdmin.core.grid.BaseGrid',
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
                title: 'Podstrony systemowe',
                store: store,
                hideContextRowMenuInterval : 3000,
                columns: [
                    {
                        header: "Id", 
                        dataIndex: 'id'
                    },
                    {
                        header: "Tytuł", 
                        dataIndex: 'title'
                    },
                    {
                        header: "Adres",
                        dataIndex: 'path'
                    },
                    {
                        width: 160,
                        header: "Data aktualizacji",
                        dataIndex: 'updated_at'
                    }
                ],
                viewConfig: {
                    forceFit:true
                },
                bbar: Ext.create('Ext.PagingToolbar', {
                    store: store,
                    displayInfo: true,
                    displayMsg: 'Rekordy {0} - {1} of {2}',
                    emptyMsg: "Brak rekordów"
                }),
                dockedItems: [{
                    xtype: 'toolbar',
                    items: [{
                        iconCls: 'icon-user-add',
                        text: 'Dodaj',
                        scope: this,
                        handler: function() {
                            Ext.create(this.getWindowEditClass()).show();
                        }
                    }]
                }]
            };

            Ext.apply(this, Ext.apply(config, this.initialConfig));
            
            this.callParent();
        }
    });
    
})();