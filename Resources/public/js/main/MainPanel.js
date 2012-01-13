/**
 * Main Panel
 */
(function() {
    
    Ext.define('HatimeriaAdmin.main.MainPanel', {
        extend: 'Ext.panel.Panel',
        mixins: {
            translationable: 'Hatimeria.core.mixins.Translationable'
        },
        bodyStyle: 'border: 0',
        transDomain: 'HatimeriaAdminBundle',
        initComponent: function()
        {
            var config = {
                title: this.__("welcome.title"),
                frame: false,
                border: 0,
                bodyStyle: 'background: transparent; border: 0',
                bodyPadding: 50,
                items: [
                    Ext.create("HatimeriaAdmin.core.component." + (_user.signedIn ? "User": "Guest") + "StatusComponent", {
                        style: 'background: transparent'
                    })
                ]
            };
            
            Ext.apply(this, Ext.apply(config, this.initialConfig));
            
            this.callParent();
        }
    });
    
})();