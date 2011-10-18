Ext.onReady(function(){

    Ext.require('HatimeriaAdmin.cms.store.AllStore');
    Ext.require('HatimeriaAdmin.cms.window.EditWindow');
    
    Ext.define('HatimeriaAdmin.cms.CmsPanel', {
        extend: 'Ext.grid.Panel',

        initComponent: function()
        {
            var store = Ext.create('HatimeriaAdmin.cms.store.AllStore');

            var config = {
                id: 'cms-list-panel',
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
                    header: "Scieżka", 
                    dataIndex: 'primary_path'
                },
                {
                    header: "Data utworzenia", 
                    dataIndex: 'created_at'
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
                            Ext.create('HatimeriaAdmin.cms.window.EditWindow').show();
                        }
                    }]
                }],
                listeners: {
                    itemdblclick: function(view, record) {

                        var editWindow = Ext.create('HatimeriaAdmin.cms.window.EditWindow');
                        editWindow.show();
                        editWindow.populate(record);
                    }
                }
            };

            Ext.apply(this, Ext.apply(config, this.initialConfig));
            
            this.callParent();
        }
    });
});