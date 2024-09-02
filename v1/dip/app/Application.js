Ext.enableAriaPanels = false;  //ARIA regions
Ext.define('dip.Application', {
    extend: 'Ext.app.Application',
    name: 'dip',
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
