/**
 * This class is the view model for the Main view of the application.
 */
Ext.define('stver.view.main.Model', {
    extend: 'portal.v1.view.main.ViewModel',
    alias: 'viewmodel.main',
    data: {
        name: 'stver',
        tr:LOCALE.default,
        apptitle:Locale.t('stver.apptitle'),
        tag:'STVER'
    }
});
