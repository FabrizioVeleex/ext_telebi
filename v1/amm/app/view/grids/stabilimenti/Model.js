/**
 * Created by luca on 16/02/2017.
 */
Ext.define('amm.view.grids.stabilimenti.Model', {
    extend: 'portal.v1.view.grids.DefaultModel',
    alias: 'viewmodel.stabilimenti',
    requires:[
        'amm.store.grids.stabilimenti.Store'
    ],
    stores: {
        store:{type:'v1-stabilimenti',autoLoad:false}
    },
    data: {
        titolo:Locale.t('amm.grids.stabilimenti.title')
    }
});