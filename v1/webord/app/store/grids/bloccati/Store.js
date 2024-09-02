/**
 * Created by luca on 16/02/2017.
 */
Ext.define('webord.store.grids.bloccati.Store', {
    extend: 'portal.v1.store.grids.BufferStore',
    alias:'store.v1-bloccati',
    requires:[
        'webord.model.grids.Ordini'
    ],
    model: 'webord.model.grids.Ordini',
    proxy: {
        url: Backend.REST_API + 'grids/bloccati/getstore/'
    }
});