(function() {

    Ext.define('HatimeriaAdmin.core.form.UserSwitch', {
        extend: 'Ext.form.ComboBox',

        initComponent: function()
        {
            var config = {
                fieldLabel: __("switch.action"),
                queryMode: 'remote',
                displayField: 'username',
                valueField: 'username',
                listeners: {
                    scope: this,
                    select: function(field, record) {
                        location.href = Routing.generate('homepage') + '?_switch_user=' + record[0].get('username');
                    }
                }        
            };

            Ext.apply(this, Ext.apply(config, this.initialConfig));
            this.callParent();
        }
    });
    
})();
