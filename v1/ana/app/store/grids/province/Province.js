/**
 * Created by luca on 13/06/2017.
 */
Ext.define('ana.store.grids.province.Province', {
    extend: 'portal.v1.store.grids.BufferStore',
    alias:'store.v1-province',
    requires:[
        'ana.model.grids.Province'
    ],
    model: 'ana.model.grids.Province',

    proxy: {
        url: Backend.REST_API + 'grids/province/getstore/'
    }
});