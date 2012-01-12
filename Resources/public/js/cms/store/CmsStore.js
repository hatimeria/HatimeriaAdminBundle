(function() {
    
    Ext.define('HatimeriaAdmin.cms.store.CmsStore', {
    	extend: 'Hatimeria.core.store.BaseStore',
        model: 'HatimeriaAdmin.cms.model.CmsModel',
        id: 'cms-store',
        pageSize: 10,
        sorters: [
            {property: 'id', direction: 'ASC'}
        ]
    });
})();