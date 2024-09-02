/**
 * This class is the view model for the Main view of the application.
 */
Ext.define('eve.view.main.Model', {
    extend: 'portal.v1.view.main.ViewModel',
    alias: 'viewmodel.main',
    data: {
        name: 'eve',
        tr:LOCALE.default,
        apptitle:Locale.t('eve.apptitle'),
        tag:'EVE'
    }
});
