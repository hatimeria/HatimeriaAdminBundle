/**
 * Newsletter Model
 */
(function() {
    
    Ext.define('HatimeriaAdmin.newsletter.model.NewsletterModel', {
        extend: 'Hatimeria.core.model.DirectModel',
        api: 'HatimeriaAdmin_Newsletter',
        fields: [
            {name: 'id', type: 'int'},
            {name: 'subject', type: 'string'},
            {name: 'body', type: 'string'},
            {name: 'created_at', type: 'string'},
            {name: 'sent', type: 'boolean'}
        ]
        
    })
    
})();