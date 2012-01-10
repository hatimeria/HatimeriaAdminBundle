/**
 * User Model
 */
(function() {
    
    Ext.define('HatimeriaAdmin.users.model.UserModel', {
        extend: 'Hatimeria.core.model.DirectModel',
        fields: [
            {name: 'id', type: 'int'},
            {name: 'username', type: 'string'},
            {name: 'email', type: 'string'},
            {name: 'enabled', type: 'boolean'}
        ]
    });
    
})();
