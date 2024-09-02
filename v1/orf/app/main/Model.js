/**
 * This class is the view model for the Main view of the application.
 */
Ext.define('orf.main.Model', {
    extend: 'portal.v1.view.main.ViewModel',
    alias: 'viewmodel.main',
    data: {
        name: 'orf',
        tr: LOCALE.default,
        apptitle: Locale.t('orf.apptitle'),
        tag: 'ORF'
    }
})
