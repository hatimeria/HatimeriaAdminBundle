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
        createPanel: function(id, name, params)
        {
            if (typeof name == 'undefined')
            {
                name = id;
            }
            
            var configObj = {
                id: name
            }
            
            Ext.apply(configObj, this.defaultPanelConfig);
            Ext.apply(configObj, params || {});
            
            return Ext.create(Ext.String.format('HatimeriaAdmin.{0}.{1}Panel', id, Ext.String.capitalize(name)), configObj);
        },
        
        /**
         * Switches to other panel
         * 
         * @param Ext.data.NodeStore node
         */
        switchPanel: function(node)
        {
            this.items.get(this.currentPanelName).hide();
            var panelName = (node.get('panel')) ? node.get('panel') : node.get('id');
            var panel = this.items.get(panelName);
            
            if (typeof panel == 'undefined')
            {
                panel = this.createPanel(node.get('id'), panelName, node.get('params'));
                this.add(panel);
            }
            
            panel.show();
            this.currentPanelName = panelName;
        }
        
    });
    
})();