/**
 * Created by fabrizio on 11/10/2021.
 */
Ext.define('sdc.store.grids.attiveupd.Store', {
    extend: 'portal.v1.store.grids.BufferStore',
    alias:'store.attiveupd',
    requires: [
        'sdc.model.grids.attiveupd.Model'
    ],
    model: 'sdc.model.grids.attiveupd.Model',

    proxy: {
        url: Backend.REST_API + 'grids/attiveupd/getstore/'
    }
});