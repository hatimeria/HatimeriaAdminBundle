(function() {
    
    Ext.require('HatimeriaAdmin.cms.model.CmsModel');
    
    Ext.define('HatimeriaAdmin.cms.store.AllStore', {
    	extend: 'Hatimeria.core.store.BaseStore',

        constructor: function(cfg)
        {
            var config = {
                id: 'cms-store',
                pageSize: 10,
                model: 'HatimeriaAdmin.cms.model.CmsModel',
                api: {
                    read: Actions.HatimeriaAdmin_Cms.list,
                    update: Actions.HatimeriaAdmin_Cms.add
                },
                sorters: [
                    {property: 'id', direction: 'ASC'}
                ]
            };
            
            Ext.apply(config, cfg || {});

            this.callParent([config]);
        }
    });
})();