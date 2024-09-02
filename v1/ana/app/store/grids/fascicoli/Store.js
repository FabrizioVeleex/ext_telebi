/**
 * Created by luca on 13/06/2017.
 */
Ext.define('ana.store.grids.fascicoli.Store', {
    extend: 'portal.v1.store.grids.BufferStore',
    alias:'store.v1-fascicoli',
    requires:[
        'ana.model.grids.Fascicoli'
    ],
    model: 'ana.model.grids.Fascicoli',

    proxy: {
        url: Backend.REST_API + 'grids/fascicoli/getstore/'
    }
});