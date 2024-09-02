/**
 * This class is the view model for the Main view of the application.
 */
Ext.define('snp.view.main.Model', {
    extend: 'portal.v1.view.main.ViewModel',
    alias: 'viewmodel.main',
    data: {
        name: 'snp',
        tr:LOCALE.default,
        apptitle:Locale.t('snp.apptitle'),
        tag:'SNP'
    }
});
