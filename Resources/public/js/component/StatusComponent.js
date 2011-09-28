Ext.ns("HatimeriaAdmin");

Ext.define("HatimeriaAdmin.component.StatusComponent", {
    extend: "Ext.container.Container",
    border  : 1,
    width: "100%",
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
    initComponent: function() {
        
        this.items.unshift({
            html: this.statusText,
            padding: 5,
            border: 0
        });
        
        this.items.unshift(        
        {
            html: '<b>Hatimeria CMF</b>',
            padding: 5,
            border: 0
        });        
      
        this.callParent();
    },
    items: []
});