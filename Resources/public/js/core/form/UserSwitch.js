Ext.define('HatimeriaAdmin.core.form.UserSwitch', {
    extend: 'Ext.form.ComboBox',
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
});