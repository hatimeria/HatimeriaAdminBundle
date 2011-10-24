/** 
 * Init application of admin panel
 */
Ext.require("HatimeriaAdmin.users.store.UserStore")
Ext.require("HatimeriaAdmin.core.store.MenuStore");
Ext.require("HatimeriaAdmin.core.tree.MenuTree");
Ext.require("HatimeriaAdmin.core.component.ContainerComponent");
Ext.require("HatimeriaAdmin.core.component.GuestStatusComponent");
Ext.require("HatimeriaAdmin.core.component.UserStatusComponent");
Ext.require("HatimeriaAdmin.core.form.UserSwitch");

Ext.onReady(function() {
    
    Ext.create('HatimeriaAdmin.core.store.MenuStore', {
        storeId: 'app-menu-store'
    });
    
    Ext.create("Ext.container.Viewport", {
        layout: 'border',
        renderTo: Ext.getBody(),
        id: 'app-viewport',
        items: [
            Ext.create("HatimeriaAdmin.core.component." + (_user.signedIn ? "User": "Guest") + "StatusComponent", {
                region: 'north',
                height: 60
            }),
            Ext.create('HatimeriaAdmin.core.tree.MenuTree', {
                id: 'app-menu-tree',
                xtype: 'panel',
                region: 'west',
                width: 250
            }),
            Ext.create('HatimeriaAdmin.core.component.ContainerComponent', {
                id: 'app-content-panel',
                xtype: 'panel',
                region: 'center'
            })
        ]
    });
    
});