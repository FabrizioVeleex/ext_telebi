/**
 * This class is the view model for the Main view of the application.
 */
Ext.define('gpr.view.main.Model', {
    extend: 'portal.v1.view.main.ViewModel',
    alias: 'viewmodel.main',
    data: {
        name: 'gpr',
        tr:LOCALE.default,
        apptitle:Locale.t('gpr.apptitle'),
        tag:'GPR'
    }
});
