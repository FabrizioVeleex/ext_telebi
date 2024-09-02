/**
 * Created by luca on 16/02/2017.
 */
Ext.define('itm.grids.attributi.Store', {
    extend: 'portal.v1.store.grids.Store',
    alias: 'store.itm-v1-grids-attributi',
    requires: [
        'itm.grids.attributi.Model'
    ],
    model: 'itm.grids.attributi.Model',
    proxy: {
        url: Backend.REST_API + 'grids/attributi/getstore/'
    },
    listeners: {
        beforeLoad: "onBeforeLoadStore"
    }
});