/**
 * Created by luca on 16/02/2017.
 */
Ext.define('itm.grids.articolisito.ArticoliStore', {
    extend: 'portal.v1.store.grids.BufferStore',
    alias: 'store.itm-v1-store-articolisito',
    requires: [
        'itm.grids.articolisito.ArticoliModel'
    ],
    model: 'itm.grids.articolisito.ArticoliModel',

    proxy: {
        url: Backend.REST_API + 'grids/articoli/getstore/',
    },
    listeners: {
        beforeload: 'onBeforeLoadStore'
    }
});