/**
 * This class is the view model for the Main view of the application.
 */
Ext.define('impexp.view.main.Model', {
    extend: 'portal.v1.view.main.ViewModel',
    alias: 'viewmodel.main',
    data: {
        name: 'impexp',
        tr:LOCALE.default,
        apptitle:Locale.t('impexp.apptitle'),
        tag:'IMPEXP'
    }
});
