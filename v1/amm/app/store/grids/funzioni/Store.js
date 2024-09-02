/**
 * Created by luke on 21/07/2020.
 */
Ext.define('amm.store.grids.funzioni.Store', {
    extend: 'portal.v1.store.grids.BufferStore',
    alias:'store.v1-funzioni',
    requires: [
        'amm.model.grids.Funzioni'
    ],
    model: 'amm.model.grids.Funzioni',
    proxy: {
        url: Backend.REST_API + 'grids/funzioni/getstore/'
    }
});