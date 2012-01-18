(function() {
    
    Ext.define('HatimeriaAdmin.cms.window.CmsWindow', {
        extend: 'Hatimeria.core.window.BaseWindow',
        requires: [
            'HatimeriaAdmin.cms.form.CmsForm'
        ],
        
        initComponent: function()
        {
            var config = {
                title: this.__('cms.edit.title'),
                items: [ 
                    Ext.create('HatimeriaAdmin.cms.form.CmsForm', {
                        id: 'cms-form-edit'
                    })
                ]
            };

            Ext.apply(this, Ext.apply(config, this.initialConfig));
            
            this.callParent();
        },
        
        /**
         * Populates form
         * 
         * @param Ext.data.Model record
         */
        populate: function(record)
        {
            this.getComponent('cms-form-edit').populate(record);
        }
    });
    
})();