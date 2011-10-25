(function() {
    
    Ext.define('HatimeriaAdmin.core.store.MenuStore', {
        extend: 'Ext.data.TreeStore',
        
        /**
         * Map of nodes to preserve extra atrributes comes from YML
         * 
         * @var {}
         */
        nodeMap: {},
        
        /**
         * Constructor
         * 
         * @param {} cfg
         */
        constructor: function(cfg)
        {
            var config = {
                root: {
                    expanded: true,
                    children: this.getMenuConfiguration()
                }
            };
            
            Ext.apply(config, cfg || {});
            
            this.callParent([config]);
        },
        
        /**
         * Creates store-ready data
         * 
         * @return []
         */
        getMenuConfiguration: function()
        {
            var data = _menu;
            var _this = this;
            
            if (typeof data == 'undefined')
            {
                return [];
            }
            
            var newData = [];
            
            var adjust = function(nodes, newNodes) {
                var newNode, map;
                
                for (var id in nodes)
                {
                    newNode = {
                        id: id,
                        text: nodes[id].text
                    };
                    map = Ext.clone(nodes[id]);
                    map.id = id;
                    if (map.children)
                    {
                        delete map.children;
                    }
                    
                    if (typeof nodes[id].children == 'object')
                    {
                        newNode.expanded = true;
                        newNode.leaf = false;
                        newNode.children = [];
                        adjust(nodes[id].children, newNode.children);
                    }
                    else
                    {
                        newNode.leaf = true;
                    }
                    
                    newNodes.push(newNode);
                    _this.nodeMap[id] = map;
                }
            };
            
            adjust(data, newData);
            
            return newData;
        },

        /**
         * Retrieve nodes map
         * 
         * @return {}
         */
        getNodeMap: function()
        {
            return this.nodeMap;
        }
        
    });
    
})();
