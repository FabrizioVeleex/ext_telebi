/**
 * Created by luke on 2018-12-24.
 */
Ext.define('websrv.store.grids.webprodotti.Store', {
    extend: 'portal.v1.store.grids.BufferStore',
    alias:'store.v1-webprodotti',
    requires:[
        'websrv.model.grids.Webprodotti'
    ],
    model: 'websrv.model.grids.Webprodotti',

    proxy: {
        url: Backend.REST_API + 'grids/webprodotti/getstore/'
    }
});