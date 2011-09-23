Ext.ns("HatimeriaAdmin");

Ext.define("HatimeriaAdmin.component.GuestStatusComponent", {
    extend: "HatimeriaAdmin.component.StatusComponent",
    
    initComponent: function() {
        this.statusText = 'Not logged in, please</i>';
        this.callParent();
        this.add(Ext.create('Ext.Button', {
            text: 'Login',
            handler: function() {
                var loginWindow = Ext.create("HatimeriaAdmin.window.LoginWindow");
                loginWindow.show();
            }
        }));
    }
})
   