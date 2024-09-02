/**
 * Created by luca on 16/02/2017.
 */
Ext.define('stcom.view.grids.nobudgets.Model', {
    extend: 'portal.v1.view.grids.DefaultModel',
    alias: 'viewmodel.nobudgets',
    requires:[
        'stcom.store.grids.budgets.StoreNoBudget'
    ],
    stores: {
        store:{type:'v1-nobudgets',autoLoad:false}
    },
    data: {
        titolo:Locale.t('stcom.grids.nobudgets.title')
    }
});