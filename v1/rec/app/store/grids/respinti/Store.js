/**
 * Created by luca on 16/02/2017.
 */
Ext.define('rec.store.grids.respinti.Store', {
    extend: 'portal.v1.store.grids.BufferStore',
    alias:'store.v1-respinti',
    requires:[
        'rec.model.grids.Resi'
    ],
    model: 'rec.model.grids.Resi',
    proxy: {
        url: Backend.REST_API + 'grids/respinti/getstore/'
    }
})