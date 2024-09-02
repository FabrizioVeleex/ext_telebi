/**
 * Created by luca on 16/02/2017.
 */
Ext.define('fmc.store.grids.schede.Passivi', {
    extend: 'portal.v1.store.grids.BufferStore',
    alias:'store.v1-passivi',
    requires:[
        'fmc.model.grids.Schede'
    ],
    model: 'fmc.model.grids.Schede',
    proxy: {
        url: Backend.REST_API + 'grids/passivi/getstore/'
    }
});