(function() {
    
    Ext.require("HatimeriaAdmin.users.model.UserModel");

    Ext.define('HatimeriaAdmin.users.store.UserStore',  {
        extend: 'Hatimeria.core.store.BaseStore',
        
        /**
         * Constructor
         * 
         * @param {} cfg
         */
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
