Ext.define('HatimeriaAdmin.grid.UserGrid', 
        {   
            extend: 'Ext.grid.Panel',
            requires: ["HatimeriaAdmin.store.UserStore"],
            title: 'Users',
            width: '100%',
            columns: [
                {header: 'Id', dataIndex: 'id'},
                {header: 'User name', dataIndex: 'username'}, 
                {header: 'Email', dataIndex: 'email'}
            ]
        }
);