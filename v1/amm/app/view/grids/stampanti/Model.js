/**
 * Created by luca on 16/02/2017.
 */
Ext.define('amm.view.grids.stampanti.Model', {
    extend: 'portal.v1.view.grids.DefaultModel',
    alias: 'viewmodel.stampanti',
    requires:[
        'amm.store.grids.stampanti.Store'
    ],
    stores: {
        store:{type:'v1-stampanti',autoLoad:false}
    },
    data: {
        titolo:Locale.t('amm.grids.stampanti.title')
    }
});