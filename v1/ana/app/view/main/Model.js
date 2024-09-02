/**
 * This class is the view model for the Main view of the application.
 */
Ext.define('ana.view.main.Model', {
    extend: 'portal.v1.view.main.ViewModel',
    alias: 'viewmodel.main',
    data: {
        name: 'ana',
        tr:LOCALE.default,
        apptitle:Locale.t('ana.apptitle'),
        tag:'ANA'
    }
});
