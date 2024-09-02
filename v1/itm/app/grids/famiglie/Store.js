/**
 * Created by luca on 16/02/2017.
 */
Ext.define('itm.grids.famiglie.Store', {
    extend: 'portal.v1.store.grids.BufferStore',
    alias: 'store.itm-v1-grids-famiglie',
    requires: [
        'itm.grids.famiglie.Model'
    ],
    model: 'itm.grids.famiglie.Model',
    proxy: {
        url: Backend.REST_API + 'grids/famiglie/getstore/'
    }
});