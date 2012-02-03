(function() {
    
    Ext.define("HatimeriaAdmin.core.component.UserStatusComponent", {
        requires: [
            "HatimeriaAdmin.core.component.StatusComponent",
            "HatimeriaAdmin.core.InternalButton",
            "HatimeriaAdmin.core.component.DashboardBox"
        ],
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
                    this.down('#user-status-text').add(Ext.create("HatimeriaAdmin.core.component.BackToAdminButton"));
                }

                if (_user.isAdmin) {
                    var users = Ext.create("HatimeriaAdmin.users.store.UserStore", {
                        autoLoad: false
                    });
                    
                    users.applyExtraParams({
                       withoutMe: true 
                    });
                    
                    this.add({
                        xtype: 'h-dashboard-box',
                        name: 'switch',
                        content: Ext.create("Hatimeria.core.form.UserSwitch", {
                            padding: '5 0',
                            store: users
                        })
                    });
                        
                    this.add({
                        xtype: 'h-dashboard-box',
                        name: 'language',
                        content: Ext.create("Ext.form.ComboBox", {
                            fieldLabel: this.__('dashboard.language.field_label'),
                            store: [['pl', 'Polski'],['en','English']],
                            listeners: {
                                change: function(field, value) {
                                    window.location = Routing.generate('hatimeria_admin_language_switch', {
                                        _locale: value
                                    })
                                }
                            }
                        })
                    });
                }
            });
        }
    });
    
})();