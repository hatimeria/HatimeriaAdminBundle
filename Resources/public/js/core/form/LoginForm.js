Ext.define("HatimeriaAdmin.core.form.LoginForm", {
    extend: "HatimeriaCore.form.BaseForm",
    transNS: "form.login",

    /**
     * Constructor
     * 
     * @param {} cfg
     */
    constructor: function(cfg)
    {
        var config = cfg || {};
        config.url = Routing.generate('fos_user_security_check');
        
        this.callParent([config]);
    },
    
    /**
     * Initialize component
     */
    initComponent: function()
    {
        this.submitConfig = {
            text: this.__('submit'),
            success: function() { window.location = Routing.generate('homepage') }
        };
        
        var config = {
            layout: 'auto',
            bodyPadding: 10,
            border: 0,
            defaultType: 'textfield',
            items: [
                {
                    fieldLabel: this.__('login'),
                    name: '_username',
                    allowBlank: false
                },
                {
                    fieldLabel: this.__('password'),
                    inputType: 'password',
                    name: '_password',
                    allowBlank: false
                }
            ]
        };
        Ext.apply(this, Ext.apply(config, this.initialConfig))
        
        this.callParent();
    }
})