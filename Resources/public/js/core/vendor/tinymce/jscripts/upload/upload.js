window.tinymce_upload = function(type, prefix, image, scope) {
    with (scope) {
        url = tinyMCEPopup.params.plugin_url.replace(/(tiny_mce\/plugins.*)/, '');
        tinyMCEPopup.editor.windowManager.open({
            file : Routing.generate('hatimeria_admin_media_upload'),
            width : 480,
            height : 150,
            inline : 1
        }, {
            plugin_url : url,
            image_window : scope
        });
    }
}