/**
 * Created by luke on 04/10/2019.
 */
Ext.define('fmc.store.grids.modelli.Store', {
    extend: 'portal.v1.store.grids.BufferStore',
    alias:'store.v1-modelli',
    requires:[
        'fmc.model.grids.Modelli'
    ],
    model: 'fmc.model.grids.Modelli',
    proxy: {
        url: Backend.REST_API + 'grids/modelli/getstore/'
    }
});