/**
 * Created by luca on 16/02/2017.
 */
Ext.define('gpr.view.grids.immagini.Model', {
    extend: 'portal.v1.view.grids.DefaultModel',
    alias: 'viewmodel.immagini',
    requires:[
        'gpr.store.grids.immagini.Famiglie',
        'gpr.store.grids.immagini.Store',
        'gpr.store.grids.immagini.Veicolo'
    ],
    stores: {
        store:{type:'v1-immagini',autoLoad:false},
        storeFamiglie:{type:'v1-famiglie',autoLoad:true},
        storeVeicoli:{type:'v1-veicolo'}
    },
    data: {
        titolo:Locale.t('gpr.grids.immagini.title')
    }
})