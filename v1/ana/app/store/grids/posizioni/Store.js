/**
 * Created by luca on 13/06/2017.
 */
Ext.define('ana.store.grids.posizioni.Store', {
    extend: 'portal.v1.store.grids.BufferStore',
    alias:'store.v1-posizioni',
    requires:[
        'ana.model.grids.Posizioni'
    ],
    model: 'ana.model.grids.Posizioni',
    proxy: {
        url: Backend.REST_API + 'grids/posizioni/getstore/'
    }
});