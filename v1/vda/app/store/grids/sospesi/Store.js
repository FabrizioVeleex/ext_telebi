/**
 * Created by luca on 16/02/2017.
 */
Ext.define('vda.store.grids.sospesi.Store', {
    extend: 'portal.v1.store.grids.BufferStore',
    alias:'store.v1-sospesi',
    requires:[
        'vda.model.grids.Progetti'
    ],
    model: 'vda.model.grids.Progetti',
    proxy: {
        url: Backend.REST_API + 'grids/sospesi/getstore/'
    }
});