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
                        layout: 'auto',
                        itemId: 'user-status-text',
                        xtype: 'container',
                        items: [
                            {
                                xtype: 'container',
                                style: {
                                    background: 'transparent',
                                    width: '300px',
                                    margin: '10px 0px'
                                },
                                border: 0,
                                html: this.statusText
                            }
                        ],
                        style: 'background: transparent; overflow: hidden; margin: 10px; margin-left: 8px;',
                        width: '300px',  
                        border: 0
                    }
                ]
            };

            Ext.apply(this, Ext.apply(config, this.initialConfig));
            
            this.callParent();
        }
    });
    
})();