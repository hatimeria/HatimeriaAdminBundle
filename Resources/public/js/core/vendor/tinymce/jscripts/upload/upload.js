function tinymce_upload(type, prefix, image, scope)
{
    with (scope) {
        url = tinyMCEPopup.params.plugin_url.replace(/(tiny_mce\/plugins.*)/, '');
        tinyMCEPopup.editor.windowManager.open({
            file : '/media/upload',
            width : 480,
            height : 150,
            inline : 1
        }, {
            plugin_url : url,
            image_window : scope
        });
    }
}