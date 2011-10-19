/**
 * Container component
 */
(function() {
    
    Ext.define('HatimeriaAdmin.core.component.ContainerComponent', {
        extend: 'Ext.container.Container',
        
        /**
         * Current loaded panel
         * 
         * @var string
         */
        currentPanelName: undefined,
        
        /**
         * Defaults config params passed to each panel
         * 
         * @var {}
         */
        defaultPanelConfig: {
            height: "100%"
        },
        
        /**
         * Initialize component
         */
        initComponent: function()
        {
            var mainId = Ext.data.StoreManager.lookup('app-menu-store').getRootNode().firstChild.get('id');
            this.currentPanelName = mainId;
            
            var config = {
                layout: 'auto',
                frame: false,
                border: false,
                items: [
                    this.createPanel(mainId)
                ]
            };
            
            Ext.apply(this, Ext.apply(config, this.initialConfig));
            
            this.callParent();
        },
        
        /**
         * Creates new panel
         * 
         * @param string id
         * @param string name optional
         * @param string params optional
         * @return Ext.panel.Panel
         */
        createPanel: function(id, params, ns)
        {
            if (typeof ns == 'undefined')
            {
                ns = "HatimeriaAdmin";
            }
            
            var configObj = {
                id: id
            };
            
            Ext.apply(configObj, this.defaultPanelConfig);
            Ext.apply(configObj, params || {});
            
            return Ext.create(Ext.String.format('{2}.{0}.{1}Panel', id, Ext.String.capitalize(id), ns), configObj);
        },
        
        /**
         * Switches to other panel
         * 
         * @param Ext.data.NodeStore node
         */
        switchPanel: function(node)
        {
            var nodeMap = Ext.data.StoreManager.lookup('app-menu-store').getNodeMap();
            var nodeParams = nodeMap[node.get('id')];
            
            this.items.get(this.currentPanelName).hide();
            var panelName = node.get('id');
            var panel = this.items.get(panelName);
            
            if (typeof panel == 'undefined')
            {
                panel = this.createPanel(panelName, nodeParams.params, nodeParams.ns);
                this.add(panel);
            }
            
            panel.show();
            this.currentPanelName = panelName;
        }
        
    });
    
})();