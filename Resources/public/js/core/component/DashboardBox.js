Ext.define("HatimeriaAdmin.core.component.DashboardBox", {
    alias: 'widget.h-dashboard-box',
    mixins: {
        translationable: 'Hatimeria.core.mixins.Translationable'
    },
    transDomain: 'HatimeriaAdminBundle',    
    transNS: 'dashboard',
    extend: 'Ext.panel.Panel',
    height: 150,
    margin: 20,
    width: 300,
    style: 'border-top: 1px;',
    bodyPadding: '5',
    
    constructor: function(config) {
        config.title = this.__(config.name + '.title');
        config.items = [
            {
                xtype: 'container',
                padding: '10 0',
                border: 0,
                html: this.__(config.name + '.description')
            },
            config.content
        ];
        
        this.callParent([config])
    }
})