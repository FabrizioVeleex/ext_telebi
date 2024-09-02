/**
 * This class is the view model for the Main view of the application.
 */
Ext.define('sting.view.main.Model', {
    extend: 'portal.v1.view.main.ViewModel',
    alias: 'viewmodel.main',
    data: {
        name: 'sting',
        tr:LOCALE.default,
        apptitle:Locale.t('sting.apptitle'),
        tag:'STING'
    }
});
