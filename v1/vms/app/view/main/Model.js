/**
 * This class is the view model for the Main view of the application.
 */
Ext.define('vms.view.main.Model', {
    extend: 'portal.v1.view.main.ViewModel',
    alias: 'viewmodel.main',
    data: {
        name: 'vms',
        tr:LOCALE.default,
        apptitle:Locale.t('vms.apptitle'),
        tag:'VMS'
    }
});
