Ext.define('HatimeriaAdmin.store.BaseStore', {
    extend: 'Ext.data.DirectStore',
    
    /**
     * Constructor
     * 
     * @param {} cfg
     */
    constructor: function(cfg)
    {
        var config = {
            root: 'records',
            idProperty: 'id',
            remoteSort: true,
            autoLoad: true,
            paramsAsHash: true,
            sortInfo: {
                field: 'name',
                direction: 'desc'
            }
        };
        Ext.apply(config, cfg || {});

        this.callParent([config]);
    },
    
    /**
     * Applies context-tag
     * 
     * @param [] vars
     */
    applyGlobalValues: function(varnames)
    {
        var data = {}, varname;
            
        for (var i in varnames)
        {
            varname = varnames[i];
            if (typeof window['_' + varname] != 'undefined')
            {
                if (window['_' + varname] != '')
                {
                    data[varname] = window['_' + varname];
                }
            }
        }
            
        this.applyExtraParams(data);
    },
        
    /**
     * Applying extraparams passed during creating store
     * 
     * @param {} data
     */
    applyExtraParams: function(data)
    {
        if (typeof this.proxy.extraParams != 'object')
        {
            this.proxy.extraParams = {};
        }
            
        Ext.apply(this.proxy.extraParams, data);
    }
});
    