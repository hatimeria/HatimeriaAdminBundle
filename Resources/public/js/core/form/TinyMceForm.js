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
         * @cfg {Number} tinyWidth
         */
        width: 500,
        
        /**
         * @cfg {Number} tinyHeight
         */
        height: 300,

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
                theme_advanced_buttons3 : "",
                theme_advanced_buttons4 : ""
            }
        },
        
        statics: {
            testMe: function() {
                var me = Ext.create(this.prototype.$className);
                var w = Ext.create("Ext.window.Window", {
                    items: [{
                       xtype: 'form',
                       items: [
                           me, {xtype: 'textfield', fieldLabel: 'test'}
                       ]
                    }],
                    renderTo: Ext.getBody()
                });
                
                w.show();
            }
        },
        
        /**
         * Initialization
         */
        initComponent: function()
        {
            var _this = this;
            var config = {
                border: 0,
                layout: 'auto',
                items: [
                    {
                        itemId: 'tinymce',
                        xtype: 'tinymce',
                        width: this.width,
                        height: this.computeHeight(),
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
        },
        
        /**
         * Get dynamic height of tiny
         */
        computeHeight: function()
        {
            var toolHeight = 28;
            var sumHeight = 0;
            var settings = this.getTinyConfig();
            
            for (var i=1; i<=4; i++)
            {
                if (settings['theme_advanced_buttons' + i] != "")
                {
                    sumHeight =+ toolHeight;
                }
            }
            
            return this.height - sumHeight;
        }
    });
    
})();