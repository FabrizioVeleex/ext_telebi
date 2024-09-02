/**
 * This class is the view model for the Main view of the application.
 */
Ext.define('bolpas.view.main.Model', {
    extend: 'portal.v1.view.main.ViewModel',
    alias: 'viewmodel.main',
    data: {
        name: 'bolpas',
        tr:LOCALE.default,
        apptitle:Locale.t('bolpas.apptitle'),
        tag:'BOLPAS'
    }
})