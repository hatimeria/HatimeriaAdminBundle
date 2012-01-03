var FormDialog = {
    
    init: function() {},

    setFile: function(file) {
        var win = tinyMCEPopup.params.image_window;
        var el = win.document.getElementById('src');
        
        el.value = file;
		win.ImageDialog.changeAppearance();
		win.ImageDialog.showPreviewImage(file, 1);
        tinyMCEPopup.close();
    }
};

tinyMCEPopup.onInit.add(FormDialog.init, FormDialog);
