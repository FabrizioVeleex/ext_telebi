
/**
 * This class is the view model for the Main view of the application.
 */
Ext.define('prd.main.Model', {
    extend: 'portal.v1.view.main.ViewModel',
    alias: 'viewmodel.main',
    data: {
        name: 'prd',
        tr: LOCALE.default,
        apptitle: Locale.t('prd.apptitle'),
        tag: 'PRD'
    }
});
