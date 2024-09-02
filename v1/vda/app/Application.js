/**
 * The main application class. An instance of this class is created by app.js when it
 * calls Ext.application(). This is the ideal place to handle application launch and
 * initialization details.
 */
Ext.define('vda.Application', {
    extend: 'Ext.app.Application',

    name: 'vda',

    requires: [
        'portal.util.Locale',
        'Ext.plugin.Viewport'
    ],
    launch: function () {
        document.title = Locale.t('global.azienda')
        Ext.ariaWarn = Ext.emptyFn
    },
    onAppUpdate: function () {
        window.location.reload()
    }
});
