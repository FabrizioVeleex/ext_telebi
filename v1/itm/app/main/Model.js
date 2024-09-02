/**
 * This class is the view model for the Main view of the application.
 */
Ext.define('itm.main.Model', {
    extend: 'portal.v1.view.main.ViewModel',
    alias: 'viewmodel.main',
    data: {
        name: 'itm',
        tr: LOCALE.default,
        apptitle: Locale.t('itm.apptitle'),
        tag: 'ITM',
        subMenu: '',
        hiddenImage: false,
    }
});
