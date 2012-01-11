/** 
 * Init application of admin panel
 */
Ext.require('Hatimeria.core.utils.ConfigManager');
Ext.require("Hatimeria.core.form.UserSwitch");
Ext.require("HatimeriaAdmin.users.store.UserStore");
Ext.require("HatimeriaAdmin.core.store.MenuStore");
Ext.require("HatimeriaAdmin.core.tree.MenuTree");
Ext.require("HatimeriaAdmin.core.component.ContainerComponent");
Ext.require("HatimeriaAdmin.core.component.GuestStatusComponent");
Ext.require("HatimeriaAdmin.core.component.UserStatusComponent");

Ext.onReady(function() {
    
    Ext.create('HatimeriaAdmin.core.store.MenuStore', {
        storeId: 'app-menu-store'
    });
    
    Ext.create("Ext.container.Viewport", {
        layout: 'border',
        renderTo: Ext.getBody(),
        id: 'app-viewport',
        items: [
            {
                cls: 'hatimeria-main-menu',
                layout: 'vbox',
                region: 'west',
                border: 0,
                items:[
                    Ext.create('HatimeriaAdmin.core.tree.MenuTree', {
                        id: 'app-menu-tree',
                        xtype: 'panel',
                        width: 250,
                        border: 0,
                        flex: 3
                        }),
                    {
                        border: 0,
                        id: 'logo',
                        width: 250,
                        html: '<img src="/bundles/hatimeriaadmin/images/hatimeria_v_220.png"/> <p>Powered by Hatimeria</p> <a href="http://www.hatimeria.pl">www.hatimeria.pl</a>',
                        flex: 1
                    }
                ]
            },
            Ext.create('HatimeriaAdmin.core.component.ContainerComponent', {
                id: 'app-content-panel',
                xtype: 'panel',
                region: 'center'
            })
        ]
    });
    
});