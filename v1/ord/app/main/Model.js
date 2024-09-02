/**
 * This class is the view model for the Main view of the application.
 */
Ext.define('ord.main.Model', {
    extend: 'portal.v1.view.main.ViewModel',
    alias: 'viewmodel.main',
    data: {
        name: 'ord',
        tr: LOCALE.default,
        apptitle: Locale.t('ord.apptitle'),
        tag: 'ORD'
    }
})
