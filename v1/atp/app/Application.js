/**
 * The main application class. An instance of this class is created by app.js when it
 * calls Ext.application(). This is the ideal place to handle application launch and
 * initialization details.
 */
Ext.define('atp.Application', {
    extend: 'Ext.app.Application',

    name: 'atp',
    requires: [
        'portal.util.Locale',
        'Ext.plugin.Viewport',
    ],
    launch: function () {
        document.title = Locale.t('global.azienda');
    },
    onAppUpdate: function () {
        window.location.reload();
    }
});
