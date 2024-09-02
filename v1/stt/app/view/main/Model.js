/**
 * This class is the view model for the Main view of the application.
 */
Ext.define('stt.view.main.Model', {
    extend: 'portal.v1.view.main.ViewModel',
    alias: 'viewmodel.main',
    data: {
        name: 'stt',
        tr:LOCALE.default,
        apptitle:Locale.t('stt.apptitle'),
        tag:'STT'
    }
});
