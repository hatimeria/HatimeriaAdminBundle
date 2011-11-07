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
                    borderColor:'silver', 
                    borderStyle:'solid', 
                    borderWidth:'1px', 
                    background: 'white'
                },    
                defaults: {
                    margin: 3
                },
                layout: {
                    type: 'hbox',
                    padding: '10',
                    pack: 'center'
                },
                items: [
                    {
                        html: this.statusText,
                        padding: 5,
                        border: 0
                    },
                    {
                        html: '<b>Hatimeria CMF</b>',
                        padding: 5,
                        border: 0
                    }
                ]
            };

            Ext.apply(this, Ext.apply(config, this.initialConfig));
            
            this.callParent();
        }
    });
    
})();