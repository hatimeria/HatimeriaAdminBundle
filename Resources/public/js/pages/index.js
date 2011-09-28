Ext.onReady(function() {
    
    var userGrid = Ext.create('HatimeriaAdmin.grid.UserGrid', {
        flex: 1,
        store: Ext.create("HatimeriaAdmin.store.UserStore").load()
    });    
    
    var userStatus = Ext.create("HatimeriaAdmin.component." + (user.signedIn ? "User": "Guest") + "StatusComponent");

    Ext.create('Ext.Panel', {
        width: 850,
        height: 600,
        margin: 10,
        border: 0,
        id: 'main-panel',
        layout: {
            type: 'vbox',
            align: 'stretched'
        },
        items: [
           userStatus, userGrid
        ],
        renderTo: document.body
    });

});