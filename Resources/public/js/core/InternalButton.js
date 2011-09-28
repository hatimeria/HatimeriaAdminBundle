Ext.define('HatimeriaAdmin.core.InternalButton', {
    extend: "Ext.Button",
    alias: 'widget.h-button',
    text: __('Administration'),
    handler: function() {
        document.location = Routing.generate(this.internalUri);
    },
    constructor: function(config) {
        this.internalUri = config.uri;
        config.text = __(config.text || config.uri);
        this.callParent([config]);
    }
});