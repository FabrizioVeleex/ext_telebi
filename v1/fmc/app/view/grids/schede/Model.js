/**
 * Created by luca on 16/02/2017.
 */
Ext.define('fmc.view.grids.schede.Model', {
    extend: 'portal.v1.view.grids.DefaultModel',
    alias: 'viewmodel.schede',
    requires:[
        'fmc.store.grids.schede.Attivi',
        'fmc.store.grids.schede.Passivi'
    ],
    stores: {
        storeAttivi:{type:'v1-attivi',autoLoad:false},
        storePassivi:{type:'v1-passivi',autoLoad:false}
    },
    data: {
        titoloAttivi:Locale.t('fmc.grids.schede.titleAttivi'),
        titoloPassivi:Locale.t('fmc.grids.schede.titlePassivi')
    }
});