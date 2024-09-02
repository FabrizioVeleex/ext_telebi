/**
 * This class is the view model for the Main view of the application.
 */
Ext.define('amm.view.main.Model', {
    extend: 'portal.v1.view.main.ViewModel',
    alias: 'viewmodel.main',
    data: {
        name: 'amm',
        tr:LOCALE.default,
        apptitle:Locale.t('amm.apptitle'),
        tag:'AMM'
    }
})