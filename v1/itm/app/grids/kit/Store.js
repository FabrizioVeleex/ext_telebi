/**
 * Created by luca on 16/02/2017.
 */
Ext.define('itm.grids.kit.Store', {
    extend: 'portal.v1.store.grids.BufferStore',
    alias: 'store.itm-v1-grids-grid-kit',
    requires: [
        'itm.grids.kit.Model'
    ],
    model: 'itm.grids.kit.Model',
    proxy: {
        url: Backend.REST_API + 'grids/kit/getstore/'
    }
});