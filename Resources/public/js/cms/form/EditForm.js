(function() {
    
	/* 
	 * Using TineMCE Ext 4 Adaption found on:
	 * http://www.sencha.com/forum/showthread.php?143190-Ext.ux.TinyMCE-adaption-for-Ext4&p=635192
	 */
	
    Ext.define('HatimeriaAdmin.cms.form.EditForm', {
        extend: 'Ext.form.Panel',
        
        tmpRecord: undefined,
        
        constructor: function(cfg)
        {
            var config = {
                api: {
                   submit: Actions.HatimeriaAdmin_Cms.edit
                }
            };
            Ext.apply(config, cfg || {});
            
            this.callParent([config]);
        },
        
        initComponent: function()
        {
            var _this = this;
            var config = {
                border: false,
                width: 700,
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
                                        Ext.getStore('cms-store').load();
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
                    fieldLabel: 'Tytuł',
                    name: 'title'
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
                    xtype: 'form',
                    id: 'tiny-container',
                    height: 350,
                    border: 0,
                    layout: 'auto',
                    items: [
                        {
                            itemId: 'tinymce',
                            xtype: 'tinymce',
                            fieldLabel: 'Treść',
                            width: 573,
                            height: 240,
                            name: 'body',
                            tinymceSettings: {
                                theme: 'advanced',
                                plugins: 'pagebreak,style,layer,table,advhr,advimage,advlink,emotions,insertdatetime,preview,media,searchreplace,print,contextmenu,paste,directionality,noneditable,visualchars,nonbreaking,xhtmlxtras,template',
                                theme_advanced_buttons1: 'bold,italic,underline,strikethrough,|,justifyleft,justifycenter,justifyright,justifyfull,|,styleselect,formatselect,fontselect,fontsizeselect',
                                theme_advanced_buttons2: 'bullist,numlist,|,outdent,indent,blockquote,|,undo,redo,|,link,unlink,anchor,image,cleanup,help,code,|,insertdate,inserttime,preview,|,forecolor,backcolor',
                                theme_advanced_buttons3: 'tablecontrols,|,hr,sub,sup,|,charmap,media,advhr,|,print,|,ltr,rtl,|',
                                theme_advanced_buttons4: 'insertlayer,moveforward,movebackward,absolute,|,styleprops,|,cite,abbr,acronym,del,ins,attribs,|,visualchars,nonbreaking,template,pagebreak',
                                theme_advanced_toolbar_location: 'top',
                                theme_advanced_toolbar_align: 'left',
                                theme_advanced_statusbar_location: 'bottom',
                                file_browser_callback: 'tinymce_upload',
                                theme_advanced_resizing: false,
                                extended_valid_elements: 'a[name|href|target|title|onclick],img[class|src|border|alt|title|hspace|vspace|width|height|align|onmouseover|onmouseout|name],hr[class|width|size|noshade],font[face|size|color|style],span[class|align|style]'
                            }
                        }
                    ]
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
            this.on('render', function() {
                this.getComponent('tiny-container').getComponent('tinymce').on('editorcreated', function() {
                    Ext.defer(function() {
                        _this.getForm().loadRecord(_this.tmpRecord);
                    }, 300, this);
                });
            });
            
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