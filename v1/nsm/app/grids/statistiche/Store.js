/**
 * Created by fabrizio on 11/02/21.
 */
Ext.define('nsm.grids.statistiche.Store', {
    extend: 'portal.v1.store.grids.BufferStore',
    alias: 'store.v1-grid-statistiche',
    requires: [
        'nsm.grids.statistiche.Model',
    ],
    model: 'nsm.grids.statistiche.Model',

    proxy: {
        url: Backend.REST_API + 'grids/statistiche/getstore/',
    }
});