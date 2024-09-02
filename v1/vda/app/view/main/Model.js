/**
 * This class is the view model for the Main view of the application.
 */
Ext.define('vda.view.main.Model', {
    extend: 'portal.v1.view.main.ViewModel',
    alias: 'viewmodel.main',
    data: {
        name: 'vda',
        tr:LOCALE.default,
        apptitle:Locale.t('vda.apptitle'),
        tag:'VDA'
    }
});
