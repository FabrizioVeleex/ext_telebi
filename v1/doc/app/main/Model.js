/**
 * This class is the view model for the Main view of the application.
 */
Ext.define('doc.main.Model', {
    extend: 'portal.v1.view.main.ViewModel',
    alias: 'viewmodel.main',
    data: {
        name: 'doc',
        tr: LOCALE.default,
        apptitle: Locale.t('doc.apptitle'),
        tag: 'DOC',
        subMenu: ''
    }
});
