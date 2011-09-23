Ext.ns("HatimeriaAdmin");

Ext.define("HatimeriaAdmin.component.StatusComponent", {
    extend: "Ext.container.Container",
    width   : 800,
    border  : 1,
    padding: 5,
    style: {borderColor:'silver', borderStyle:'solid', borderWidth:'1px', background: 'white'},    
    layout: {
        type: 'hbox',
        align: 'middle'
    },
    initComponent: function() {
      this.callParent();
      this.add({
         html: this.statusText,
         padding: 5,
         border: 0
      });
    },
    items: [
        {
            html: '<b>Hatimeria CMF</b>',
            padding: 5,
            border: 0
        }        
    ]
});