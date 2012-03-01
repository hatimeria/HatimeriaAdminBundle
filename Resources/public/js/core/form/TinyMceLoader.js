/**
 * TinyMCE Loader
 * 
 * @class HatimeriaAdmin.core.form.TinyMceLoader
 */
(function() {
    
    Ext.define('HatimeriaAdmin.core.form.TinyMceLoader', {
        statics: {
            
            /**
             * Synchronous loads tinymce and adapter
             */
            load: function()
            {
                if (typeof tinymce == 'undefined')
                {
                    Ext.Ajax.request({
                        url: '/bundles/hatimeriaadmin/js/core/vendor/tinymce/jscripts/tiny_mce/tiny_mce.js',
                        async: false,
                        success: function(response){
                            eval(response.responseText)
                        }
                    });
                    tinymce.baseURL = '/bundles/hatimeriaadmin/js/core/vendor/tinymce/jscripts/tiny_mce';
                }
                
                if (typeof tinymce_upload == 'undefined')
                {
                    Ext.Ajax.request({
                        url: '/bundles/hatimeriaadmin/js/core/vendor/tinymce/jscripts/upload/upload.js',
                        async: false,
                        success: function(response) {
                            eval(response.responseText);
                        }
                    });
                }
                
                Ext.require('HatimeriaAdmin.core.vendor.ux.TinyMCE');
            }
        }
    });
    
    HatimeriaAdmin.core.form.TinyMceLoader.load();
    
})();