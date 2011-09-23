Ext.onReady(function() {

    var menuPanel = new Ext.tree.TreePanel({
    	id: 'tree-panel',
    	title: 'Menu',
        split: true,
        height: 300,
        minSize: 150,
        autoScroll: true,
        rootVisible: false,
        lines: false,
        flex: 3,
        singleExpand: true,
        store: Ext.create("HatimeriaAdmin.store.MenuStore")
    });    
    
    

    menuPanel.getSelectionModel().on('select', function(selModel, record) {
        if (record.get('leaf')) {
            Ext.getCmp('content-panel').layout.setActiveItem(record.getId() + '-panel');    
        }
    });    
    
    var contentPanel = {
		id: 'content-panel',
		margins: '2 5 5 0',
                flex: 10,
		activeItem: 0,
		border: false
	};    
    
    new Ext.Viewport({
		layout: 'vbox',
                id: 'main-viewport',
		title: 'Test',
		items: [
                    Ext.create("HatimeriaAdmin.component." + (user.signedIn ? "User": "Guest") + "StatusComponent"),
                    Ext.create("Ext.container.Container", {layout: 'hbox', height: 800, width: 1000, items: [menuPanel, contentPanel]})
		],
        renderTo: Ext.getBody()
    });    
    
    Ext.create('HatimeriaAdmin.grid.UserGrid', {
        renderTo: function(grid) { Ext.getCmp('content-panel').add(grid) }
    }).init();
});