/**
 * Created by luke on 21/07/2020.
 */
Ext.define('amm.store.grids.aziende.Store', {
    extend: 'portal.v1.store.grids.BufferStore',
    alias:'store.v1-aziende',
    requires: [
        'amm.model.grids.Aziende'
    ],
    model: 'amm.model.grids.Aziende',
    proxy: {
        url: Backend.REST_API + 'grids/aziende/getstore/'
    }
});