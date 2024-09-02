/**
 * This class is the view model for the Main view of the application.
 */
Ext.define('fat.main.Model', {
    extend: 'portal.v1.view.main.ViewModel',
    alias: 'viewmodel.main',
    data: {
        name: 'fat',
        tr: LOCALE.default,
        apptitle: Locale.t('fat.apptitle'),
        tag: 'FAT'
    }
})
