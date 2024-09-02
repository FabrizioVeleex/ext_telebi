/**
 * Created by luke on 17/04/21.
 */
Ext.define('orf.Application', {
    extend: 'Ext.app.Application',

    name: 'orf',

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