Ext.define("HatimeriaAdmin.core.window.LoginWindow", {
    extend: "Ext.window.Window",
    title: this.__("window.login.title"),
    width: 300,
    height: 180,
    layout: {
     type: 'fit',
     align: 'center'
    },  
    initComponent: function() {
        this.callParent();
        this.add(Ext.create("HatimeriaAdmin.core.form.LoginForm"));
    }
})