(function() {
    
    Ext.require('HatimeriaAdmin.cms.model.CmsModel');
    
    Ext.define('HatimeriaAdmin.cms.store.AllStore', {
    	extend: 'HatimeriaAdmin.core.store.BaseStore',

        constructor: function(cfg)
        {
            var config = {
                id: 'cms-store',
                pageSize: 10,
                model: 'HatimeriaAdmin.cms.model.CmsModel',
                api: {
                    read: Actions.SferaAdmin_Cms.list,
                    update: Actions.SferaAdmin_Cms.add
                },
                sorters: [
                    {field: 'created_at', direction: 'DESC'}
                ]
            };
            
            Ext.apply(config, cfg || {});

            this.callParent([config]);
        }
    });
})();