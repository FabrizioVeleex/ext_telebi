/**
 * Created by luca on 13/06/2017.
 */
Ext.define('ana.store.grids.categorieatv.Store', {
    extend: 'portal.v1.store.grids.BufferStore',
    alias:'store.v1-categorieatv',
    requires:[
        'ana.model.grids.Categorieatv'
    ],
    model: 'ana.model.grids.Categorieatv',

    proxy: {
        url: Backend.REST_API + 'grids/categorieatv/getstore/'
    }
});