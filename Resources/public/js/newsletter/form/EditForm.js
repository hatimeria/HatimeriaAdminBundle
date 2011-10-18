(function() {
    
    Ext.define('HatimeriaAdmin.newsletter.form.EditForm', {
        extend: 'Ext.form.Panel',
        id: 'newsletter-form-edit',
        
        initComponent: function() {
            
            var config = {
                id: 'newsletter-form-edit',
                api: {
                   submit: Actions.SferaAdmin_Newsletter.edit
                },                
                border: false,
                bodyPadding: 10,    
                dockedItems: [{
                    dock: 'bottom',
                    xtype: 'toolbar',
                    ui: 'footer',
                    style: 'margin: 0 5px 5px 0;',
                    items: ['->', {
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
                }],
                defaultType: 'textfield',
                defaults: {
                    anchor: '100%'
                },
                items: [{
                    fieldLabel: 'Treść',
                    name: 'body',
                    xtype: 'htmleditor'
                },
                {
                    fieldLabel: 'Temat',
                    name: 'subject',
                    xtype: 'textfield'
                }
                ]
            }
            
            Ext.apply(this, Ext.apply(config, this.initialConfig));
            
            this.callParent();
        }
    });
})();