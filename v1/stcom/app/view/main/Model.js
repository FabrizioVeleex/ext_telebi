/**
 * This class is the view model for the Main view of the application.
 */
Ext.define('stcom.view.main.Model', {
    extend: 'portal.v1.view.main.ViewModel',
    alias: 'viewmodel.main',
    data: {
        name: 'stcom',
        tr:LOCALE.default,
        apptitle:Locale.t('stcom.apptitle'),
        tag:'STCOM'
    }
});
