Ext.define("HatimeriaAdmin.form.LoginForm", {
    extend: "HatimeriaCore.form.BaseForm",
    transNS: "form.login",
    layout: 'anchor',
    bodyPadding: 10,
    defaults: {
        anchor: '95%'
    },
    defaultType: 'textfield',
    constructor: function(cfg) {
        
        var config = cfg || {};
        config.url = Routing.generate('fos_user_security_check');
        
        this.callParent([config]);
    },
    initComponent: function() {
        this.submitConfig = {
            text: this.__('submit'),
            success: function() { window.location = Routing.generate('homepage') }
        };
        
        this.items = [{
                fieldLabel: this.__('login'),
                name: '_username',
                allowBlank: false
            },{
                fieldLabel: this.__('password'),
                inputType: 'password',
                name: '_password',
                allowBlank: false
            }];

        this.callParent();
    }
})