/**
 * This class is the view model for the Main view of the application.
 */
Ext.define('mcd.view.main.Model', {
    extend: 'portal.v1.view.main.ViewModel',
    alias: 'viewmodel.main',
    data: {
        name: 'mcd',
        tr:LOCALE.default,
        apptitle:Locale.t('mcd.apptitle'),
        tag:'MCD'
    }
});
