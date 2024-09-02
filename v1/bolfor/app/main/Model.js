
/**
 * This class is the view model for the Main view of the application.
 */
Ext.define('bolfor.main.Model', {
    extend: 'portal.v1.view.main.ViewModel',
    alias: 'viewmodel.main',
    data: {
        name: 'bolfor',
        tr: LOCALE.default,
        apptitle: Locale.t('bolfor.apptitle'),
        tag: 'BOLFOR'
    }
});
