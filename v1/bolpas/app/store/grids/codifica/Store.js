/**
 * Created by luke on 21/07/2020.
 */
Ext.define('bolpas.store.grids.codifica.Store', {
    extend: 'portal.v1.store.grids.BufferStore',
    alias:'store.v1-codifica',
    requires: [
        'bolpas.model.grids.Bolle'
    ],
    model: 'bolpas.model.grids.Bolle',
    proxy: {
        url: Backend.REST_API + 'grids/codifica/getstore/'
    }
});