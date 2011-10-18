/**
 * Categories Store
 */
(function() {
    
    Ext.define('HatimeriaAdmin.categories.store.CategoriesStore', {
        extend: 'Ext.data.TreeStore',
        
        storeId: 'categories-store',
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