/**
 * User Model
 */
(function() {
    
    Ext.define('HatimeriaAdmin.users.model.UserModel', {
        extend: 'Ext.data.Model',
        fields: [
            {name: 'id',           type: 'int'},
            {name: 'username',     type: 'string'},
            {name: 'email',        type: 'string'}
        ]
    });
    
})();
