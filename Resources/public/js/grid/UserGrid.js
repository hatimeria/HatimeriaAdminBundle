Ext.define('HatimeriaAdmin.grid.UserGrid', 
        {   
            extend: 'Ext.grid.Panel',
            requires: ["HatimeriaAdmin.store.UserStore"],
            title: __('users'),
            width: '100%',
            columns: [
                {header: __('Id'), dataIndex: 'id'},
                {header: __('user.username'), dataIndex: 'username'}, 
                {header: __('Email'), dataIndex: 'email'}
            ]
        }
);