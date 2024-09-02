/**
 * Created by fabrizio on 11/10/2021.
 */
Ext.define('sdc.store.grids.attive.Store', {
    extend: 'portal.v1.store.grids.BufferStore',
    alias:'store.attive',
    requires: [
        'sdc.model.grids.attive.Model'
    ],
    model: 'sdc.model.grids.attive.Model',

    proxy: {
        url: Backend.REST_API + 'grids/attive/getstore/'
    }
});