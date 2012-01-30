/**
 * TinyMCE Form
 * 
 * @class HatimeriaAdmin.core.form.TinyMceForm
 * @extends Ext.form.Panel
 */
(function() {
    
    Ext.define('HatimeriaAdmin.core.form.TinyMceForm', {
        extend: 'Hatimeria.core.form.BaseForm',
        alias: 'widget.hatimeria-tinymce',
        
        /**
         * Config set
         * 
         * @cfg {String} tinyConfigSet
         */
        tinyConfigSet: 'extended',
        
        /**
         * Initial value for field
         * 
         * @cfg {String} value
         */
        value: null,
        
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
        height: 350,
        
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
         * @cfg {Integer} labelWidth
         */
        labelAlign: 'left',
        
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
            language: 'pl',
            theme_advanced_toolbar_location: 'top',
            theme_advanced_toolbar_align: 'left',
            theme_advanced_statusbar_location: 'bottom',
            file_browser_callback: 'tinymce_upload',
            theme_advanced_resizing: false,
            convert_urls: false,
            theme_advanced_font_sizes: 'x-small=0.8em,small=0.9em,NORMAL=1em,large=1.1em,x-large=1.2em,xx-large=1.4em',
            theme_advanced_blockformats: 'p,h2,h3,h4'
        },
        
        /**
         * Defauly config sets
         * 
         * @cfg {Object} tinyConfigSets
         */
        tinyConfigSets: {
            extended: {
                plugins: 'style,layer,table,advhr,advimage,advlink,emotions,preview,searchreplace,print,contextmenu,paste,directionality,noneditable,visualchars,nonbreaking,xhtmlxtras,template',
                theme_advanced_buttons1: 'bold,italic,underline,strikethrough,|,justifyleft,justifycenter,justifyright,justifyfull,|,formatselect,fontsizeselect',
                theme_advanced_buttons2: 'bullist,numlist,|,outdent,indent,blockquote,|,undo,redo,|,link,unlink,anchor,image,cleanup,help,code,|,preview,|,forecolor,backcolor',
                theme_advanced_buttons3: 'tablecontrols,|,hr,sub,sup,|,charmap,advhr,ltr,rtl',
                theme_advanced_buttons4: ''
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
                var panel = Ext.create("Hatimeria.core.form.BaseForm", {
                    renderTo: Ext.getBody(),
                    dockedItems: [{
                       dock: 'bottom',
                       xtype: 'toolbar',
                       items: [
                           {
                                text: 'Submit',
                                handler: function() {
                                    console.log(panel.getForm().isValid());
                                }
                           }
                       ]
                    }],
                    items: [
                        Ext.create("HatimeriaAdmin.core.form.TinyMceForm", {
                            maxLength: 2,
                            tinyConfigSet: 'basic',
                            value: 'ala123'
                        }),
                        {
                            xtype: 'numberfield',
                            fieldLabel: 'Numer',
                            name: 'test',
                            allowBlank: false
                        }                        
                    ],
                    height: 1000,
                    width: 800
                });
                
                panel.getForm().isValid();
            }
        },
        
        /**
         * Initialization
         */
        initComponent: function()
        {
            var _this = this;
            this.tinyBaseConfig.height = this.computeHeight();
            var config = {
                border: 0,
                layout: 'auto',
                items: [
                    {
                        itemId: 'tinymce',
                        xtype: 'tinymce',
                        width: ((this.fieldLabel && this.fieldLabel != '') ? (this.width - this.labelWidth - this.marginOffset) : this.width),
                        height: _this.height,
                        fieldLabel: this.fieldLabel,
                        labelWidth: this.labelWidth,
                        labelAlign: this.labelAlign,
                        name: this.fieldName,
                        tinymceSettings: this.getTinyConfig(),
                        allowBlank: this.allowBlank,
                        listeners: {
                            change: function() {
                                _this.fireEvent('tinychange', _this, _this.getEditor())
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
                        _this.on('tinychange', function() {
                            _this.countChars();
                        });
                    }, 300);
                });
            });
            
            // set initial value after tiny is rendered
            if(this.value) {
                this.on('tinycreated', function(panel, field) {
                    field.setValue(_this.value);
                });
            }
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
            return this.height - 40;
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