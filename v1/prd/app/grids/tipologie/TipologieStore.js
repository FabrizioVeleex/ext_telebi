/**
 * Created by fabrizio on 24/10/2023.
 */
Ext.define('prd.grids.tipologie.TipologieStore', {
    extend: 'portal.v1.store.grids.BufferStore',
    alias: 'store.v1-prd-tipologie',
    requires: [
        'prd.grids.tipologie.TipologieModel'
    ],
    model: 'prd.grids.tipologie.TipologieModel',
    proxy: {
        url: Backend.REST_API + 'grids/tipologie/getstore/'
    }
});