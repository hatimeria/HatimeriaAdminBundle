Ext.ns("HatimeriaAdmin")

Ext.define('HatimeriaAdmin.store.MenuStore', {
    extend: 'Ext.data.TreeStore',
    root: {
        expanded: true,
        children: [
        {
            text: "Users",
            expanded: true,
            children:
            [{
                text: 'All',
                id: 'user-list',
                leaf: true
            }]
        }]
    }
});