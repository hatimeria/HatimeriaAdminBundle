Ext.ns("HatimeriaAdmin");

Ext.define("HatimeriaAdmin.window.LoginWindow", {
    extend: "Ext.window.Window",
    title: "Login Window",
    width: 300,
    height: 180,
    layout: {
     type: 'fit',
     align: 'center'
    },  
    initComponent: function() {
        this.callParent();
        this.add(Ext.create("HatimeriaAdmin.form.LoginForm", {url: Routing.generate('fos_user_security_check')}));
    }
})