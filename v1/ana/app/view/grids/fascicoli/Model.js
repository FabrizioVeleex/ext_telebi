/**
 * Created by luca on 13/06/2017.
 */
Ext.define('ana.view.grids.fascicoli.Model', {
    extend: 'portal.v1.view.grids.DefaultModel',
    alias: 'viewmodel.fascicoli',
    requires:[
        'ana.store.grids.fascicoli.Store'
    ],
    stores: {
        store:{type:'v1-fascicoli',autoLoad:false}
    },
    data: {
        titolo:Locale.t('ana.grids.fascicoli.title')
    }
});