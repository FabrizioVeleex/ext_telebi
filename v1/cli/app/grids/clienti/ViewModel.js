/**
 * Created by luca on 16/02/2017.
 */
Ext.define('cli.grids.clienti.ViewModel', {
    extend: 'portal.v1.view.grids.DefaultModel',
    alias: 'viewmodel.v1-clienti',
    requires:[
        'cli.grids.clienti.Store',
        'cli.grids.clienti.StoreEstero',
        'cli.grids.clienti.StoreIta'
    ],
    stores: {
        storeClienti:{type:'v1-clienti',autoLoad:false},
        storeClientiIta:{type:'v1-clientiita',autoLoad:false},
        storeClientiEstero:{type:'v1-clientiestero',autoLoad:false}
    },
    data: {
        titoloClienti:Locale.t('cli.grids.clienti.title'),
        titoloClientiIta:Locale.t('cli.grids.clienti.titleita'),
        titoloClientiEstero:Locale.t('cli.grids.clienti.titleestero')
    }
});