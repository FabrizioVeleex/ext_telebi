Ext.define('sgv.view.main.Model', {
    extend: 'portal.v1.view.main.ViewModel',
    alias: 'viewmodel.main',
    data: {
        name: 'sgv',
        tr:LOCALE.default,
        apptitle:Locale.t('sgv.apptitle'),
        tag:'SGV'
    }
});
