/** 
 * Init application of admin panel
 */
Ext.require('Hatimeria.core.utils.ConfigManager');
Ext.require("Hatimeria.core.form.UserSwitch");
Ext.require("HatimeriaAdmin.users.store.UserStore");
Ext.require("HatimeriaAdmin.core.store.MenuStore");
Ext.require("HatimeriaAdmin.core.tree.MenuTree");
Ext.require("HatimeriaAdmin.main.MainPanel");
Ext.require("HatimeriaAdmin.core.component.ContainerComponent");
Ext.require("HatimeriaAdmin.core.component.GuestStatusComponent");
Ext.require("HatimeriaAdmin.core.component.UserStatusComponent");

Ext.onReady(function() {
    
    Ext.create('HatimeriaAdmin.core.store.MenuStore', {
        storeId: 'app-menu-store'
    });
    
    Ext.create("Ext.container.Viewport", {
        layout: 'border',
        id: 'app-viewport',
        items: [
            {
                cls: 'hatimeria-main-menu',
                layout: 'vbox',
                region: 'west',
                bodyStyle: 'background: transparent; border: 0',
                width: 230,
                border: 0,
                items:[
                    {
                        border: 0,
                        id: 'logo',
                        width: 230,
                        bodyStyle: 'background: transparent; border: 0',
                        html: '<a href="http://www.hatimeria.pl"><img src="/bundles/hatimeriaadmin/images/hatimeria.png" style="margin-top: 10px; margin-left: 24px"/></a></p>',
                        height: 120
                    },
                    Ext.create('HatimeriaAdmin.core.tree.MenuTree', {
                        id: 'app-menu-tree',
                        background: 'transparent',
                        margin: '0 0 0 15',
                        bodyStyle: 'border: 0; background: transparent',
                        xtype: 'container',
                        width: 230,
                        border: 0,
                        flex: 1
                        })
                ]
            },
            Ext.create('HatimeriaAdmin.core.component.ContainerComponent', {
                id: 'app-content-panel',
                xtype: 'panel',
                border: 0,
                bodyStyle: 'border: 0',
                region: 'center'
            })
        ]
    });
    
});