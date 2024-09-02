/**
 * Created by luke on 12/05/22.
 */
Ext.define('gpr.store.grids.prodotti.Store', {
    extend: 'portal.v1.store.grids.BufferStore',
    alias:'store.v1-prodotti',
    requires:[
        'gpr.model.grids.Prodotti'
    ],
    model: 'gpr.model.grids.Prodotti',
    proxy: {
        url: Backend.REST_API + 'grids/prodotti/getstore/'
    }
});