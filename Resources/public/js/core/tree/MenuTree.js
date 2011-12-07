(function() {
    
    Ext.define('HatimeriaAdmin.core.tree.MenuTree', {
        extend: 'Ext.tree.Panel',
        id: 'tree-panel',

        initComponent: function()
        {
            var config = {
                title: 'Menu',
                rootVisible: false,
                lines: false,
                singleExpand: true,
                store: Ext.data.StoreManager.lookup('app-menu-store'),
                minSize: 150,
                autoScroll: true,
                listeners: {
                    select: {
                        scope: this,
                        fn: this.onMenuItemClick
                    }
                }
            };

            Ext.apply(this, Ext.apply(config, this.initialConfig));

            this.callParent();
        },
        
        /**
         * Event: node click
         */
        onMenuItemClick: function(tree, node)
        {
            if (node.get('leaf'))
            {
                this.switchPanel(node)
            }
        },

        /**
         * Switch on specified panel
         * 
         * @param Ext.data.NodeStore
         */
        switchPanel: function(node)
        {
            Ext.getCmp('app-content-panel').switchPanel(node);
        }
    });

})();