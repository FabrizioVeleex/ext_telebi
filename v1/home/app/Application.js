Ext.enableAriaPanels = false;  //ARIA regions
Ext.define('home.Application', {
    extend: 'Ext.app.Application',
    name: 'portale',
    requires: [
        'portal.util.Locale',
        'Ext.plugin.Viewport',
    ],
    launch: function () {

    },
    onAppUpdate: function () {
        window.location.reload();
    }
});
