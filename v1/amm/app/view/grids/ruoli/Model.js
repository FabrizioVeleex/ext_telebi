/**
 * Created by luca on 16/02/2017.
 */
Ext.define('amm.view.grids.ruoli.Model', {
    extend: 'portal.v1.view.grids.DefaultModel',
    alias: 'viewmodel.ruoli',
    requires:[
        'amm.store.grids.ruoli.Store'
    ],
    stores: {
        store:{type:'v1-ruoli',autoLoad:false}
    },
    data: {
        titolo:Locale.t('amm.grids.ruoli.title')
    }
});