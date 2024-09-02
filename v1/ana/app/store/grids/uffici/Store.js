/**
 * Created by luca on 13/06/2017.
 */
Ext.define('ana.store.grids.uffici.Store', {
    extend: 'portal.v1.store.grids.BufferStore',
    alias:'store.v1-uffici',
    requires:[
        'ana.model.grids.Uffici'
    ],
    model: 'ana.model.grids.Uffici',

    proxy: {
        url: Backend.REST_API + 'grids/uffici/getstore/'
    }
});