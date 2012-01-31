/**
 * User Model
 */
(function() {
    
    Ext.define('HatimeriaAdmin.users.model.UserModel', {
        extend: 'Hatimeria.core.model.DirectModel',
        api: 'HatimeriaAdmin_User',
        fields: [
            {name: 'id', type: 'int'},
            {name: 'username', type: 'string'},
            {name: 'email', type: 'string'},
            {name: 'enabled', type: 'boolean'},
            {name: 'administrator', type: 'boolean'},
            {name: 'created_at', type: 'string'},
            {name: 'updated_at', type: 'string'}
        ]
    });
    
})();
