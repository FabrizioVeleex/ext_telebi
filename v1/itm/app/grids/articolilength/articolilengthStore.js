/**
 * Created by luca on 16/02/2017.
 */
Ext.define('itm.grids.articolilength.articoliLengthStore', {
    extend: 'portal.v1.store.grids.BufferStore',
    alias: 'store.itm-v1-store-articolilength',
    requires: [
        'itm.grids.articolilength.articoliLengthModel'
    ],
    model: 'itm.grids.articolilength.articoliLengthModel',
    proxy: {
        url: Backend.REST_API + 'grids/articoliLength/getstore/'
    },
    listeners: {
        beforeload: 'onBeforeLoadStore'
    }
});