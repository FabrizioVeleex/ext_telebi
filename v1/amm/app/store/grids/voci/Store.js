/**
 * Created by luke on 21/07/2020.
 */
Ext.define('amm.store.grids.voci.Store', {
    extend: 'portal.v1.store.grids.BufferStore',
    alias:'store.v1-voci',
    requires: [
        'amm.model.grids.Voci'
    ],
    model: 'amm.model.grids.Voci',
    proxy: {
        url: Backend.REST_API + 'grids/voci/getstore/'
    }
});