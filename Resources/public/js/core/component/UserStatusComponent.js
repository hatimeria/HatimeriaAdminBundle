(function() {
    
    Ext.require('HatimeriaAdmin.core.component.StatusComponent');
    Ext.require('HatimeriaAdmin.core.InternalButton');
    
    Ext.define("HatimeriaAdmin.core.component.UserStatusComponent", {
        extend: "HatimeriaAdmin.core.component.StatusComponent",
        mixins: {
            translationable: 'HatimeriaCore.mixins.Translationable'
        },
        transDomain: 'HatimeriaAdminBundle',

        initComponent: function()
        {
            this.statusText = this.__('status.signed-in-as') + '&nbsp<b>' + _user.data.username + '</b>';

            if (_user.isSwitched) {
                this.statusText += ' <i style="color: silver; font-size: 8pt">(' + this.__('switch.active') + ')</i>';
            }

            this.callParent();

            this.on('afterrender', function() {
                
                this.add(Ext.create('HatimeriaAdmin.core.InternalButton', {
                    text: this.__('logout'),
                    uri: 'fos_user_security_logout'
                }));


                if (_user.isSwitched) {
                    this.add(Ext.create('Ext.Button', {
                        text: this.__('switch.back'),
                        handler: function() {
                            document.location = Routing.generate('homepage') + '?_switch_user=_exit';
                        }
                    }));
                }

                if (_user.isAdmin) {
                    this.add(Ext.create('HatimeriaAdmin.core.InternalButton', {
                        uri: this.__('administration')
                    }));

                    this.add(Ext.create("HatimeriaAdmin.core.form.UserSwitch", {
                        store: Ext.create("HatimeriaAdmin.users.store.UserStore")
                    }));
                }
            });
        }
    });
    
})();