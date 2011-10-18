(function() {
    
    Ext.define("HatimeriaAdmin.core.component.GuestStatusComponent", {
        extend: "HatimeriaAdmin.core.component.StatusComponent",

        initComponent: function()
        {
            this.statusText = __('Not logged in, please');

            this.callParent();

            var config = {
                items: [
                    Ext.create('Ext.Button', {
                        text: __('Login'),
                        handler: function() {
                            var loginWindow = Ext.create("HatimeriaAdmin.window.LoginWindow");
                            loginWindow.show();
                        }
                    })  
                ]
            };

            Ext.apply(this, Ext.apply(config, this.initialConfig));
        }
    });
    
})();
