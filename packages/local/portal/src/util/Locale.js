Ext.define('portal.util.Locale', {
    requires: [
        "portal.util.Application",
        'Ext.util.Cookies'
    ],
    alternateClassName: ['Locale'],
    singleton: true,
    language: 'it',
    fallbackLanguage: 'it',
    localePath: 'resources/locale/__lng__.json',
    translationStore: undefined,
    constructor: function (args) {
        this.init();
    },

    init: function () {
        this.init18n()
    },
    /**
     * Return the localized string depending on language loaded.
     * @param {string} key The JSON path of the string in the language file
     * @param {string} def The default value to return if the entry is not found.
     * If default value is not given a start and end _ will be added to the key
     * @returns {string} Locale string
     */
    t: function (key, def) {
        let locale_temp = window.localStorage.getItem('locale')
        //recupero nome app
        let pathArray = window.location.pathname.split('/');
        let app = pathArray[pathArray.length - 2];
        if (app && app !== 'home') {
            locale_temp = window.localStorage.getItem('i18next_' + app)
        }
        if (!locale_temp || locale_temp === "") {
            if (!this.initialized) {
                let namespace = portal.util.Application.getNamespace();
                if (namespace && namespace.Locale && namespace.Locale.init) {
                    namespace.Locale.init();
                }
                this.initialized = true;
            }

            //First check if i18n is loaded. If not simply return def
            if (!i18n) {
                return def;
            }

            //If i18n is not initialized load lang file
            if (!i18n.isInit) {
                this.init18nOld(this.language);
            }

            //If a default is not given, use the key and the underscore
            if (!def) {
                def = '_' + key + '_';
            }

            //Finally return the translation
            return i18n.t([key, def]);

        } else {
            //First check if i18n is loaded. If not simply return def
            if (!i18next) {
                return def;
            }

            if (!def) {
                def = '_' + key + '_';
            }
            let r = i18next.t(key, def);
            if (r.charAt(0) === '_') {
                //console.log(r)
            }
            return r;
        }
    },

    init18n: function () {
        let me = this;
        //recupero traduzione localstorage in base all'app
        let locale_temp = window.localStorage.getItem('locale')
        let pathArray = window.location.pathname.split('/');
        //recupero nome app
        let app = pathArray[pathArray.length - 2];
        if (app && app !== 'home') {
            locale_temp = window.localStorage.getItem('i18next_' + app)
        }
        //se non ha la lingua nello storage esco (V0 o precedenti)
        if (!locale_temp || locale_temp === '') {
            return
        }
        let LOCALE = JSON.parse(locale_temp)

        let fallback = this.fallbackLanguage;
        if (fallback === 'auto') {
            if (!navigator) {
                fallback = 'it';
            }
            else {
                fallback = navigator.language;
            }
        }

        let cfg = {
            getAsync: false,
            debug: false,
            defaultLanguage: 'it',
            lng: LOCALE.default,
            fallbackLng: fallback,
            initImmediate: false,
            resources: LOCALE.json
        };

        i18next
            .init(cfg,
                function (t) {
                    //Set i18n as initialized
                    i18next.isInit = true;
                    me.isInit = true;
                });
    },

    init18nOld: function (lng) {
        //apertura da v1
        let token = document.location.href.split('?')[1];
        if (token) {
            let qs = Ext.Object.fromQueryString(token);
            if (qs['ln']) {
                lng = qs['ln']
            }
        }

        let fallback = this.fallbackLanguage;
        if (fallback === 'auto') {
            if (!navigator) {
                fallback = 'it';
            }
            else {
                fallback = navigator.language;
            }
        }
        let ln_temp = window.localStorage.getItem('_ln')
        //ECCEZIONE YANG TODO rimuovere passaggio V1 apps
        if (ln_temp !== '') {
            lng = ln_temp
        } else {
            let lang_coockie = window.localStorage.getItem('_ln')
            if (lang_coockie && lang_coockie !== '') {
                lng = lang_coockie
            } else {
                lang_coockie = Ext.util.Cookies.get('i18next')
                if (lang_coockie && lang_coockie !== '') {
                    lng = lang_coockie
                }
            }
        }

        //Prepare the configuration object
        let cfg = {
            getAsync: false,
            lng: lng,
            fallbackLng: fallback
        };

        if (this.translationStore) {
            cfg.resStore = this.translationStore;
        }
        else {
            cfg.resGetPath = '/locale/' + portal.util.Application.name + '/__lng__.json';
        }


        i18n.init(cfg,
            function (t) {
                //Set i18n as initialized
                i18n.isInit = true;
            });
    },
    setLanguage: function (lan) {

        this.language = lan;
    },
    apply: function (cfg) {
        let me = this;
        Ext.apply(me, cfg);
    }
});




