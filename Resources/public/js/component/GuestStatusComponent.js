Ext.ns("HatimeriaAdmin");

Ext.define("HatimeriaAdmin.component.GuestStatusComponent", {
    extend: "HatimeriaAdmin.component.StatusComponent",
    
    initComponent: function() {
        this.statusText = __('Not logged in, please');
        this.callParent();
        this.add(Ext.create('Ext.Button', {
            text: __('Login'),
            handler: function() {
                var loginWindow = Ext.create("HatimeriaAdmin.window.LoginWindow");
                loginWindow.show();
            }
        }));
    }
})
   