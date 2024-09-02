/**
 * Created by luca on 13/06/2017.
 */
Ext.define('ana.store.grids.zone.Store', {
    extend: 'portal.v1.store.grids.BufferStore',
    alias:'store.v1-zone',
    requires:[
        'ana.model.grids.Zone'
    ],
    model: 'ana.model.grids.Zone',

    proxy: {
        url: Backend.REST_API + 'grids/zone/getstore/'
    }
});