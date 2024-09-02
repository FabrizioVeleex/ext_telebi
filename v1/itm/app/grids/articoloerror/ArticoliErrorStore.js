/**
 * Created by luca on 16/02/2017.
 */
Ext.define('itm.grids.articolierror.ArticoliErrorStore', {
    extend: 'portal.v1.store.grids.BufferStore',
    alias: 'store.itm-v1-store-articolierror',
    requires: [
        'itm.grids.articolierror.ArticoliErrorModel'
    ],
    model: 'itm.grids.articolierror.ArticoliErrorModel',
    proxy: {
        url: Backend.REST_API + 'grids/articoliError/getstore/'
    }
});