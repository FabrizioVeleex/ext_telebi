/**
 * Created by luke on 21/07/2020.
 */
Ext.define('amm.store.grids.stabilimenti.Store', {
    extend: 'portal.v1.store.grids.BufferStore',
    alias:'store.v1-stabilimenti',
    requires: [
        'amm.model.grids.Stabilimenti'
    ],
    model: 'amm.model.grids.Stabilimenti',
    proxy: {
        url: Backend.REST_API + 'grids/stabilimenti/getstore/'
    }
});