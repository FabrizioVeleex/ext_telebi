/**
 * Created by luca on 16/02/2017.
 */
Ext.define('itm.grids.sottogruppi.Store', {
    extend: 'portal.v1.store.grids.BufferStore',
    alias: 'store.itm-v1-grids-sottogruppi',
    requires: [
        'itm.grids.sottogruppi.Model'
    ],
    model: 'itm.grids.sottogruppi.Model',
    proxy: {
        url: Backend.REST_API + 'grids/sottogruppi/getstore/'
    }
});