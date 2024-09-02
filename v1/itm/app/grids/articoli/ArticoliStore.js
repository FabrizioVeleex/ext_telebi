/**
 * Created by luca on 16/02/2017.
 */
Ext.define('itm.grids.articoli.ArticoliStore', {
    extend: 'portal.v1.store.grids.BufferStore',
    alias: 'store.itm-v1-store-articoli',
    requires: [
        'itm.grids.articoli.ArticoliModel'
    ],
    model: 'itm.grids.articoli.ArticoliModel',
    proxy: {
        url: Backend.REST_API + 'grids/articoli/getstore/'
    },
    listeners: {
        beforeload: 'onBeforeLoadStore'
    }
});