// Ext.define('portal.util.Locale', {
//     alternateClassName: ['Locale'],
//
//     requires: [
//         "portal.util.Application"
//     ],
//
//     /**
//      * Singleton must be set to true for the class to be instantiated at application startup
//      */
//     singleton: true,
//
//     /**
//      * The language to load. Default to it, change it before perform the first translation
//      */
//     language: 'it',
//     fallbackLanguage: 'it',
//     localePath: 'resources/locale/__lng__.json',
//     translationStore: undefined,
//
//     constructor: function(args){
//
//     },
//
//     /**
//      * Return the localized string depending on language loaded.
//      * @param {string} key The JSON path of the string in the language file
//      * @param {string} def The default value to return if the entry is not found.
//      * If default value is not given a start and end _ will be added to the key
//      * @returns {string} Locale string
//      */
//     t: function(key, def){
//         //Call the application method dedicated to locale initialization
//         if(!this.initialized){
//             let namespace = portal.util.Application.getNamespace();
//             if(namespace && namespace.Locale && namespace.Locale.init){
//                 namespace.Locale.init();
//             }
//             this.initialized = true;
//         }
//
//         //First check if i18n is loaded. If not simply return def
//         if(!i18n){
//             return def;
//         }
//
//         //If i18n is not initialized load lang file
//         if(!i18n.isInit){
//             this.init18n(this.language);
//         }
//
//         //If a default is not given, use the key and the underscore
//         if(!def){
//             def = '_'+key+'_';
//         }
//
//         //Finally return the translation
//         return i18n.t([key,def]);
//     },
//
//     /**
//      * Dinamically add a key to the translation object.
//      * The key could be deeper as you want.
//      */
//     addJson: function(key, json){
//         var obj = {};
//         obj[key] = json;
//         i18n.addResourceBundle(this.language, 'translation', obj);
//     },
//
//     /**
//      * Sync initialize the i18n library by downloading the language file given by param
//      * @param {string} lng Language file name (es. it => resources/it.json)
//      */
//     init18n: function(lng){
//         var fallback = this.fallbackLanguage;
//         if(fallback === 'auto'){
//             if(!navigator){
//                 fallback = 'it';
//             }
//             else{
//                 fallback = navigator.language;
//             }
//         }
//
//         //Prepare the configuration object
//         var cfg = {
//             getAsync: false,
//             lng: lng,
//             fallbackLng: fallback
//         };
//
//         if(this.translationStore){
//             cfg.resStore = this.translationStore;
//         }
//         else{
//             cfg.resGetPath = '/locale/'+portal.util.Application.name+'/__lng__.json';
//         }
//
//         i18n.init(cfg,
//         function(t) {
//             //Set i18n as initialized
//             i18n.isInit = true;
//         });
//     },
//
//     setLanguage: function(lan){
//         this.language = lan;
//     },
//
//     /**
//      * Apply configs to this object
//      * @params {Object} cfg and object containing configs to apply
//      */
//     apply: function(cfg){
//         var me = this;
//
//         Ext.apply(me, cfg);
//     }
// });