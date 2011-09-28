Ext.ns("HatimeriaAdmin");

Ext.define("HatimeriaAdmin.component.UserStatusComponent", {
    extend: "HatimeriaAdmin.component.StatusComponent",
    
    initComponent: function() {
        this.statusText = __('status.signed-in-as') + '&nbsp<b>' + user.data.username + '</b>';
        
        if(user.isSwitched) {
            this.statusText += ' <i style="color: silver; font-size: 8pt">(' + __('switch.active') + ')</i>';
        }
        
        this.items.push({
            xtype: 'h-button',
            text: 'logout',
            uri: 'fos_user_security_logout'
        });        
        
        if(user.isSwitched) {
            this.items.push(Ext.create('Ext.Button', {
                text: __('switch.back'),
                handler: function() {
                    document.location = Routing.generate('homepage') + '?_switch_user=_exit';
                }
            }));
        }
        
        if(user.isAdmin) {
            this.items.push({
                xtype: 'h-button',
                uri: 'administration'
            });
            
            this.items.push(Ext.create("HatimeriaAdmin.form.UserSwitch", {
                store: Ext.create("HatimeriaAdmin.store.UserStore")
            }));
        }
        
        this.callParent();
    }
})