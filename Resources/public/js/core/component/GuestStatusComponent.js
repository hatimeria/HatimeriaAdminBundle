(function() {
    
    Ext.require('HatimeriaAdmin.core.component.StatusComponent');
    
    Ext.define("HatimeriaAdmin.core.component.GuestStatusComponent", {
        extend: "HatimeriaAdmin.core.component.StatusComponent",
        mixins: {
            translationable: 'HatimeriaCore.mixins.Translationable'
        },
        transDomain: 'HatimeriaAdminBundle',

        initComponent: function()
        {
            this.statusText = __('Not logged in, please');

            this.callParent();
            
            this.on('afterrender', function() {
                
                this.add(Ext.create('Ext.Button', {
                    text: __('HatimeriaAdminBundle:login'),
                    handler: function() {
                        var loginWindow = Ext.create("HatimeriaAdmin.window.LoginWindow");
                        loginWindow.show();
                    }
                }));
                
            });
        }
    });
    
})();
