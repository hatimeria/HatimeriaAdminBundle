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
                store: Ext.create('HatimeriaAdmin.store.CategoriesStore'),
                rootVisible: true
            };
            
            Ext.apply(this, Ext.apply(config, this.initialConfig || {}))
            this.callParent();
            
            this.on('afterrender', this.expandFirst);
        },
        
        /**
         * Populates tree
         */
        expandFirst: function()
        {
            //this.store.load();
        }
    });
    
})();