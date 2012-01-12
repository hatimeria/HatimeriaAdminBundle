(function() {
    
    Ext.require('HatimeriaAdmin.newsletter.form.NewsletterForm');
    
    Ext.define('HatimeriaAdmin.newsletter.window.NewsletterWindow', {
        extend: 'Ext.window.Window',
        
        initComponent: function()
        {
            var config = {
                width: 660,
                title: 'Dodawanie/Edycja newslettera',
                items: [ 
                    Ext.create('HatimeriaAdmin.newsletter.form.NewsletterForm')
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