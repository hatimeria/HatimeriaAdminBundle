/**
 * Main Panel
 */
(function() {
    
    Ext.define('HatimeriaAdmin.main.MainPanel', {
        extend: 'Ext.panel.Panel',
        
        initComponent: function()
        {
            var config = {
                title: 'Strona główna',
                frame: false,
                bodyPadding: 100,
                items: [
                    {
                        border: false,
                        style: {textAlign: 'center'},
                        html: '<h2>Witaj w panelu administracyjnym</h2>'
                    }
                ]
            };
            
            Ext.apply(this, Ext.apply(config, this.initialConfig));
            
            this.callParent();
        }
    });
    
})();