
/**
 * This class is the view model for the Main view of the application.
 */
Ext.define('bol.main.Model', {
    extend: 'portal.v1.view.main.ViewModel',
    alias: 'viewmodel.main',
    data: {
        name: 'bol',
        tr: LOCALE.default,
        apptitle: Locale.t('bol.apptitle'),
        tag: 'BOL'
    }
})
