(function() {
    
    Ext.define('HatimeriaAdmin.users.store.UserStore',  {
        extend: 'Hatimeria.core.store.BaseStore',
        model: 'HatimeriaAdmin.users.model.UserModel',
        id: 'users-store'
    });
    
})();
