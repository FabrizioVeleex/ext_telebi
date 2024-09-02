/**
 * Created by luca on 16/02/2017.
 */
Ext.define('gpr.view.grids.prodotti.Model', {
    extend: 'portal.v1.view.grids.DefaultModel',
    alias: 'viewmodel.prodotti',
    requires:[
        'gpr.store.grids.aziende.Aziendaexp',
        'gpr.store.grids.prodotti.ProdottiUpdate',
        'gpr.store.grids.prodotti.Store'
    ],
    stores: {
        store:{type:'v1-prodotti',autoLoad:false},
        storeAziende:{type:'v1-aziendaexp',autoLoad:true},
        storeProdotti:{type:'v1-prodottiupdate'}
    },
    data: {
        titolo:Locale.t('gpr.grids.prodotti.title')
    }
})