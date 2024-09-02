/**
 * Created by fabrizio on 11/10/2021.
 */
Ext.define('sdc.store.grids.scaduteupd.Store', {
    extend: 'portal.v1.store.grids.BufferStore',
    alias:'store.scaduteupd',
    requires: [
        'sdc.model.grids.scaduteupd.Model'
    ],
    model: 'sdc.model.grids.scaduteupd.Model',
    proxy: {
        url: Backend.REST_API + 'grids/scaduteupd/getstore/'
    }
});