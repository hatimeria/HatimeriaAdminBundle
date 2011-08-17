Ext.onReady(function() {
    var usersGrid = Ext.create('Hatimeria.grid.Preview', 
            {
                directFn: Actions.HatimeriaAdmin_User.list,
                title: 'Users',
                headers: {'id': '', 'username': 'Username', 'email': 'Email'}
            }
        );
            
    usersGrid.init()
});