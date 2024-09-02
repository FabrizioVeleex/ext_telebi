/**
 * Created by luke on 04/10/2019.
 */
Ext.define('fmc.store.grids.verifiche.Store', {
    extend: 'portal.v1.store.grids.BufferStore',
    alias:'store.v1-verifiche',
    requires:[
        'fmc.model.grids.Verifiche'
    ],
    model: 'fmc.model.grids.Verifiche',
    proxy: {
        url: Backend.REST_API + 'grids/verifiche/getstore/'
    }
});