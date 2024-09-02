
/**
 * This class is the view model for the Main view of the application.
 */
Ext.define('cli.main.Model', {
    extend: 'portal.v1.view.main.ViewModel',
    alias: 'viewmodel.main',
    data: {
        name: 'cli',
        tr:LOCALE.default,
        apptitle:Locale.t('cli.apptitle'),
        tag:'CLI'
    }
});
