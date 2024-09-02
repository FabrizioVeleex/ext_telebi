/**
 * Created by fabrizio on 11/10/2021.
 */
Ext.define('sdc.store.grids.archiviateupd.Store', {
    extend: 'portal.v1.store.grids.BufferStore',
    alias:'store.archiviateupd',
    requires: [
        'sdc.model.grids.archiviateupd.Model'
    ],
    model: 'sdc.model.grids.archiviateupd.Model',

    proxy: {
        url: Backend.REST_API + 'grids/archiviateupd/getstore/'
    }
});