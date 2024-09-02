/**
 * Created by fabrizio on 11/10/2021.
 */
Ext.define('sdc.store.grids.archiviate.Store', {
    extend: 'portal.v1.store.grids.BufferStore',
    alias:'store.archiviate',
    requires: [
        'sdc.model.grids.archiviate.Model'
    ],
    model: 'sdc.model.grids.archiviate.Model',

    proxy: {
        url: Backend.REST_API + 'grids/archiviate/getstore/'
    }
});