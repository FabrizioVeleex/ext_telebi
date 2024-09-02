/**
 * This is a singleton usefull for getting infos about application that run
 * outside the package.
 */
Ext.define("portal.util.Application", {
	singleton: true,

	application: undefined,
	name: undefined,
	namespace: undefined,

	/**
	 * Get the main application name
	 * @returns {String} The main application namespace
	 */
	getName: function(){

		if(this.name){
			return this.name;
		}

        if(Ext.manifest.name){
            this.name = Ext.manifest.name;
            return this.name;
        }

        this.name =''
        let paths = Ext.Loader.config.paths || [];
        Ext.Object.each(paths, function(key, value){
            if(value === "app"){
                this.name = key;

                return false;
            }
        });

        this.name = appName;
        return this.name;
    },

    /**
     * Get the application namespace object
     * @returns {Object}
     */
    getNamespace: function(){
        if(this.namespace){
            return this.namespace;
        }

        this.namespace = this.getName();
        if(this.namespace){
            try {
                this.namespace = eval(this.namespace);
            } catch(err){
                return null;
            }
        }
        return this.namespace;
    },

    /**
     * Get the main application class. Could be usefull for calling static methods
     * @returns {Ext.app.Application} The main application
     */
    getApplication: function(){
    	if(this.application){
    		return this.application;
    	}

    	let appObj;
    	let appName = this.getName();
        if(appName){
            appObj = eval(appName);
        }
        this.application = appObj.Application;
        return this.application;
	}
});