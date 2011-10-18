Ext.require("HatimeriaAdmin.store.MenuStore");
Ext.require("HatimeriaAdmin.panel.AdminMenuPanel");

Ext.onReady(function() {
    
    // @todo nice interface to add another grid to admin menu   
    
    // Admin menu
    var menu = Ext.create("HatimeriaAdmin.panel.AdminMenuPanel", {
        store: Ext.create("HatimeriaAdmin.store.MenuStore")
    });
    
    // Content container
    var contentPanel = Ext.create("Ext.container.Container", {
            id: 'content-panel',
            margins: '0 0 0 0',
            layout: 'card',
            flex: 10,
            activeItem: 1,
            border: false
	});
   
    // Content and menu container
    var body = Ext.create("Ext.container.Container", {
        flex: 10, 
        layout: {
            type: 'hbox', 
            align: 'stretch'
        }, 
        items: [menu, contentPanel]
    });
    
    // All users list
    var usersStore = Ext.create('HatimeriaAdmin.store.UserStore');
    usersStore.load();
    
    var users = Ext.create('HatimeriaAdmin.grid.UserGrid', {
        store: usersStore,
        id: 'users-all-panel'
    });
    
    contentPanel.add(users);
    
    // Admin welcome message
    var welcome = Ext.create("Ext.panel.Panel", {
        layout: 'fit',
        title: __('welcome.title'),
        id: 'welcome-panel',
        html: __('welcome.text'),
        bodyPadding: 10
    });        
    
    contentPanel.add(welcome);
    
    var tree = Ext.create('HatimeriaAdmin.tree.CategoriesTree', {
        id: 'categories-panel'
    });
    contentPanel.add(tree);
    
    Ext.create("Ext.container.Viewport", {
		layout: {
                 type: 'vbox',
                 align: 'stretch'
                },
                id: 'main-viewport',
		items: [
                    Ext.create("HatimeriaAdmin.component." + (_user.signedIn ? "User": "Guest") + "StatusComponent"),
                    body
		],
        renderTo: Ext.getBody()
    });
    
    
});