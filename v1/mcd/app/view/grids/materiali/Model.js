/**
 * Created by luca on 16/07/2018.
 */
Ext.define('mcd.view.grids.materiali.Model', {
    extend: 'portal.v1.view.grids.DefaultModel',
    alias: 'viewmodel.materiali',
    requires:[
        'mcd.store.grids.materiali.Store'
    ],
    stores: {
        store:{type:'v1-materiali',autoLoad:false}
    },
    data: {
        titolo:Locale.t('mcd.grids.materiali.title') //titolo vista
    }
});