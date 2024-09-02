Ext.define('home.Locale', {
    singleton: true,
    init:function(){
        Locale.apply({
            language:'it',
            fallbackLanguage:'it',
        });
    }
})