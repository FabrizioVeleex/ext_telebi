/**
 * Created by luca on 13/06/2017.
 */
Ext.define('ana.store.grids.stati.Store', {
    extend: 'portal.v1.store.grids.BufferStore',
    alias:'store.v1-stati',
    requires:[
        'ana.model.grids.Stati'
    ],
    model: 'ana.model.grids.Stati',

    proxy: {
        url: Backend.REST_API + 'grids/stati/getstore/'
    }
});