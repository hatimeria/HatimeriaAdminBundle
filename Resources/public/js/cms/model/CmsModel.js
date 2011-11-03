/**
 * Cms Model
 */
(function() {
    
    Ext.define('HatimeriaAdmin.cms.model.CmsModel', {
        extend: 'Ext.data.Model',
        fields: [
            {name: 'id', type: 'int'},
            {name: 'primary_path', type: 'string', mapping: 'primary_path.uri'},
            {name: 'title', type: 'string'},
            {name: 'body', type: 'string'},
            {name: 'publish_from', type: 'string'},
            {name: 'author', type: 'string'},
            {name: 'publish_to', type: 'string'},
            {name: 'is_published', type: 'string'},
            {name: 'meta_description', type: 'string'},
            {name: 'meta_keywords', type: 'string'},
            {name: 'created_at', type: 'string'}
        ]
        
    });
    
})();
