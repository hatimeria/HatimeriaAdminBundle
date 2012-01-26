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
                width: '100%',
                height: 600,
                layout: {
                    type: 'vbox',
                    padding: '10'
                },
                items: [
                    {
                        layout: {
                            type: 'hbox'
                        },
                        itemId: 'user-status-text',
                        xtype: 'container',
                        items: [
                            {
                                xtype: 'container',
                                width: 200,
                                bodyStyle: 'width: 200px',
                                style: {
                                    background: 'transparent'
                                },
                                border: 0,
                                html: this.statusText
                            }
                        ],
                        style: 'background: transparent;',
                        width: '100%',  
                        border: 0
                    }
                ]
            };

            Ext.apply(this, Ext.apply(config, this.initialConfig));
            
            this.callParent();
        }
    });
    
})();