/**
 * Created by luca on 16/02/2017.
 */
Ext.define('itm.store.grids.gruppi.Store', {
    extend: 'portal.v1.store.grids.BufferStore',
    alias: 'store.itm-v1-grids-gruppi',
    requires: [
        'itm.grids.gruppi.Model'
    ],
    model: 'itm.grids.gruppi.Model',
    proxy: {
        url: Backend.REST_API + 'grids/gruppi/getstore/'
    }
});