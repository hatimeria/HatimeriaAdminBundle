/**
 * Newsletter Model
 */
(function() {
    
    Ext.define('HatimeriaAdmin.newsletter.model.NewsletterModel', {
        extend: 'Ext.data.Model',
        fiels: [
            {name: 'id', type: 'int'},
            {name: 'subject', type: 'string'},
            {name: 'body', type: 'string'},
            {name: 'created_at', type: 'string'},
            {name: 'sent', type: 'boolean'}
        ]
        
    })
    
})();