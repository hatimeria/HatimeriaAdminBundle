Ext.define('HatimeriaAdmin.model.UserModel', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id',           type: 'int'},
        {name: 'username',     type: 'string'},
        {name: 'email',        type: 'string'}
    ]
});