Ext.enableAriaPanels = false;  //ARIA regions
Ext.define('skd.Application', {
    extend: 'Ext.app.Application',
    name: 'dip',
    requires: [
        'portal.util.Locale',
        'Ext.plugin.Viewport',
    ],
    launch: function () {
        document.title = Locale.t('global.azienda');
        Ext.ariaWarn = Ext.emptyFn
    },
    onAppUpdate: function () {
        window.location.reload();
    }
});
