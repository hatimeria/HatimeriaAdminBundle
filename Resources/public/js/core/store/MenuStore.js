(function() {
    
    Ext.define('HatimeriaAdmin.core.store.MenuStore', {
        extend: 'Ext.data.TreeStore',
        mixins: {
            translationable: 'Hatimeria.core.mixins.Translationable'
        },
        transDomain: 'HatimeriaAdminBundle',
        transNS: 'menu',
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
                
                for (var i in nodes)
                {
                    var node = nodes[i];
                    var id = node.code;
                    var label;
                    
                    if(node.text) {
                      label = node.text;  
                    } else {
                        if(node.ns)
                        {
                            label = __(node.ns + 'Bundle:' + id + ".title")
                        } else {
                            label = _this.__(id + '.title')
                        }
                    }
                    
                    newNode = {
                        id: id,
                        text: label
                    };
                    map = Ext.clone(node);
                    map.id = id;
                    if (map.children)
                    {
                        delete map.children;
                    }
                    
                    if (typeof node.children == 'object')
                    {
                        newNode.expanded = true;
                        newNode.leaf = false;
                        newNode.children = [];
                        adjust(node.children, newNode.children);
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
