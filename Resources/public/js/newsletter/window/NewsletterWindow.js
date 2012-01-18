(function() {
    
    Ext.require('HatimeriaAdmin.newsletter.form.NewsletterForm');
    
    Ext.define('HatimeriaAdmin.newsletter.window.NewsletterWindow', {
        extend: 'Hatimeria.core.window.BaseWindow',
        
        initComponent: function()
        {
            var config = {
                width: 660,
                title: this.__('newsletter.edit.title'),
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