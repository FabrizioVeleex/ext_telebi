/**
 * Created by luca on 16/02/2017.
 */
Ext.define('itm.grids.articolimedia.ArticoliStore', {
    extend: 'portal.v1.store.grids.BufferStore',
    alias: 'store.itm-v1-store-articolimedia',
    requires: [
        'itm.grids.articolimedia.ArticoliModel'
    ],
    model: 'itm.grids.articolimedia.ArticoliModel',
    proxy: {
        url: Backend.REST_API + 'grids/articolimedia/getstore/'
    },
    listeners: {
        beforeload: 'onBeforeLoadStore'
    }
});