Ext.onReady(function() {

    Ext.create('Ext.Panel', {
        width: 850,
        height: 600,
        margin: 10,
        border: 0,
        id: 'main-panel',
        layout: {
            type: 'vbox',
            align: 'center'
        },
        items: [
           Ext.create("HatimeriaAdmin.component." + (user.signedIn ? "User": "Guest") + "StatusComponent")
        ],
        renderTo: document.body
    });
    
    Ext.create('HatimeriaAdmin.grid.UserGrid', {
        renderTo: function(grid) { Ext.getCmp('main-panel').add(grid) }
    }).init();
});