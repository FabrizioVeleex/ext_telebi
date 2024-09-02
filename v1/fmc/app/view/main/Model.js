/**
 * This class is the view model for the Main view of the application.
 */
Ext.define('fmc.view.main.Model', {
    extend: 'portal.v1.view.main.ViewModel',
    alias: 'viewmodel.main',
    data: {
        name: 'fmc',
        tr:LOCALE.default,
        apptitle:Locale.t('fmc.apptitle'),
        tag:'FMC'
    }
});
