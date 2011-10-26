/* 
 * ExtraFeatures Mixin
 */
(function() {
    
    Ext.define('HatimeriaAdmin.core.utils.ExtraFeatures', {
        extend: 'Ext.Base',
        
        /**
         * Process all extrafeatures miexd in to this object
         * 
         * @param string method
         */
        processExtraFeatures: function(method)
        {
            var 
                retObj = {}, 
                obj;
            
            if (typeof this.extraFeatures == 'undefined')
            {
                return false;
            }
            
            for (var name in this.extraFeatures)
            {
                obj = Ext.create(this.extraFeatures[name]);
                
                if (typeof obj[method] === 'function')
                {
                    retObj[name] = obj[method](this);
                }
            }
            
            return retObj;
        }
       
    });
    
})();