(function() {
    
    Ext.require("HatimeriaAdmin.model.UserModel");

    Ext.define('HatimeriaAdmin.store.UserStore',  {
        extend: 'HatimeriaAdmin.store.BaseStore',

        constructor: function(cfg)
        {
            var config = {
                directFn: Actions.HatimeriaAdmin_User.list,
                model: 'HatimeriaAdmin.model.UserModel'
            };
            Ext.apply(config, cfg || {});
            
            this.callParent([config]);
        }
    });
    
})();
