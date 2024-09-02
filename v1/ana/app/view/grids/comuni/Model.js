/**
 * Created by luca on 13/06/2017.
 */
Ext.define('ana.view.grids.comuni.Model', {
    extend: 'portal.v1.view.grids.DefaultModel',
    alias: 'viewmodel.comuni',
    requires:[
        'ana.store.grids.comuni.Store'
    ],
    stores: {
        store:{type:'v1-comuni',autoLoad:false}
    },
    data: {
        titolo:Locale.t('ana.grids.comuni.title')
    }
});