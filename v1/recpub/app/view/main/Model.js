Ext.define('recpub.view.main.Model', {
    extend: 'portal.v1.view.main.ViewModel',
    alias: 'viewmodel.main',
    data: {
        name: 'recpub',
        tr:LOCALE.default,
        apptitle:Locale.t('recpub.apptitle'),
        tag:'REC'
    }
});
