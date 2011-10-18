(function() {
    
    Ext.require("HatimeriaAdmin.users.model.UserModel");

    Ext.define('HatimeriaAdmin.users.store.UserStore',  {
        extend: 'HatimeriaAdmin.core.store.BaseStore',

        constructor: function(cfg)
        {
            var config = {
                directFn: Actions.HatimeriaAdmin_User.list,
                model: 'HatimeriaAdmin.users.model.UserModel'
            };
            Ext.apply(config, cfg || {});
            
            this.callParent([config]);
        }
    });
    
})();
