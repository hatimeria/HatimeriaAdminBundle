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
                bodyPadding: 100,
                items: [
                    {
                        border: false,
                        style: {textAlign: 'center'},
                        html: '<h2>'+this.__("welcome.text")+'</h2>'
                    }
                ]
            };
            
            Ext.apply(this, Ext.apply(config, this.initialConfig));
            
            this.callParent();
        }
    });
    
})();