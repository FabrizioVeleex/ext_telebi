
/**
 * This class is the view model for the Main view of the application.
 */
Ext.define('acq.main.Model', {
    extend: 'portal.v1.view.main.ViewModel',
    alias: 'viewmodel.main',
    data: {
        name: 'acq',
        tr: LOCALE.default,
        apptitle: Locale.t('acq.apptitle'),
        tag: 'A'
    }
});
