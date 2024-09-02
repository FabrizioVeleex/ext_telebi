/**
 * This class is the view model for the Main view of the application.
 */
Ext.define('webord.view.main.Model', {
    extend: 'portal.v1.view.main.ViewModel',
    alias: 'viewmodel.main',
    data: {
        name: 'webord',
        tr:LOCALE.default,
        apptitle:Locale.t('webord.apptitle'),
        tag:'WEBORD'
    }
});
