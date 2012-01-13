/**
 * Main Panel
 */
(function() {
    
    Ext.define('HatimeriaAdmin.main.MainPanel', {
        extend: 'Ext.panel.Panel',
        mixins: {
            translationable: 'Hatimeria.core.mixins.Translationable'
        },
        transDomain: 'HatimeriaAdminBundle',
        initComponent: function()
        {
            var config = {
                title: this.__("welcome.title"),
                frame: false,
                border: 0,
                bodyStyle: 'background: transparent',
                bodyPadding: 50,
                items: [
                    Ext.create("HatimeriaAdmin.core.component." + (_user.signedIn ? "User": "Guest") + "StatusComponent", {
                    })
                ]
            };
            
            Ext.apply(this, Ext.apply(config, this.initialConfig));
            
            this.callParent();
        }
    });
    
})();