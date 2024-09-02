/**
 * Created by luke on 21/07/2020.
 */
Ext.define('amm.store.grids.scrivanie.Store', {
    extend: 'portal.v1.store.grids.BufferStore',
    alias:'store.v1-scrivanie',
    requires: [
        'amm.model.grids.Scrivanie'
    ],
    model: 'amm.model.grids.Scrivanie',
    proxy: {
        url: Backend.REST_API + 'grids/scrivanie/getstore/'
    }
});