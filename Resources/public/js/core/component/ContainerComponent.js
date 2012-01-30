/**
 * Container component
 */
(function() {
    
    Ext.define('HatimeriaAdmin.core.component.ContainerComponent', {
        extend: 'Ext.container.Container',
        requires: [
            'Ext.LoadMask'
        ],
        
        /**
         * Current loaded panel
         * 
         * @property {String}
         */
        currentPanelName: undefined,
        
        /**
         * Defaults config params passed to each panel
         * 
         * @property {Object}
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
                autoScroll: true,
                style: 'padding: 25px',
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
         * @param {String} id
         * @param {String} name optional
         * @param {String} params optional
         * @return {Ext.panel.Panel}
         */
        createPanel: function(id)
        {
            var map = Ext.getStore('app-menu-store').getNodeMap();
            var config = {};
            Ext.apply(config, {
                ns: "HatimeriaAdmin",
                params: {}
            });
            
            Ext.apply(config, map[id]);
            
            var configObj = {
                id: id,
                maxWidth: 1024
            };
            
            Ext.apply(configObj, this.defaultPanelConfig);
            Ext.apply(configObj, config.params || {});
            return Ext.create(Ext.String.format('{2}.{0}.{1}Panel', id, Ext.String.capitalize(id), config.ns), configObj);
        },
        
        /**
         * Switches to other panel
         * 
         * @param {Ext.data.NodeStore} node
         */
        switchPanel: function(node)
        {
            this.items.get(this.currentPanelName).hide();
            var panelName = node.get('id');
            var panel = this.items.get(panelName);
            
            if (typeof panel == 'undefined')
            {
                var mask = new Ext.LoadMask(this, {msg: 'Czekaj, trwa ładowanie interfejsu'});
                mask.show();
                
                panel = this.createPanel(panelName);
                this.add(panel);
                
                mask.hide();
            }
            
            panel.show();
            this.currentPanelName = panelName;
        }
        
    });
    
})();