/**
 * TinyMCE Form
 * 
 * @class HatimeriaAdmin.core.form.TinyMceForm
 * @extends Ext.form.Panel
 */
(function() {
    
    Ext.define('HatimeriaAdmin.core.form.TinyMceForm', {
        extend: 'Ext.form.Panel',
        alias: 'widget.hatimeria-tinymce',
        
        /**
         * Config set
         * 
         * @cfg {String} tinyConfigSet
         */
        tinyConfigSet: 'extended',
        
        /**
         * @cfg {String} fieldLabel Treść
         */
        fieldLabel: 'Treść',
        
        /**
         * @cfg {String} fieldName
         */
        fieldName: 'description',

        /**
         * @cfg {Integer} labelWidth
         */
        labelWidth: 100,
        
        /**
         * Base config
         * 
         * @cfg {Object} tinyBaseConfig
         */
        tinyBaseConfig: {
            theme: 'advanced',
            theme_advanced_toolbar_location: 'top',
            theme_advanced_toolbar_align: 'left',
            theme_advanced_statusbar_location: 'bottom',
            file_browser_callback: 'tinymce_upload',
            theme_advanced_resizing: false,
            convert_urls: false
        },
        
        /**
         * Defauly config sets
         * 
         * @cfg {Object} tinyConfigSets
         */
        tinyConfigSets: {
            extended: {
                plugins: 'pagebreak,style,layer,table,advhr,advimage,advlink,emotions,insertdatetime,preview,media,searchreplace,print,contextmenu,paste,directionality,noneditable,visualchars,nonbreaking,xhtmlxtras,template',
                theme_advanced_buttons1: 'bold,italic,underline,strikethrough,|,justifyleft,justifycenter,justifyright,justifyfull,|,styleselect,formatselect,fontselect,fontsizeselect',
                theme_advanced_buttons2: 'bullist,numlist,|,outdent,indent,blockquote,|,undo,redo,|,link,unlink,anchor,image,cleanup,help,code,|,insertdate,inserttime,preview,|,forecolor,backcolor',
                theme_advanced_buttons3: 'tablecontrols,|,hr,sub,sup,|,charmap,media,advhr,|,print,|,ltr,rtl,|',
                theme_advanced_buttons4: 'insertlayer,moveforward,movebackward,absolute,|,styleprops,|,cite,abbr,acronym,del,ins,attribs,|,visualchars,nonbreaking,template,pagebreak'
            },
            basic: {
                plugins: 'advimage',
                theme_advanced_buttons1 : "formatselect,fontsizeselect,bold,italic,underline,separator,strikethrough,justifyleft,justifycenter,justifyright,justifyfull,bullist,numlist,undo,redo,link,unlink,image",
                theme_advanced_buttons2 : "",
                theme_advanced_buttons3 : ""
            }
        },
        
        /**
         * Initialization
         */
        initComponent: function()
        {
            var _this = this;
            var config = {
                height: 350,
                border: 0,
                layout: 'auto',
                items: [
                    {
                        itemId: 'tinymce',
                        xtype: 'tinymce',
                        fieldLabel: this.fieldLabel,
                        labelWidth: this.labelWidth,
                        width: 573,
                        height: 240,
                        name: this.fieldName,
                        tinymceSettings: this.getTinyConfig()
                    }
                ]
            };
            
            
            this.addEvents('tinycreated');
            
            Ext.apply(this, Ext.apply(config, this.initialConfig));
            this.callParent();
            
            this.on('render', function() {
                var tiny = this.getComponent('tinymce');
                tiny.on('editorcreated', function() {
                    Ext.defer(function() {
                        _this.fireEvent('tinycreated', _this, tiny);
                    }, 300);
                });
            });
        },
        
        /**
         * Config
         * 
         * @return {Object}
         */
        getTinyConfig: function()
        {
            var set;
            if (this.tinyConfigSets[this.tinyConfigSet])
            {
                set = this.tinyConfigSets[this.tinyConfigSet];
            }
            else
            {
                set = this.tinyConfigSets['basic'];
            }
            
            Ext.apply(set, this.tinyBaseConfig);
            
            return set;
        }
    });
    
})();