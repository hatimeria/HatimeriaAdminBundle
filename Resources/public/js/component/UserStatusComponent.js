Ext.ns("HatimeriaAdmin");

Ext.define("HatimeriaAdmin.component.UserStatusComponent", {
    extend: "HatimeriaAdmin.component.StatusComponent",
    
    initComponent: function() {
        this.statusText = 'logged in as <b>' + user.data.username + '</b>';
        
        if(user.isSwitched) {
            this.statusText += '<i style="color: silver; font-size: 8pt">(switched)</i>';
        }
        
        this.items.push(Ext.create('Ext.Button', {
            text: 'Logout',
            handler: function() {
                document.location = Routing.generate('fos_user_security_logout');
            }
        }));
        
        if(user.isSwitched) {
            this.items.push(Ext.create('Ext.Button', {
                text: 'Back to admin',
                handler: function() {
                    document.location = Routing.generate('homepage') + '?_switch_user=_exit';
                }
            }));
        }
        
        if(user.isAdmin) {
            this.items.push(Ext.create('Ext.Button', {
                text: 'Administration',
                handler: function() {
                    document.location = Routing.generate('administration');
                }
            })); 
            
            this.items.push(Ext.create("HatimeriaAdmin.form.UserSwitch", {
                store: Ext.create("HatimeriaAdmin.store.UserStore")
            }));
        }
        
        this.callParent();
    }
})