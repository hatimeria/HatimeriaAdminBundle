(function() {
    
    Ext.require('HatimeriaAdmin.newsletter.form.EditForm');
    
    Ext.define('HatimeriaAdmin.newsletter.window.EditWindow', {
        extend: 'Ext.window.Window',
        
        initComponent: function()
        {
            var config = {
                width: 580,
                title: 'Dodawanie/Edycja newslettera',
                items: [ 
                    Ext.create('HatimeriaAdmin.newsletter.form.EditForm')
                ]
            };

            Ext.apply(this, Ext.apply(config, this.initialConfig));
            this.callParent();
        },
        
        /**
         * Populates form with a record
         * 
         * @param Ext.data.Model record
         */
        populate: function(record)
        {
            this.getComponent('newsletter-form-edit').populate(record);
        }
    });
    
})();