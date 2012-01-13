(function() {
    
    Ext.require('HatimeriaAdmin.core.component.StatusComponent');
    Ext.require('HatimeriaAdmin.core.InternalButton');
    
    Ext.define("HatimeriaAdmin.core.component.UserStatusComponent", {
        extend: "HatimeriaAdmin.core.component.StatusComponent",
        mixins: {
            translationable: 'Hatimeria.core.mixins.Translationable'
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
                    margin: '3 10 0 10',
                    uri: 'fos_user_security_logout'
                }));


                if (_user.isSwitched) {
                    this.add(Ext.create("HatimeriaAdmin.core.component.BackToAdminButton"));
                }

                if (_user.isAdmin) {
                    this.add(
                            Ext.create("Hatimeria.core.form.UserSwitch", {
                                width: 300,
                                height: 50,
                                margin: '3 10 0 10',
                                store: Ext.create("HatimeriaAdmin.users.store.UserStore")
                            })
                            );
                }
            });
        }
    });
    
})();