/**
 * Categories Store
 */
(function() {
    
    Ext.define('HatimeriaAdmin.store.CategoryTreeStore', {
        extend: 'Ext.data.TreeStore',
        
        storeId: 'cateogoriey-tree-store',
        paramsAsHash: true,
        proxy: {
            type: 'direct',
            api: {
                read: Actions.CarbonOffer_Category.node
            },
            reader: {
                idProperty: 'id',
                root: 'record'
            }
        },
        fields: ['id', 'text', 'leaf', 'children'],
        root: {
            expanded: true,
            text: "Kategorie"
        }
    });
    
})();