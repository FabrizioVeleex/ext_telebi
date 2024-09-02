/**
 * Created by luca on 16/02/2017.
 */
Ext.define('ama.store.grids.incorso.Store', {
    extend: 'portal.v1.store.grids.BufferStore',
    alias:'store.v1-incorso',
    requires:[
        'ama.model.grids.Schede'
    ],
    model: 'ama.model.grids.Schede',
    proxy: {
        url: Backend.REST_API + 'grids/incorso/getstore/'
    }
});