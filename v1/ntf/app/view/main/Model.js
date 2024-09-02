Ext.define('ntf.view.main.Model', {
    extend: 'portal.v1.view.main.ViewModel',
    alias: 'viewmodel.main',
    data: {
        name: 'ntf',
        tr:LOCALE.default,
        apptitle:Locale.t('ntf.apptitle'),
        tag:'NTF'
    }
});
