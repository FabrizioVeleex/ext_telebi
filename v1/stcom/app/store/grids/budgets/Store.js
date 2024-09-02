/**
 * Created by luca on 16/02/2017.
 */
Ext.define('stcom.store.grids.budgets.Store', {
    extend: 'portal.v1.store.grids.Store',
    alias:'store.v1-budgets',
    requires:[
        'stcom.model.grids.Budgets'
    ],
    model: 'stcom.model.grids.Budgets',
    proxy: {
        url: Backend.REST_API + 'grids/budgets/getstore/'
    }
});