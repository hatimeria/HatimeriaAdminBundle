(function() {
    
    Ext.define('HatimeriaAdmin.store.MenuStore', {
        extend: 'Ext.data.TreeStore',
        root: {
            expanded: true,
            children: [
                {
                    leaf: true,
                    text: __("menu.welcome"),
                    id: 'welcome'
                },
                {
                    text: __("menu.users"),
                    expanded: true,
                    children: [{
                        text: __('menu.users.all'),
                        id: 'users-all',
                        leaf: true
                    }]
                },
                {
                    id: 'categories',
                    leaf: true,
                    text: __('menu.categories')
                }
            ]
        }
    });
    
})();
