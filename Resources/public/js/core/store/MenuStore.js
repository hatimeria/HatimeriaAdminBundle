(function() {
    
    Ext.define('HatimeriaAdmin.core.store.MenuStore', {
        extend: 'Ext.data.TreeStore',
        root: {
            expanded: true,
            children: [
                {
                    leaf: true,
                    text: __("menu.main"),
                    id: 'main'
                },
                {
                    text: __("menu.users"),
                    expanded: true,
                    children: [{
                        text: __('menu.users.all'),
                        id: 'users',
                        leaf: true
                        /*
                         * may define extra parametrs:
                         * params: {},'
                         * 
                         * or: defie custom name of initial panel:
                         * panel: 'NewUsers'
                         */
                    }]
                },
                {
                    text: __('menu.categories'),
                    leaf: true,
                    id: 'categories'
                }
            ]
        }
    });
    
})();
