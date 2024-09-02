/**
 * Created by luca on 16/02/2017.
 */
Ext.define('amm.view.grids.voci.Model', {
    extend: 'portal.v1.view.grids.DefaultModel',
    alias: 'viewmodel.voci',
    requires:[
        'amm.store.grids.voci.Store'
    ],
    stores: {
        store:{type:'v1-voci',autoLoad:false}
    },
    data: {
        titolo:Locale.t('amm.grids.voci.title')
    }
});