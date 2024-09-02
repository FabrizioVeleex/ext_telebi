/**
 * Created by luke on 21/07/2020.
 */
Ext.define('amm.store.grids.ruoli.Store', {
    extend: 'portal.v1.store.grids.BufferStore',
    alias:'store.v1-ruoli',
    requires: [
        'amm.model.grids.Ruoli'
    ],
    model: 'amm.model.grids.Ruoli',
    proxy: {
        url: Backend.REST_API + 'grids/ruoli/getstore/'
    }
});