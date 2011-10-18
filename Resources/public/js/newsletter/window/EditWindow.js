Ext.onReady(function(){
    Ext.define('HatimeriaAdmin.newsletter.window.EditWindow', {
        extend: 'Ext.window.Window',
        
        initComponent: function()
        {
            var config = {
                title: 'Dodawanie/Edycja newslettera',
                items: [ Ext.create('HatimeriaAdmin.newsletter.form.EditForm') ]
            };

            Ext.apply(this, Ext.apply(config, this.initialConfig));
            
            this.callParent();
        }
    });
});