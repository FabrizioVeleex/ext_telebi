/**
 * Created by luke on 21/07/2020.
 */
Ext.define('amm.store.grids.utenti.Store', {
    extend: 'portal.v1.store.grids.BufferStore',
    alias:'store.v1-utenti',
    requires: [
        'amm.model.grids.Utenti'
    ],
    model: 'amm.model.grids.Utenti',
    proxy: {
        url: Backend.REST_API + 'grids/utenti/getstore/'
    }
});