/**
 * Created by luca on 13/06/2017.
 */
Ext.define('ana.store.grids.sottocategorieatv.Store', {
    extend: 'portal.v1.store.grids.BufferStore',
    alias:'store.v1-sottocategorieatv',
    requires:[
        'ana.model.grids.Sottocategorieatv'
    ],
    model: 'ana.model.grids.Sottocategorieatv',

    proxy: {
        url: Backend.REST_API + 'grids/sottocategorieatv/getstore/'
    }
});