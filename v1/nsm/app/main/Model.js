/**
 * This class is the view model for the Main view of the application.
 */
Ext.define('nsm.view.main.Model', {
    extend: 'portal.v1.view.main.ViewModel',
    alias: 'viewmodel.main',
    data: {
        name: 'nsm',
        tr:LOCALE.default,
        apptitle:Locale.t('nsm.apptitle'),
        tag:'NSM'
    }
});
