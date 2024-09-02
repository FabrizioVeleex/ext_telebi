/**
 * Created by luca on 13/06/2017.
 */
Ext.define('ana.store.grids.comuni.Store', {
    extend: 'portal.v1.store.grids.BufferStore',
    alias:'store.v1-comuni',
    requires:[
        'ana.model.grids.Comuni'
    ],
    model: 'ana.model.grids.Comuni',

    proxy: {
        url: Backend.REST_API + 'grids/comuni/getstore/'
    }
});