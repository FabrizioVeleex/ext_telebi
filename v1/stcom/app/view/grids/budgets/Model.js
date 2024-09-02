/**
 * Created by luca on 16/02/2017.
 */
Ext.define('stcom.view.grids.budgets.Model', {
    extend: 'portal.v1.view.grids.DefaultModel',
    alias: 'viewmodel.budgets',
    requires:[
        'stcom.store.grids.budgets.Store'
    ],
    stores: {
        store:{type:'v1-budgets',autoLoad:false}
    },
    data: {
        titolo:Locale.t('stcom.grids.budgets.title')
    }
});