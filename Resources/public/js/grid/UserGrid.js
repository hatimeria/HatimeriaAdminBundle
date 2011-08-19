Ext.define('HatimeriaAdmin.grid.UserGrid', 
        {
            extend: 'HatimeriaCore.grid.Preview',
            config: {
                directFn: Actions.HatimeriaAdmin_User.list,
                title: 'Users',
                headers: {'id': '', 'username': 'Username', 'email': 'Email'}
            }
        }
);