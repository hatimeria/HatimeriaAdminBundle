Ext.ns("HatimeriaAdmin");

Ext.define("HatimeriaAdmin.component.UserStatusComponent", {
    extend: "HatimeriaAdmin.component.StatusComponent",
    
    initComponent: function() {
        this.statusText = 'logged in as <b>' + user.data.username + '</b>';
        this.callParent();
        this.add(Ext.create('Ext.Button', {
            text: 'Logout',
            handler: function() {
                document.location = Routing.generate('fos_user_security_logout');
            }
        })); 
        
        if(user.isAdmin) {
            this.add(Ext.create('Ext.Button', {
                text: 'Administration',
                margin: 5,
                handler: function() {
                    document.location = Routing.generate('administration');
                }
            })); 
        }
    }
})