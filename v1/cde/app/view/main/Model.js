/**
 * This class is the view model for the Main view of the application.
 */
Ext.define('cde.view.main.Model', {
    extend: 'portal.v1.view.main.ViewModel',
    alias: 'viewmodel.main',
    data: {
        name: 'cde',
        tr:LOCALE.default,
        apptitle:Locale.t('cde.apptitle'),
        tag:'CDE'
    }
});
