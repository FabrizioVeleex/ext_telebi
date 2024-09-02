/**
 * The main application class. An instance of this class is created by app.js when it
 * calls Ext.application(). This is the ideal place to handle application launch and
 * initialization details.
 */
Ext.define('nsm.Application', {
    extend: 'Ext.app.Application',
    requires: [
        'portal.util.Locale',
        'Ext.plugin.Viewport',
    ],
    name: 'nsm',
    launch: function () {
        document.title = Locale.t('global.azienda');
        Ext.ariaWarn = Ext.emptyFn;
    },
    onAppUpdate: function () {
        Ext.Msg.confirm(Locale.t('global.appupdate.title'), Locale.t('global.appupdate.message'),
            function (choice) {
                if (choice === 'yes') {
                    window.location.reload();
                }
            }
        );
    }
});
