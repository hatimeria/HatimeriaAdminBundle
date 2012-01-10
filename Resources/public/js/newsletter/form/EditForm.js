(function() {
    
    Ext.define('HatimeriaAdmin.newsletter.form.EditForm', {
        extend: 'Ext.form.Panel',
        id: 'newsletter-form-edit',
        
        constructor: function(cfg)
        {
            var config = {
                api: {
                   submit: Actions.HatimeriaAdmin_Newsletter.edit
                }
            };
            Ext.apply(config, cfg || {});
            
            this.callParent([config]);
        },
        
        initComponent: function() {
            
            var config = {
                id: 'newsletter-form-edit',
                border: false,
                frame: false,
                bodyPadding: 10,
                items: [
                    {
                        xtype: 'textfield',
                        fieldLabel: 'Temat',
                        name: 'subject',
                        labelWidth: 50,
                        width: 450
                    },
                    {
                        xtype: 'form',
                        id: 'tiny-container',
                        height: 250,
                        border: 0,
                        layout: 'auto',
                        items: [
                            {
                                id: 'tinymce',
                                xtype: 'tinymce',
                                fieldLabel: 'Treść',
                                labelWidth: 50,
                                width: 400,
                                height: 200,
                                name: 'body',
                                tinymceSettings: {
                                    theme: 'advanced',
                                    plugins: 'advimage',
                                    theme_advanced_buttons1 : "formatselect,fontsizeselect,bold,italic,underline,separator,strikethrough,justifyleft,justifycenter,justifyright,justifyfull,bullist,numlist,undo,redo,link,unlink,image",
                                    theme_advanced_buttons2 : "",
                                    theme_advanced_buttons3 : "",
                                    theme_advanced_toolbar_location : "top",
                                    theme_advanced_toolbar_align : "left",
                                    theme_advanced_statusbar_location : "bottom",
                                    convert_urls: false,
                                    file_browser_callback: 'tinymce_upload'
                                }
                            }
                        ]
                    }
                ],
                buttons: [
                    {
                        text: 'Zapisz',
                        scope: this,
                        handler: function(){
                            var panel  = this;
                            var form   = panel.getForm();
                            var record = form.getRecord();
                            var params = {};

                            if(record) {
                                params = {
                                    id: record.get('id')
                                };
                            }

                            form.submit({
                                params: params,
                                success: function() {
                                    Ext.getStore('newsletter-store').load();
                                    panel.findParentByType('window').destroy();
                                }
                            });
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
            var _this = this;
            window.setTimeout(function() {
                _this.getForm().loadRecord(record);
            }, 500);
        }
    });
})();