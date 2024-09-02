/**
 * Created by luca on 16/02/2017.
 */
Ext.define('rec.view.grids.archiviati.Model', {
    extend: 'portal.v1.view.grids.DefaultModel',
    alias: 'viewmodel.archiviati',
    requires:[
        'rec.store.grids.archiviati.ComboNazioni',
        'rec.store.grids.archiviati.ComboRegioni',
        'rec.store.grids.archiviati.Store'
    ],
    stores: {
        store:{type:'v1-archiviati',autoLoad:false},
        storePaesi:{type:'v1-combonazioni',autoLoad:false},
        storeRegioni:{type:'v1-comboregioni',autoLoad:false}
    },
    data: {
        titolo:Locale.t('rec.grids.archiviati.title') //titolo vista
    }
});