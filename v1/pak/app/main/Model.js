
/**
 * This class is the view model for the Main view of the application.
 */
Ext.define('pak.main.Model', {
    extend: 'portal.v1.view.main.ViewModel',
    alias: 'viewmodel.main',
    data: {
        name: 'pak',
        tr: LOCALE.default,
        apptitle: Locale.t('pak.apptitle'),
        tag: 'PAK'
    }
})
