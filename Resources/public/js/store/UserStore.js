Ext.require("HatimeriaAdmin.model.UserModel");

Ext.define('HatimeriaAdmin.store.UserStore', 
        {
            extend: 'HatimeriaAdmin.store.BaseStore',
            cfg: {
                directFn: Actions.HatimeriaAdmin_User.list,
                model: 'HatimeriaAdmin.model.UserModel'
            }
        }
);