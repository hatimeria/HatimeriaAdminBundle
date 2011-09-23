Ext.ns("HatimeriaAdmin");

Ext.define("HatimeriaAdmin.form.LoginForm", {
    extend: "Ext.form.Panel",
    layout: 'anchor',
    bodyPadding: 10,
    defaults: {
        anchor: '95%'
    },
    defaultType: 'textfield',
    buttons: [
        {
            text: 'Submit',
            formBind: true, //only enabled once the form is valid
            disabled: true,
            handler: function() {
                var form = this.up('form').getForm();
                if (form.isValid()) {
                    form.submit({
                        success: function(form, action) {
                            window.location = Routing.generate('homepage');
                        },
                        failure: function(form, action) {
                            Ext.Msg.alert('Login failed', action.result.msg);
                        }
                    });
                }
            }        
        }
    ],
    items: [{
        fieldLabel: 'Login',
        name: '_username',
        allowBlank: false
    },{
        fieldLabel: 'Password',
        inputType: 'password',
        name: '_password',
        allowBlank: false
    }]
})