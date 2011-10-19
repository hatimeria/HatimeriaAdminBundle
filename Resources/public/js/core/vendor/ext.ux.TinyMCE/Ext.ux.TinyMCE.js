/** ************************************************************
    Ext.ux.TinyMCE v0.8.5
    ExtJS form field containing TinyMCE v3.
    
    Author: Andrew Mayorov et al.
    http://blogs.byte-force.com/xor
    
    Copyright (c)2008-2010 BYTE-force
    www.byte-force.com
    
    License: LGPLv2.1 or later
*/

// ***** Adaption for Ext4 *****

(function() {

    var tmceInitialized = false;

    // Lazy references to classes. To be filled in the initTinyMCE method.
    var WindowManager,
        ControlManager;

    // Create a new Windows Group for the dialogs
    /*var windowGroup = new Ext.WindowGroup();
    windowGroup.zseed = 12000;*/


    /** 
     * @class Ext.ux.TinyMCE
     * @extends Ext.form.field.Text
     * 
     * #Validation#
     * Has the same validations as its parent class, {@link Ext.form.field.Text}.
    */
    Ext.define('Ext.ux.TinyMCE', {
        extend: 'Ext.form.field.Text',
        alias: 'widget.tinymce',

        // TinyMCE Settings specified for this instance of the editor.
        tinymceSettings: null,

        // Validation properties such as allowBlank Are all defined in super classes or Mixins

        // HTML markup for this field
        // The inner div will get an ID by  {link #onRender} and will be hidden by tinyMCE rendering initialization.
        // Ext4 Open question: should the markaup contain a hidden textarea as in Ext.form.field.HtmlEditor?
        fieldSubTpl: [
          '<div id="{id}" ',
          '<tpl if="name">name="{name}" </tpl>',
          '<tpl if="size">size="{size}" </tpl>',
          'class="{fieldCls}">',
          '<div></div>',
          '</div>',
          {
              compiled: true,
              disableFormats: true
          }
        ],



        /** ----------------------------------------------------------
        */
        constructor: function(cfg) {

            var config = {
                tinymceSettings: {
                    accessibility_focus: false
                }
            };

            Ext.apply(config, cfg);

            // Add events
            this.addEvents({
                "editorcreated": true
            });

            this.callParent([config]); //Ext4
        },

        /** ----------------------------------------------------------
        */
        initComponent: function() {
            this.callParent(); // Ext4: added
            this.tinymceSettings = this.tinymceSettings || {};
            Ext.ux.TinyMCE.initTinyMCE({ language: this.tinymceSettings.language });
        },

        /* ----------------------------------------------------------
         * Ext4 Open question: Is this necessary? originalValue will be set by form.Field.initValue
        * /
        initEvents: function() {
            this.originalValue = this.getValue();
        },*/

        /** ----------------------------------------------------------
         * Ext4: Rendering from Ext3 version removed, because the <div> wrapper is
         * already provided by fieldSubTpl
        */
        onRender: function(ct, position) {
            this.callParent(arguments); // Ext4: added (makes this.inputEl available)

            // Fix size if it was specified in config
            if (Ext.type(this.width) == "number") {
                this.tinymceSettings.width = this.width;
            }
            if (Ext.type(this.height) == "number") {
                this.tinymceSettings.height = this.height;
            }

            
            var divForTinyEl = this.inputEl.first(),
                id = Ext.id(divForTinyEl);
            // Create TinyMCE editor within inputEl > div
            this.ed = new tinymce.Editor(id, this.tinymceSettings);
            
            // Validate value onKeyPress
            var validateContentTask = new Ext.util.DelayedTask( this.validate, this );
            
            this.ed.onKeyPress.add(Ext.bind(function(ed, controlManager) {
                validateContentTask.delay( 250 );
            }, this));

            // Set up editor events' handlers
            this.ed.onBeforeRenderUI.add(Ext.bind(function(ed, controlManager) {
                // Replace control manager
                ed.controlManager = new ControlManager(this, ed);
            }, this));

            this.ed.onPostRender.add(Ext.bind(function(ed, controlManager) {
                var s = ed.settings,

                // Modify markup
                    tbar = Ext.get(Ext.DomQuery.selectNode("#" + this.ed.id + "_tbl td.mceToolbar"));
                if( tbar != null ) {
                    // If toolbar is present
                    var tbars = tbar.select("> table.mceToolbar");
                    Ext.core.DomHelper
                        .append( tbar,
                            { tag: "div", id: this.ed.id + "_xtbar", style: { overflow: "hidden"} }
                            , true )
                        .appendChild(tbars);
                }
                
                // Change window manager
                ed.windowManager = new WindowManager({
                    editor: this.ed,
                    manager: this.manager
                });
                // Patch css-style for validation body like ExtJS
                Ext.get(ed.getContentAreaContainer()).addCls('patch-content-body'); // Ext4 code

                // Event of focused body
                Ext.Element.fly(s.content_editable ? ed.getBody() : ed.getWin())
                    .on("focus", this.onFocus, this);

                // Event of blur body
                Ext.Element.fly(s.content_editable ? ed.getBody() : ed.getWin())
                    .on("blur", this.onBlur, this,
                        this.inEditor && Ext.isWindows && Ext.isGecko ? { buffer: 10} : null
                    );

            }, this));

            // Set event handler on editor init.
            //this.ed.onInit.add(Ext.bind(function() {
            //}, this));

            // Wire "change" event
            this.ed.onChange.add(Ext.bind(function(ed, l) {
                this.fireEvent("change", ed, l);
            }, this));

            // Render the editor
            this.ed.render();
            tinyMCE.add(this.ed);
            
            // Fix editor size when control will be visible
            // Ext4: Somehow the variable size does not contain the right value if this function is called
            // directly during rendering. Therefore delayed with Ext.defer
            Ext.defer(
            (function fixEditorSize() {
            
                // If element is not visible yet, wait.
                if( !this.isVisible() ) {
                    arguments.callee.defer( 50, this );
                    return;
                }
                
                var size = this.getSize();
                this.withEd( function() {
                    this._setEditorSize( size.width, size.height );
                    
                    // Indicate that editor is created
                    this.fireEvent("editorcreated");
                });
            }), 50, this);
            
        }, // end onRender

        /** ----------------------------------------------------------
         * Ext4: There is no wrapEl anymore, we can directly return
         * inputEl, which is the <div> from fieldSubTpl
        */
        getResizeEl: function() {
            return this.inputEl;
        },

        
        /** ----------------------------------------------------------
        */
        initValue: function() {

            if (!this.rendered)
                this.callParent();
            else {
                if (this.value !== undefined) {
                    this.setValue(this.value);
                }
                else {
                    // Ext4: Don't know how to handle this, there is no hidden textarea like in Ext3 implementation
                    throw "Ext.ux.TinyMCE.initValue: No initial value available";
                    /* This is the code from Ext3 implementation
                    var v = this.textareaEl.value; 
                    if ( v )
                        this.setValue( v );*/
                }
            }
        },

        /** ----------------------------------------------------------
        */
        beforeDestroy: function() {
            if( this.ed ) tinyMCE.remove( this.ed );
            if( this.inputEl ) Ext.destroy( this.inputEl ); //Ext4
            this.callParent(); // Ext4
        },

        /** ----------------------------------------------------------
         * Returns content if Tiny Editor.
         * In Ext4, it's not necessary to implement getValue in case of 
         * string based content.
         * @return {String} The TinyMCE content, including HTML tags
        */
        getRawValue : function(){

            if( !this.rendered || !this.ed.initialized )
                return Ext.value( this.value, '' );
                
            var v = this.ed.getContent();
            if(v === this.emptyText){
                v = '';
            }
            return v;
        },
        
        /** ----------------------------------------------------------
         * In Ext4, it's not necessary to implement setValue in case of 
         * string based content.
        */
        setRawValue: function(v) {
            this.value = v;
            if (this.rendered)
                this.withEd(function() {
                    this.ed.undoManager.clear();
                    this.ed.setContent(v === null || v === undefined ? '' : v);
                    this.ed.startContent = this.ed.getContent({ format: 'raw' });
                });
        },
        
        /**
         * Since {@link #processRawValue} strips HTML tags from the Tiny text.
         * this method is overwritten so that text with HTML tags will be submitted.
         * @return {String} The value to be submitted, including HTML tags
         */
        getSubmitValue: function() {
            return this.getRawValue();
        },

        /** ----------------------------------------------------------
        */
        isDirty: function() {
            if (this.disabled || !this.rendered) {
                return false;
            }
            return this.ed && this.ed.initialized && this.ed.isDirty();
        },

        /** ----------------------------------------------------------
        */
        syncValue: function() {
            if (this.rendered && this.ed.initialized)
                this.ed.save();
        },

        /** ----------------------------------------------------------
        */
        getEd: function() {
            return this.ed;
        },

        /** ----------------------------------------------------------
        */
        disable: function() {
            this.withEd(function() {
                var bodyEl = this.ed.getBody();
                bodyEl = Ext.get(bodyEl);

                if (bodyEl.hasCls('mceContentBody')) {
                    bodyEl.removeCls('mceContentBody');
                    bodyEl.addCls('mceNonEditable');
                }
            });
        },

        /** ----------------------------------------------------------
        */
        enable: function() {
            this.withEd(function() {
                var bodyEl = this.ed.getBody();
                bodyEl = Ext.get(bodyEl);

                if (bodyEl.hasCls('mceNonEditable')) {
                    bodyEl.removeCls('mceNonEditable');
                    bodyEl.addCls('mceContentBody');
                }
            });
        },

        /** ----------------------------------------------------------
        */
        onResize: function(aw, ah) {
            if( Ext.type( aw ) != "number" ){
                aw = this.getWidth();
            }
            if( Ext.type(ah) != "number" ){
                ah = this.getHeight();
            }
            if (aw == 0 || ah == 0)
                return;

            if( this.rendered && this.isVisible() ) {
                this.withEd(function() { this._setEditorSize( aw, ah ); });
            }
        },
        
        /** ----------------------------------------------------------
            Sets control size to the given width and height
        */
        _setEditorSize: function( width, height ) {
        
            // We currently support only advanced theme resize
            if( !this.ed.theme.AdvancedTheme ) return;
        
            // Minimal width and height for advanced theme
            if( width < 100 ) width = 100;
            if( height < 129 ) height = 129;
            
            // Set toolbar div width
            var edTable = Ext.get(this.ed.id + "_tbl"), 
                edIframe = Ext.get(this.ed.id + "_ifr"),
                edToolbar = Ext.get(this.ed.id + "_xtbar"),
                toolbarWidth = width,
                toolbarHeight = 0;

            if( edTable ) 
                toolbarWidth = width - edTable.getFrameWidth( "lr" );        
            
            if( edToolbar ) {
                toolbarHeight = edToolbar.getHeight();
                var toolbarTd = edToolbar.findParent( "td", 5, true );
                toolbarHeight += toolbarTd.getFrameWidth( "tb" );
                edToolbar.setWidth( toolbarWidth );
            }
            
            /*
             * Ext4: toolbar is a child of <tbody> which is a child of edTable
             *var edStatusbarTd = edTable.child( ".mceStatusbar" );
             */
            var edStatusbarTd = edTable.down( ".mceStatusbar" ),
                statusbarHeight = 0;
            
            if( edStatusbarTd ) {
                statusbarHeight += edStatusbarTd.getHeight();
            }
            
            var iframeHeight = height - toolbarHeight - statusbarHeight,
                iframeTd = edIframe.findParent( "td", 5, true );
            if( iframeTd )
                iframeHeight -= iframeTd.getFrameWidth( "tb" );
                
            // Resize iframe and container
            edTable.setSize( width, height );
            edIframe.setSize( toolbarWidth, iframeHeight );
        },

        /** ----------------------------------------------------------
        */
        focus: function(selectText, delay) {
            if (delay) {
                this.focus.defer(typeof delay == 'number' ? delay : 10, this, [selectText, false]);
                return;
            }

            this.withEd(function() {
                this.ed.focus();
                /*if (selectText === true) {
                // TODO: Select editor's content
                }*/
            });

            return this;
        },

        /** ----------------------------------------------------------
         * Ext4: renamed from processValue to processRawValue 
         * (overwrites Ext.form.field.Base.processRawValue)
         * Strips HTML tags so that validation can be performed on the raw text
        */
        processRawValue : function( value ){
            return Ext.util.Format.stripTags( value );
        },
        
        /* ----------------------------------------------------------
         * no need to implement validateValue as in Ext3 implementation,
         * all functionality in Ext.form.field.Text.getErrors
        */

        /** ----------------------------------------------------------
        If ed (local editor instance) is already initialized, calls
        specified function directly. Otherwise - adds it to ed.onInit event.
        */
        withEd: function(func) {

            // If editor is not created yet, reschedule this call.
            if (!this.ed) this.on(
                "editorcreated",
                function() { this.withEd(func); },
                this);

            // Else if editor is created and initialized
            else if (this.ed.initialized) func.call(this);

            // Else if editor is created but not initialized yet.
            else this.ed.onInit.add(Ext.bind(function() { Ext.defer(func, 10, this); }, this));
        },

        // Add static members, see documentation of Ext.Class
        statics: {

            /**
            Static field with all the plugins that should be loaded by TinyMCE.
            Should be set before first component would be created.
            @static
            */
            tinymcePlugins: "pagebreak,style,layer,table,advhr,advimage,advlink,emotions,iespell,insertdatetime,preview,media,searchreplace,print,contextmenu,paste,directionality,noneditable,visualchars,nonbreaking,xhtmlxtras,template",
    
            /** ----------------------------------------------------------
                Inits TinyMCE and other necessary dependencies.
            */
            initTinyMCE: function(settings) {
                if (!tmceInitialized) {
    
                    // Create lazy classes
                    /** ----------------------------------------------------------
                    WindowManager
                    */
                    WindowManager = Ext.extend( tinymce.WindowManager, {
    
                        /** ----------------------------------------------------------
                            Config parameters:
                            editor - reference to TinyMCE intstance.
                            mangager - WindowGroup to use for the popup window. Could be empty.
                        */
                        constructor: function( cfg ) {
                            WindowManager.superclass.constructor.call(this, cfg.editor);
    
                            // Set window group
                            this.manager = cfg.manager;
                        },
    
                        /** ----------------------------------------------------------
                        */
                        alert: function(txt, cb, s) {
                            Ext.MessageBox.alert("", txt, function() {
                                if (!Ext.isEmpty(cb)) {
                                    cb.call(this);
                                }
                            }, s);
                        },
    
                        /** ----------------------------------------------------------
                        */
                        confirm: function(txt, cb, s) {
                            Ext.MessageBox.confirm("", txt, function(btn) {
                                if (!Ext.isEmpty(cb)) {
                                    cb.call(this, btn == "yes");
                                }
                            }, s);
                        },
    
                        /** ----------------------------------------------------------
                        */
                        open: function(s, p) {
    
                            s = s || {};
                            p = p || {};
    
                            if (!s.type)
                                this.bookmark = this.editor.selection.getBookmark('simple');
    
                            s.width = parseInt(s.width || 320);
                            s.height = parseInt(s.height || 240) + (tinymce.isIE ? 8 : 0);
                            s.min_width = parseInt(s.min_width || 150);
                            s.min_height = parseInt(s.min_height || 100);
                            s.max_width = parseInt(s.max_width || 2000);
                            s.max_height = parseInt(s.max_height || 2000);
                            s.movable = true;
                            s.resizable = true;
                            p.mce_width = s.width;
                            p.mce_height = s.height;
                            p.mce_inline = true;
    
                            this.features = s;
                            this.params = p;
    
                            var win = new Ext.Window(
                            {
                                title: s.name,
                                width: s.width,
                                height: s.height,
                                minWidth: s.min_width,
                                minHeight: s.min_height,
                                resizable: true,
                                maximizable: s.maximizable,
                                minimizable: s.minimizable,
                                modal: true,
                                stateful: false,
                                constrain: true,
                                manager: this.manager,
                                layout: "fit",
                                items: [
                                    new Ext.BoxComponent({
                                        autoEl: {
                                            tag: 'iframe',
                                            src: s.url || s.file
                                        },
                                        style : 'border-width: 0px;'
                                    })
                                ]
                            });
    
                            p.mce_window_id = win.getId();
    
                            win.show(null,
                                function() {
                                    if (s.left && s.top)
                                        win.setPagePosition(s.left, s.top);
                                    var pos = win.getPosition();
                                    s.left = pos[0];
                                    s.top = pos[1];
                                    this.onOpen.dispatch(this, s, p);
                                },
                                this
                            );
    
                            return win;
                        },
    
                        /** ----------------------------------------------------------
                        */
                        close: function(win) {
    
                            // Probably not inline
                            if (!win.tinyMCEPopup || !win.tinyMCEPopup.id) {
                                WindowManager.superclass.close.call(this, win);
                                return;
                            }
    
                            var w = Ext.getCmp(win.tinyMCEPopup.id);
                            if (w) {
                                this.onClose.dispatch(this);
                                w.close();
                            }
                        },
    
                        /** ----------------------------------------------------------
                        */
                        setTitle: function(win, ti) {
    
                            // Probably not inline
                            if (!win.tinyMCEPopup || !win.tinyMCEPopup.id) {
                                WindowManager.superclass.setTitle.call(this, win, ti);
                                return;
                            }
    
                            var w = Ext.getCmp(win.tinyMCEPopup.id);
                            if (w) w.setTitle(ti);
                        },
    
                        /** ----------------------------------------------------------
                        */
                        resizeBy: function(dw, dh, id) {
    
                            var w = Ext.getCmp(id);
                            if (w) {
                                var size = w.getSize();
                                w.setSize(size.width + dw, size.height + dh);
                            }
                        },
    
                        /** ----------------------------------------------------------
                        */
                        focus: function(id) {
                            var w = Ext.getCmp(id);
                            if (w) w.setActive(true);
                        }
                        
                    });
    
                    /** ----------------------------------------------------------
                    ControlManager
                    */
                    ControlManager = Ext.extend( tinymce.ControlManager, {
    
                        // Reference to ExtJS control Ext.ux.TinyMCE.
                        control: null,
    
                        /** ----------------------------------------------------------
                        */
                        constructor: function(control, ed, s) {
                            this.control = control;
                            ControlManager.superclass.constructor.call(this, ed, s);
                        },
    
                        /** ----------------------------------------------------------
                        */
                        createDropMenu: function(id, s) {
                            // Call base method
                            var res = ControlManager.superclass.createDropMenu.call(this, id, s);
    
                            // Modify returned result
                            var orig = res.showMenu;
                            res.showMenu = function(x, y, px) {
                                orig.call(this, x, y, px);
                                Ext.fly('menu_' + this.id).setStyle("z-index", 200001);
                            };
    
                            return res;
                        },
    
                        /** ----------------------------------------------------------
                        */
                        createColorSplitButton: function(id, s) {
                            // Call base method
                            var res = ControlManager.superclass.createColorSplitButton.call(this, id, s);
    
                            // Modify returned result
                            var orig = res.showMenu;
                            res.showMenu = function(x, y, px) {
                                orig.call(this, x, y, px);
                                Ext.fly(this.id + '_menu').setStyle("z-index", 200001);
                            };
    
                            return res;
                        }
                    });
    
                    // Init TinyMCE
                    var s = {
                        mode: "none",
                        plugins: Ext.ux.TinyMCE.tinymcePlugins,
                        theme: "advanced"
                    };
                    Ext.apply(s, settings);
    
                    if (!tinymce.dom.Event.domLoaded)
                        tinymce.dom.Event._pageInit();
    
                    tinyMCE.init(s);
                    tmceInitialized = true;
                }
            } // end method initTinyMCE
        } // end statics
    }); // Ext.define

})();