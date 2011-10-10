Ext.define('HatimeriaAdmin.panel.AdminMenuPanel', {
    extend: 'Ext.tree.Panel',
    id: 'tree-panel',
    title: 'Menu',
    split: true,
    minSize: 150,
    autoScroll: true,
    listeners: {
        select: {
            fn: function(model, record) {
                if (record.data.leaf) {
                    this.switchActivePanel(record.data.id);
                }
            }
        }
    },
    switchActivePanel: function(panelId) {
        Ext.getCmp('content-panel').layout.setActiveItem(panelId + '-panel');
    },
    rootVisible: false,
    lines: false,
    flex: 3,
    singleExpand: true
});