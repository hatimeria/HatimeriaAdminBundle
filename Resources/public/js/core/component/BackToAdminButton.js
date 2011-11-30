Ext.define('HatimeriaAdmin.core.component.BackToAdminButton', {
    extend: 'Ext.Button',
    mixins: {
        translationable: 'Hatimeria.core.mixins.Translationable'
    },
    transDomain: 'HatimeriaAdminBundle',
    
    initComponent: function() {
        this.text = this.__('switch.back');
        this.callParent();
    },
    
    handler: function() {
        document.location = Routing.generate('homepage') + '?_switch_user=_exit';
    }
})