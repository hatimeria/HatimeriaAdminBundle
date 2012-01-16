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
            this.statusText = this.__('status.signed-in-as') + '&nbsp;<b>' + _user.data.username + '</b>';

            if (_user.isSwitched) {
                this.statusText += ' <i style="color: silver; font-size: 8pt">(' + this.__('switch.active') + ')</i>';
            }

            this.callParent();

            this.on('afterrender', function() {
                
                this.add(Ext.create('HatimeriaAdmin.core.InternalButton', {
                    text: this.__('logout'),
                    margin: '3 5 0 5',
                    uri: 'fos_user_security_logout'
                }));


                if (_user.isSwitched) {
                    this.down('#users-status-text').add(Ext.create("HatimeriaAdmin.core.component.BackToAdminButton"));
                }

                if (_user.isAdmin) {
                    var users = Ext.create("HatimeriaAdmin.users.store.UserStore", {
                        autoLoad: false
                    });
                    
                    users.applyExtraParams({
                       withoutMe: true 
                    });
                    
                    this.add(
                    {
                        xtype: 'panel',
                        title: this.__('switch.box_title'),
                        height: 150,
                        margin: 20,
                        style: 'border-top: 1px;',
                        bodyPadding: '5',
                        items: [
                            {
                              html: 'Możesz zobaczyć jak serwis wygląd od strony danego użytkownika.',
                              padding: 5,
                              border: 0
                            },
                            Ext.create("Hatimeria.core.form.UserSwitch", {
                                height: 50,
                                padding: 5,
                                store: users
                            })
                        ]
                    }
                    );
                }
            });
        }
    });
    
})();