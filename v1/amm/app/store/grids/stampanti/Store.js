/**
 * Created by luke on 21/07/2020.
 */
Ext.define('amm.store.grids.stampanti.Store', {
    extend: 'portal.v1.store.grids.BufferStore',
    alias:'store.v1-stampanti',
    requires: [
        'amm.model.grids.Stampanti'
    ],
    model: 'amm.model.grids.Stampanti',
    proxy: {
        url: Backend.REST_API + 'grids/stampanti/getstore/'
    }
});