(function() {
    Ext.define('HatimeriaAdmin.cms.form.CmsForm', {
        extend: 'Hatimeria.core.form.BaseForm',
        requires: [
            'HatimeriaAdmin.core.form.TinyMceForm'
        ],
        transNS: 'cms.headers',
        submitConfig: {
            submit: Actions.HatimeriaAdmin_Cms.edit,
            success: function() {
                Ext.getStore('cms-store').load();
                this.formPanel.up('window').destroy();
            }
        },
        
        constructor: function(cfg)
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
                    fieldLabel: this.__('title'),
                    name: 'title'
                },
                {
                    xtype: 'hidden',
                    name: 'id'
                },
                {
                    fieldLabel: this.__('uri'),
                    name: 'path'
                },
                {
                    fieldLabel: this.__('author'),
                    name: 'author'
                },
                {
                    fieldLabel: this.__('meta_description'),
                    name: 'meta_description'
                },
                {
                    fieldLabel: this.__('meta_keywords'),
                    name: 'meta_keywords'
                },
                {
                    xtype: 'hatimeria-tinymce',
                    fieldLabel: this.__('body'),
                    fieldName: 'body',
                    width: 680,
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
                    fieldLabel: this.__('publish_from'),
                    name: 'publish_from',
                    xtype: 'datefield',
                    format: 'Y-m-d'
                },
                {
                    fieldLabel: this.__('publish_to'),
                    name: 'publish_to',
                    xtype: 'datefield',
                    format: 'Y-m-d'
                },
                {
                    fieldLabel: this.__('is_published'),
                    name: 'is_published',
                    xtype: 'checkboxfield'
                }]
            };
            
            Ext.apply(config, cfg || {});
            
            this.callParent([config]);
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