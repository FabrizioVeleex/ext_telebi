/**
 * Created by luke on 2018-12-24.
 */
Ext.define('cde.view.grids.webprodotti.component.Store', {
    extend: 'portal.v1.store.grids.BufferStore',
    alias:'store.v1-grid-webprodotti',
    requires:[
        'cde.view.grids.listsconto.component.Model'
    ],
    model: 'cde.view.grids.listsconto.component.Model',

    proxy: {
        url: Backend.REST_API + 'grids/webprodotti/getstore/'
    }
});