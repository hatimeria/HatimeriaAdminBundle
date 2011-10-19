(function() {
    
    Ext.define('HatimeriaAdmin.newsletter.form.EditForm', {
        extend: 'Ext.form.Panel',
        id: 'newsletter-form-edit',
        
        initComponent: function() {
            
            var config = {
                id: 'newsletter-form-edit',
                api: {
                   submit: Actions.HatimeriaAdmin_Newsletter.edit
                },                
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
                                    theme_advanced_buttons1 : "fontselect,fontsizeselect,bold,italic,underline,separator,strikethrough,justifyleft,justifycenter,justifyright,justifyfull,bullist,numlist,undo,redo,link,unlink",
                                    theme_advanced_buttons2 : "",
                                    theme_advanced_buttons3 : "",
                                    theme_advanced_toolbar_location : "top",
                                    theme_advanced_toolbar_align : "left",
                                    theme_advanced_statusbar_location : "bottom",
                                    extended_valid_elements: 'a[name|href|target|title|onclick],img[class|src|border=0|alt|title|hspace|vspace|width|height|align|onmouseover|onmouseout|name],hr[class|width|size|noshade],font[face|size|color|style],span[class|align|style]'
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
        }
    });
})();