(function() {
    Ext.define('HatimeriaAdmin.cms.form.CmsForm', {
        extend: 'Hatimeria.core.form.BaseForm',
        requires: [
            'HatimeriaAdmin.core.form.TinyMceForm'
        ],
        
        submitConfig: {
            text: 'Zapisz',
            submit: Actions.HatimeriaAdmin_Cms.edit,
            success: function() {
                Ext.getStore('cms-store').load();
                this.formPanel.up('window').destroy();
            }
        },
        
        initComponent: function()
        {
            var _this = this;
            var config = {
                border: false,
                width: 700,
                bodyPadding: 10,
                defaultType: 'textfield',
                defaults: {
                    anchor: '100%'
                },
                items: [{
                    fieldLabel: 'Tytuł',
                    name: 'title'
                },
                {
                    xtype: 'hidden',
                    name: 'id'
                },
                {
                    fieldLabel: 'Uri',
                    name: 'path'
                },
                {
                    fieldLabel: 'Autor',
                    name: 'author'
                },
                {
                    fieldLabel: 'Meta description',
                    name: 'meta_description'
                },
                {
                    fieldLabel: 'Meta keywords',
                    name: 'meta_keywords'
                },
                {
                    xtype: 'hatimeria-tinymce',
                    fieldName: 'body',
                    width: 600,
                    height: 250,
                    listeners: {
                        tinycreated: function() {
                            if (_this.tmpRecord) {
                                _this.getForm().loadRecord(_this.tmpRecord);
                            }
                        }
                    }
                },
                {
                    fieldLabel: 'Od kiedy publikowac',
                    name: 'publish_from',
                    xtype: 'datefield'
                },
                {
                    fieldLabel: 'Do kiedy publikowac',
                    name: 'publish_to',
                    xtype: 'datefield'
                },
                {
                    fieldLabel: 'Opublikowany',
                    name: 'is_published',
                    xtype: 'checkboxfield'
                }]
            };
            
            Ext.apply(this, Ext.apply(config, this.initialConfig));
            
            this.callParent();
        },
        
        /**
         * Populating
         */
        populate: function(record)
        {
            this.tmpRecord = record;
        }
    });
})();