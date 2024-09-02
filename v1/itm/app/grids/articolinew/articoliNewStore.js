/**
 * Created by luca on 16/02/2017.
 */
Ext.define('itm.grids.articolinew.articoliNewStore', {
    extend: 'portal.v1.store.grids.BufferStore',
    alias: 'store.itm-v1-store-articolinew',
    requires: [
        'itm.grids.articolinew.articoliNewModel'
    ],
    model: 'itm.grids.articolinew.articoliNewModel',
    proxy: {
        url: Backend.REST_API + 'grids/articoliNew/getstore/'
    },
    listeners: {
        beforeload: 'onBeforeLoadStore'
    }
});