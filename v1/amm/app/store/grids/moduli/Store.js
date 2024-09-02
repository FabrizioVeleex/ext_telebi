/**
 * Created by luke on 21/07/2020.
 */
Ext.define('amm.store.grids.moduli.Store', {
    extend: 'portal.v1.store.grids.BufferStore',
    alias:'store.v1-moduli',
    requires: [
        'amm.model.grids.Moduli'
    ],
    model: 'amm.model.grids.Moduli',
    proxy: {
        url: Backend.REST_API + 'grids/moduli/getstore/'
    }
});