Ext.define('dip.view.main.Model', {
    extend: 'portal.v1.view.main.ViewModel',
    alias: 'viewmodel.main',
    data: {
        name: 'dip',
        tr:LOCALE.default,
        apptitle:Locale.t('dip.apptitle'),
        tag:'DIP'
    }
});
