/**
 * This class is the view model for the Main view of the application.
 */
Ext.define('stres.view.main.Model', {
    extend: 'portal.v1.view.main.ViewModel',
    alias: 'viewmodel.main',
    data: {
        name: 'stres',
        tr:LOCALE.default,
        apptitle:Locale.t('stres.apptitle'),
        tag:'STRES'
    }
});
