/**
 * Created by luke on 21/07/2020.
 */
Ext.define('bolpas.store.grids.resi.Store', {
    extend: 'portal.v1.store.grids.BufferStore',
    alias:'store.v1-resi',
    requires: [
        'bolpas.model.grids.Bolle'
    ],
    model: 'bolpas.model.grids.Bolle',
    proxy: {
        url: Backend.REST_API + 'grids/resi/getstore/'
    }
});