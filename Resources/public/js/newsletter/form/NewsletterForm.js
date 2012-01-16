(function() {
    
    Ext.define('HatimeriaAdmin.newsletter.form.NewsletterForm', {
        extend: 'Hatimeria.core.form.BaseForm',
        requires: [
            'HatimeriaAdmin.core.form.TinyMceForm'
        ],
        
        id: 'newsletter-form-edit',
        
        submitConfig: {
            text: 'Zapisz',
            submit: Actions.HatimeriaAdmin_Newsletter.edit,
            success: function() {
                Ext.getStore('newsletter-store').load();
                this.formPanel.up('window').destroy();
            }
        },
        
        initComponent: function() {
            
            var _this = this;
            var config = {
                id: 'newsletter-form-edit',
                border: false,
                frame: false,
                bodyPadding: 10,
                items: [
                    {
                        xtype: 'hidden',
                        name: 'id'
                    },
                    {
                        xtype: 'textfield',
                        fieldLabel: 'Temat',
                        name: 'subject',
                        labelWidth: 50,
                        width: 450
                    },
                    {
                        xtype: 'hatimeria-tinymce',
                        tinyConfigSet: 'basic',
                        fieldName: 'body',
                        labelWidth: 50,
                        width: 600,
                        tinyConfigSets: {
                            basic: {
                                plugins: 'advimage',
                                theme_advanced_buttons1 : "formatselect,fontsizeselect,bold,italic,underline,separator,strikethrough,justifyleft,justifycenter,justifyright,justifyfull,bullist,numlist,undo,redo,link,unlink,image,code",
                                theme_advanced_buttons2 : "",
                                theme_advanced_buttons3 : "",
                                theme_advanced_buttons4 : ""
                            }
                        },
                        listeners: {
                            tinycreated: function() {
                                if (_this.tmpRecord) {
                                    _this.getForm().loadRecord(_this.tmpRecord);
                                }
                            }
                        }
                    }

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
            this.tmpRecord = record;
        }
    });
})();