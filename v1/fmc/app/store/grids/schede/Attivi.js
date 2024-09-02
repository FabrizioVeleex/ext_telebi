/**
 * Created by luca on 16/02/2017.
 */
Ext.define('fmc.store.grids.schede.Attivi', {
    extend: 'portal.v1.store.grids.BufferStore',
    alias:'store.v1-attivi',
    requires:[
        'fmc.model.grids.Schede'
    ],
    model: 'fmc.model.grids.Schede',
    proxy: {
        url: Backend.REST_API + 'grids/attivi/getstore/'
    }
});