(function() {
    
    Ext.define('HatimeriaAdmin.users.UsersPanel', {   
        extend: 'HatimeriaAdmin.core.grid.BaseGrid',
        requires: ["HatimeriaAdmin.users.store.UserStore"],

        initComponent: function()
        {
            var config = {
                title: __('users'),
                store: Ext.create('HatimeriaAdmin.users.store.UserStore'),
                columns: [
                    {header: 'Id', dataIndex: 'id', width: 50},
                    {header: 'Nazwa', dataIndex: 'username', width: 150},
                    {header: 'Email', dataIndex: 'email', width: 200},
                    {header: 'Włączony', dataIndex: 'enabled', width: 60, renderer: this.rendererYesNo}
                ]
            };
            
            Ext.apply(this, Ext.apply(config, this.initialConfig));
            this.callParent();
            
            this.processExtraFeatures('initComponent');
        },
        
        /**
         * Process all extrafeatures miexd in to this object
         * 
         * @param string method
         */
        processExtraFeatures: function(method)
        {
            var 
                retObj = {}, 
                obj;
            
            if (typeof this.extraFeatures == 'undefined')
            {
                return false;
            }
            
            for (var name in this.extraFeatures)
            {
                obj = Ext.create(this.extraFeatures[name]);
                
                if (typeof obj[method] === 'function')
                {
                    retObj[name] = obj[method](this);
                }
            }
            
            return retObj;
        },
        
        /**
         * Event: edit click
         * 
         * @param Ext.data.Model record
         * @param int index
         */
        onEditClick: function(record, index)
        {
            var userwindow = Ext.create('HatimeriaAdmin.users.window.UserWindow', {
                title: Ext.String.format('Edycja użytkownika: "{0}"', record.get('email')),
                onSave: function(record) {
                    alert("Funkcja niedostępna");
                    // @TODO ZAPIS UŻYTKOWNIKA POPRZEZ CRUD API DIRECT
                    
                }
            });
            userwindow.show();
            userwindow.populate(record);
        },

        /**
         * Event: edit click
         * 
         * @param Ext.data.Model record
         * @param int index
         */
        onRemoveClick: function(record, index)
        {
            var store = this.store;
            
            Ext.create('HatimeriaCore.direct.ResponseHandler', {
                fn: Actions.HatimeriaAdmin_User.remove,
                params: {id: record.get('id')},
                success: function() {
                    store.remove(record);
                }
            });               
        }
    });
    
})();
