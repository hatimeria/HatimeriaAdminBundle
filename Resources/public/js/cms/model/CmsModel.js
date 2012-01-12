/**
 * Cms Model
 */
(function() {
    
    Ext.define('HatimeriaAdmin.cms.model.CmsModel', {
        extend: 'Hatimeria.core.model.DirectModel',
        api: 'HatimeriaAdmin_Cms',
        fields: [
            {name: 'id', type: 'int'},
            {name: 'path', type: 'string'},
            {name: 'title', type: 'string'},
            {name: 'body', type: 'string'},
            {name: 'publish_from', type: 'string'},
            {name: 'author', type: 'string'},
            {name: 'publish_to', type: 'string'},
            {name: 'is_published', type: 'string'},
            {name: 'meta_description', type: 'string'},
            {name: 'meta_keywords', type: 'string'},
            {name: 'created_at', type: 'string'},
            {name: 'updated_at', type: 'string'}
        ]
        
    });
    
})();
