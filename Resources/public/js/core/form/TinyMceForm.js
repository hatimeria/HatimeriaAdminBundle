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
         * Margin corrects width of tinyMCE
         * 
         * @cfg {Number} marginOffset
         */
        marginOffset: 5,

        /**
         * @cfg {Integer} labelWidth
         */
        labelWidth: 100,
        
        /**
         * Default height of one line of toolbar
         * @cfg {Number} toolbarHeight
         */
        toolbarHeight: 28,
        
        /**
         * Max text plain length
         * @cfg {Number} maxLength
         */
        maxLength: false,
        
        /**
         * Allow field blank before submit
         * 
         * @cfg {Boolean} allowBlank
         */
        allowBlank: true,
        
        /**
         * Instance of embeded editor (appears after editor created)
         * @property {TinyMCE.Editor} editor
         * @private
         */
        editor: undefined,
        
        /**
         * Length of plain content
         * @property {Number} numChars
         * @private
         */
        numChars: 0,
        
        /**
         * Id of element
         * @property {String}
         * @private
         */
        elId: undefined,
        
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
                theme_advanced_buttons1: 'bold,italic,underline,strikethrough,|,justifyleft,justifycenter,justifyright,justifyfull,|,formatselect,fontsizeselect',
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
                        width: ((this.fieldLabel && this.fieldLabel != '') ? (this.width - this.labelWidth - this.marginOffset) : this.width),
                        fieldLabel: this.fieldLabel,
                        msgTarget: _this.id + '-errors',
                        labelWidth: this.labelWidth,
                        height: this.computeHeight(),
                        name: this.fieldName,
                        tinymceSettings: this.getTinyConfig(),
                        allowBlank: this.allowBlank,
                        listeners: {
                            change: function() {
                                _this.fireEvent('tinychange', _this, _this.getEditor())
                            },
                            afterrender: function() {
                                this.errorEl = this.labelEl.createChild({
                                    tag: 'div',
                                    cls: 'ux-errors x-form-error-msg',
                                    id: _this.id + '-errors'
                                });
                                console.log(this.errorEl)
                            }
                        },
                        validator: function() {
                            if (_this.maxLength && _this.getNumChars() > _this.maxLength)
                            {
                                return "Opis jest zbyt długi!";
                            }
                            
                            return true;
                        }
                    }
                ]
            };
            
            this.addEvents(
                /**
                 * @event tinycreated
                 */
                'tinycreated', 
                
                /**
                 * @event tinychange
                 */
                'tinychange', 
                
                /**
                 * @event tinykeydown
                 */
                'tinykeydown'
            );
            
            Ext.apply(this, Ext.apply(config, this.initialConfig));
            this.callParent();
            
            this.on('afterrender', function() {
                var tiny = this.getComponent('tinymce');
                tiny.on('editorcreated', function() {
                    Ext.defer(function() {
                        _this.initEditor()
                        _this.fireEvent('tinycreated', _this, tiny);
                    }, 300);
                });
            });
        },
        
        /**
         * Initializes editor
         * 
         * @private
         */
        initEditor: function()
        {
            var editor = this.items.get(0).ed;
            var _this = this;
            
            editor.onKeyDown.add(function(ed, e) {
                _this.countChars();
                _this.fireEvent('tinykeydown', _this, ed);
            });
            
            this.editor = editor;
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
            var height = this.height;
            var settings = this.getTinyConfig();
            var toolbar;
            
            for (var i=1; i<=4; i++)
            {
                toolbar = settings['theme_advanced_buttons' + i];
                if (typeof toolbar != "undefined" && toolbar != "")
                {
                    height -= this.toolbarHeight;
                }
            }
            
            return height;
        },
        
        /**
         * Return embeded editor
         * 
         * @return TinyMCE.Editor
         */
        getEditor: function()
        {
            return this.editor;
        },
        
        /**
         * Element of main id container
         * 
         * @return {String}
         */
        getElId: function()
        {
            return this.elId;
        },
        
        /**
         * HTML content
         * 
         * @return {String}
         */
        getTinyContent: function()
        {
            return this.getEditor().getContent();
        },
        
        /**
         * Plaint text content
         * 
         * @return {String}
         */
        getTinyPlainContent: function()
        {
            var content = this.getTinyContent();
            
            return content.replace(/(<([^>]+)>)/ig, "").replace(/&[a-z0-9]+;/ig, " ");
        },
        
        /**
         * Counts chars
         * 
         * @private
         */
        countChars: function()
        {
            this.numChars = this.getTinyPlainContent().length;
        },
        
        /**
         * Number of chars
         * 
         * @return {Number}
         */
        getNumChars: function()
        {
            return this.numChars;
        }
    });
    
})();