/**
 * This class is the view model for the Main view of the application.
 */
Ext.define('gnc.view.main.Model', {
    extend: 'portal.v1.view.main.ViewModel',
    alias: 'viewmodel.main',
    data: {
        name: 'gnc',
        tr:LOCALE.default,
        apptitle:Locale.t('gnc.apptitle'),
        tag:'GNC'
    }
});
