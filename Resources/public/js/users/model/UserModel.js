/**
 * User Model
 */
(function() {
    
    Ext.define('HatimeriaAdmin.users.model.UserModel', {
        extend: 'Ext.data.Model',
        mixins: {
            configurable: 'Hatimeria.core.mixins.ConfigurableExternal'
        },
        fields: [
            {name: 'id', type: 'int'},
            {name: 'username', type: 'string'},
            {name: 'email', type: 'string'},
            {name: 'enabled', type: 'boolean'}
        ],
        
        constructor: function()
        {
            var config = this.getConnectedConfig();
            
            for (var i in config.fields)
            {
                this.fields.add(new Ext.data.Field(config.fields[i]));
            }
            
            this.callParent(arguments);
        }
    });
    
})();
