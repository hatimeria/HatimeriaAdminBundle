/** 
 * Init application of admin panel
 */

Ext.require("HatimeriaAdmin.core.InternalButton");

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
                height: 80
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