/**
 * This class is the view model for the Main view of the application.
 */
Ext.define('ama.view.main.Model', {
    extend: 'portal.v1.view.main.ViewModel',
    alias: 'viewmodel.main',
    data: {
        name: 'ama',
        tr:LOCALE.default,
        apptitle:Locale.t('ama.apptitle'),
        tag:'AMA'
    }
});
