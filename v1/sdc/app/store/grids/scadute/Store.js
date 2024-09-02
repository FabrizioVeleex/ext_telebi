/**
 * Created by fabrizio on 11/10/2021.
 */
Ext.define('sdc.store.grids.scadute.Store', {
    extend: 'portal.v1.store.grids.BufferStore',
    alias:'store.scadute',
    requires: [
        'sdc.model.grids.scadute.Model'
    ],
    model: 'sdc.model.grids.scadute.Model',
    proxy: {
        url: Backend.REST_API + 'grids/scadute/getstore/'
    }
});