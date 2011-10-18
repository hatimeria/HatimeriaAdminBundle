(function() {

    Ext.require('HatimeriaAdmin.newsletter.model.NewsletterModel');

    Ext.define('HatimeriaAdmin.newsletter.store.AllStore', {
    	extend: 'HatimeriaAdmin.core.store.BaseStore',

        constructor: function(cfg)
        {
            var config = {
                id: 'newsletter-store',
                model: 'HatimeriaAdmin.newsletter.model.NewsletterModel',
                pageSize: 10,
                api: {
                    read: Actions.SferaAdmin_Newsletter.list,
                    update: Actions.SferaAdmin_Newsletter.edit
                },
                sorters: [
                    {property : 'created_at', direction: 'DESC'}
                ]
            };

            Ext.apply(config, cfg || {});

            this.callParent([config]);

            this.sort('created_at', 'DESC');
        }
    });
})();