Ext.ns("HatimeriaAdmin")

Ext.define('HatimeriaAdmin.store.MenuStore', {
    extend: 'Ext.data.TreeStore',
    root: {
        expanded: true,
        children: [
        {
            leaf: true,
            text: "Start",
            id: 'welcome'
        },
        {
            text: "Users",
            expanded: true,
            children:
            [{
                text: 'All',
                id: 'users-all',
                leaf: true
            }]
        }]
    }
});