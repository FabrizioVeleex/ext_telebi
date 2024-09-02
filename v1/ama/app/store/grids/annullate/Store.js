/**
 * Created by luca on 16/02/2017.
 */
Ext.define('ama.store.grids.annullate.Store', {
    extend: 'portal.v1.store.grids.BufferStore',
    alias:'store.v1-annullate',
    requires:[
        'ama.model.grids.Schede'
    ],
    model: 'ama.model.grids.Schede',
    proxy: {
        url: Backend.REST_API + 'grids/annullate/getstore/'
    }
});