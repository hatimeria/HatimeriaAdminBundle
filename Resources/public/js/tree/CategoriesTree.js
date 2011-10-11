/**
 * Category Manager
 */
(function() {
    
    Ext.define('HatimeriaAdmin.tree.CategoriesTree', {
        extend: 'Ext.tree.Panel',
        
        /**
         * Initializes tree
         */
        initComponent: function()
        {
            var config = {
                title: 'Kategorie',
                store: Ext.create('HatimeriaAdmin.store.CategoryTreeStore'),
                rootVisible: true,
                dockedItems: [
                    {
                        xtype: 'toolbar',
                        dock: 'top',
                        items: [
                            {
                                xtype: 'button',
                                text: 'Dodaj kategorię',
                                scope: this,
                                handler: this.onAddClick
                            }
                        ]
                    }
                ]
            };
            
            this.addEvents('addcategory');
            
            Ext.apply(this, Ext.apply(config, this.initialConfig || {}));
            this.callParent();
            
            this.on('itemcontextmenu', this.onContextMenu, this);
        },
        
        /**
         * Event: add category click
         * 
         * @param Ext.button.Button button
         */
        onAddClick: function(button)
        {
            var _this = this;
            var selNode = this.getSelectionModel().getLastSelected();
            
            if (!selNode)
            {
                selNode = this.getRootNode();
            }
            
            selNode.expand();
            
            Ext.Msg.prompt(Ext.String.format('Nowa kategoria w: {0}', selNode.get('text')), 'Podaj nazwę kategorii', function(btn, value) {
                _this.addCategory(value, selNode);
            });
        },
        
        /**
         * Add category to passes node
         * 
         * @param string value
         * @param Ext.data.Node selNode
         */
        addCategory: function(value, selNode)
        {
            Ext.create('HatimeriaCore.direct.ResponseHandler', {
                fn: Actions.CarbonOffer_Category.create,
                params: {text: value, id: selNode.get('id')},
                scope: this,
                success: function(result) {
                    selNode.appendChild({
                        text: result.record.text,
                        id: result.record.id,
                        leaf: result.record.leaf
                    });
                    this.fireEvent('addcategory');
                }
            });
        },
        
        /**
         * Event: right click on node
         * 
         * @param Ext.tree.Panel
         * @param Ext.data.Node
         * @param DOMElement el
         * @param int index
         * @param Ext.Object.Event event
         */
        onContextMenu: function(panel, node, el, index, event)
        {
            Ext.create('Ext.menu.Menu', {
                width: 120,
                items: [
                    {
                        text: 'Edytuj kategorię',
                        cls: 'ux-edit',
                        scope: this,
                        handler: function()
                        {
                            this.onEditClick(node, index);
                        }
                    },
                    {
                        text: 'Usuń kategorię',
                        cls: 'ux-remove',
                        scope: this,
                        handler: function() {
                            this.onRemoveClick(node, index);
                        }
                    }
                ]
            }).showAt(event.getXY());
            
            event.stopEvent();
        },
        
        /**
         * Event: remove click from menu
         * 
         * @param Ext.data.TreeNode node
         * @param int index
         */
        onRemoveClick: function(node, index)
        {
            Ext.Msg.confirm('Uwaga!', Ext.String.format('Nastąpi usunięcie kategorii: "{0}"</br>Czy kontynuować?', node.get('text')), function(msg) {
                if (msg != 'yes')
                {
                    return false;
                }
                
                Ext.create('HatimeriaCore.direct.ResponseHandler', {
                    fn: Actions.CarbonOffer_Category.remove,
                    params: {id: node.get('id')},
                    scope: this,
                    success: function(result) {
                        node.remove();
                    }
                });
            });
        },
        
        /**
         * Event: edit node
         * 
         * @param Ext.data.TreeNode node
         * @param int index
         */
        onEditClick: function(node, index)
        {
            var _this = this;
            Ext.Msg.prompt(Ext.String.format('Edycja: "{0}"', node.get('text')), 'Nowa nazwa kategorii', function(btn, value) {
                if (btn != 'ok')
                {
                    return false;
                }
                
                Ext.create('HatimeriaCore.direct.ResponseHandler', {
                    fn: Actions.CarbonOffer_Category.edit,
                    params: {
                        text: value, 
                        id: node.get('id')
                    },
                    scope: _this,
                    success: function(result) {
                        node.set('text', result.record.text);
                    }
                });
                
            }, this, undefined, node.get('text'));
        }
    });
    
})();