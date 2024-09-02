Ext.define('sdc.view.main.Model', {
    extend: 'portal.v1.view.main.ViewModel',
    alias: 'viewmodel.main',
    data: {
        name: 'sdc',
        tr:LOCALE.default,
        apptitle:Locale.t('sdc.apptitle'),
        tag:'SDC'
    }
});
