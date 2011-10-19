(function() {
    
    Ext.define('HatimeriaAdmin.core.store.MenuStore', {
        extend: 'Ext.data.TreeStore',
        
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
            
            if (typeof data == 'undefined')
            {
                return [];
            }
            
            var newData = [];
            
            var adjust = function(nodes, newNodes) {
                var newNode;
                
                for (var id in nodes)
                {
                    newNode = {
                        id: id,
                        text: nodes[id].text
                    };
                    
                    if (typeof nodes[id].panel != 'undefined')
                    {
                        newNode.panel = nodes[id].panel
                    }
                    
                    if (typeof nodes[id].panel != 'undefined')
                    {
                        newNode.ns = nodes[id].ns
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
                }
            };
        
            adjust(data, newData);
            
            return newData;
        }
        
    });
    
})();
