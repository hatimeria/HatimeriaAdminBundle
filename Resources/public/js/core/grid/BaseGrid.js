/* 
 * BaseGrid
 */
(function() {
    
    Ext.define('HatimeriaAdmin.core.grid.BaseGrid', {
        extend: 'Ext.grid.Panel',
        mixins: {
            configurable: 'Hatimeria.core.mixins.ConfigurableExternal'
        },
        
        /**
         * Class name of edit window
         * 
         * @var string
         */
        windowEditClass: false,
        
        /**
         * Initializes component
         */
        initComponent: function()
        {
            this.callParent();
            
            this.on({
                itemcontextmenu: {
                    scope: this,
                    fn: this.onContextMenu
                },
                itemdblclick: {
                    scope: this, 
                    fn: function(grid, record, el, index) {
                        this.onEditClick(record, index);
                    }
                }
            });
        },
        
        /**
         * Edit window class
         * 
         * @return string
         */
        getWindowEditClass: function()
        {
            return this.windowEditClass;
        },
        
        /**
         * Merges external config
         * 
         * @param {} config
         * @return {}
         */
        applyExternal: function(cfg)
        {
            var config = this.getConnectedConfig();
            
            if (config && config.columns)
            {
                for (var i in config.columns)
                {
                    cfg.columns.push(config.columns[i]);
                }
            }
            
            return cfg;
        },
        
        /**
         * Yes/No renderer
         * 
         * @return string
         */
        rendererYesNo: function(value)
        { 
            return value ? 'Tak': 'Nie' 
        },
        
        /**
         * Items for context menu
         * 
         * @return []
         */
        getContextMenuItems: function(record, index)
        {
            return [
                {
                    text: 'Edytuj',
                    cls: 'ux-edit',
                    scope: this,
                    handler: function() {
                        this.onEditClick(record, index);
                    }
                },
                {
                    text: 'Klonuj',
                    cls: 'ux-clone',
                    scope: this,
                    handler: function() {
                        this.onCloneClick(record, index);
                    }
                },
                {
                    text: 'Usuń',
                    cls: 'ux-remove',
                    scope: this,
                    handler: function() {
                        this.onRemoveClick(record, index);
                    }
                }
            ];
        },
        
        /**
         * Event: right click on row
         * 
         * @param Ext.tree.Panel
         * @param Ext.data.Node
         * @param DOMElement el
         * @param int index
         * @param Ext.Object.Event event
         */
        onContextMenu: function(grid, record, el, index, event)
        {
            Ext.create('Ext.menu.Menu', {
                items: this.getContextMenuItems(record, index)
            }).showAt(event.getXY());
            
            event.stopEvent();
        },
        
        /**
         * Event: edit click
         * 
         * @param Ext.data.Model record
         * @param int index
         */
        onEditClick: function(record)
        {
            var editWindow = Ext.create(this.getWindowEditClass());
            editWindow.show();
            editWindow.populate(record);
        },
        
        /**
         * Cloning record
         * 
         * @param Ext.data.Model record
         * @param int index
         */
        onCloneClick: function(record, index)
        {
            var editWindow = Ext.create(this.getWindowEditClass());
            editWindow.show();
            var newRecord = record.copy();
            newRecord.setId('');
            editWindow.populate(newRecord);
        },

        /**
         * Event: remove click
         * 
         * @param Ext.data.Model record
         */
        onRemoveClick: function(record)
        {
            var store = this.store;
            Ext.Msg.confirm('Uwaga', 'Nastąpi usunięcie rekordu z bazy danych.<br/>Czy kontynuować?', function(response) {
                if (response == 'yes')
                {
                    record.destroy({
                        success: function() {
                            store.load();
                        }
                    });
                }
            });
        }
    });
    
})();