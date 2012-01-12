(function() {

    Ext.define('HatimeriaAdmin.newsletter.store.NewsletterStore', {
    	extend: 'Hatimeria.core.store.BaseStore',
        id: 'newsletter-store',
        model: 'HatimeriaAdmin.newsletter.model.NewsletterModel',
        pageSize: 10,
        sorters: [
            {property : 'created_at', direction: 'DESC'}
        ]
    });
})();