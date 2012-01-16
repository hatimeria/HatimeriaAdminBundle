(function() {
    
    Ext.require('HatimeriaAdmin.core.InternalButton');
    
    Ext.define("HatimeriaAdmin.core.component.StatusComponent", {
        extend: "Ext.container.Container",
        mixins: {
            translationable: 'Hatimeria.core.mixins.Translationable'
        },
        transDomain: 'HatimeriaAdminBundle',

        initComponent: function() {

            var config = {
                style: {
                    background: 'transparent'
                },    
                defaults: {
                    margin: 3
                },
                layout: {
                    type: 'hbox',
                    padding: '10'
                },
                items: [
                    {
                        xtype: 'container',
                        html: this.statusText,
                        style: 'background: transparent; text-align: right',
                        padding: 5,
                        flex: 1,
                        border: 0
                    }
                ]
            };

            Ext.apply(this, Ext.apply(config, this.initialConfig));
            
            this.callParent();
        }
    });
    
})();