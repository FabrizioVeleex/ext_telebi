/**
 * Created by luca on 13/06/2017.
 */
Ext.define('ana.store.grids.paesi.Store', {
    extend: 'portal.v1.store.grids.BufferStore',
    alias:'store.v1-paesi',
    requires:[
        'ana.model.grids.Paesi'
    ],
    model: 'ana.model.grids.Paesi',

    proxy: {
        url: Backend.REST_API + 'grids/paesi/getstore/'
    }
});