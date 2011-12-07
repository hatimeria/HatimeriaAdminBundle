(function() {
    
    Ext.define('HatimeriaAdmin.users.UsersPanel', {   
        extend: 'HatimeriaAdmin.core.grid.BaseGrid',
        requires: ["HatimeriaAdmin.users.store.UserStore"],
        mixins: {
            extrafeatures: 'HatimeriaAdmin.core.utils.ExtraFeatures'
        },

        initComponent: function()
        {
            var store = Ext.create('HatimeriaAdmin.users.store.UserStore');
            var config = {
                title: __('users'),
                id: 'all-users-grid',
                store: store,
               bbar: Ext.create('Ext.PagingToolbar', {
                    store: store,
                    displayInfo: true,
                    displayMsg: 'Rekordy {0} - {1} of {2}',
                    emptyMsg: "Brak rekordów"
                }),                
                columns: [
                    {header: 'Id', dataIndex: 'id', width: 80},
                    {header: 'Nazwa', dataIndex: 'username', width: 180},
                    {header: 'Email', dataIndex: 'email', width: 220},
                    {header: 'Włączony', dataIndex: 'enabled', width: 80, renderer: this.rendererYesNo}
                ]
            };
            
            Ext.apply(this, Ext.apply(config, this.initialConfig));
            this.callParent();
            
            this.processExtraFeatures('initComponent');
        },
        
        /**
         * Event: edit click
         * 
         * @param Ext.data.Model record
         * @param int index
         */
        onEditClick: function(record, index)
        {
            var directFn = this.processExtraFeatures('getDirectUpdateFn');
            if(!directFn) {
                // @todo default directFn for user updating
                directFn = function() {
                    alert("Funkcja niedostępna");
                }                
            }
            
            var formConfig = {
                api: {
                    submit: directFn
                },             
                submitConfig: {
                    text: "Zapisz"
                }
            };
            
            var userwindow = Ext.create('HatimeriaAdmin.users.window.UserWindow', {
                title: Ext.String.format('Edycja użytkownika: "{0}"', record.get('email')),
                formConfig: formConfig
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
            
            Ext.create('Hatimeria.core.response.DirectHandler', {
                fn: Actions.HatimeriaAdmin_User.remove,
                params: {id: record.get('id')},
                success: function() {
                    store.remove(record);
                }
            });               
        }
    });
    
})();
