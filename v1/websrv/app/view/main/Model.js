/**
 * This class is the view model for the Main view of the application.
 */
Ext.define('websrv.view.main.Model', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.main',
    data: {
        name: 'websrv',
        versione:'1.0.0',
        dataVersione:'25/02/2017',
        tr:LOCALE.default,
        apptitle:Locale.t('websrv.apptitle'),
        tag:'WEBSRV'
    },
    formulas:{
        appTitle: {
            bind:{
                versione:'{versione}',
                dataVersione:'{dataVersione}'
            },
            get: function(data){
                return '<div class="titleApp">' +
                    '<img class="logo" src="/images/azienda/logo_45.png" alt="&nbsp;">' +
                    '</div><div class="titleApp">' +
                    '<img class="logoApp" src="/images/64/WEBSRV.png" alt="&nbsp;"><span class="title"> ' + Locale.t('websrv.apptitle')+'</span>' +
                    '</div><div style="clear: both;" ' +
                    '<div class="appversion">Version: '+data.versione+' - '+data.dataVersione+'</div>';
            }
        }
    }
});
