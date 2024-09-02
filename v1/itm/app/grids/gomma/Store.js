/**
 * Created by luca on 16/02/2017.
 */
Ext.define('itm.grids.gomma.Store', {
    extend: 'portal.v1.store.grids.BufferStore',
    alias: 'store.acr_v1-grid-gomma',
    requires: [
        'itm.grids.gomma.Model'
    ],
    model: 'itm.grids.gomma.Model',
    proxy: {
        url: Backend.REST_API + 'grids/gomma/getstore/'
    }
});