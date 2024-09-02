/**
 * Created by fabrizio on 11/10/2021.
 */
Ext.define('sdc.store.grids.liste.Store', {
    extend: 'portal.v1.store.grids.BufferStore',
    alias:'store.liste',
    requires:[
        'sdc.model.grids.liste.Model'
    ],
    model: 'sdc.model.grids.liste.Model',
    proxy: {
        url: Backend.REST_API + 'grids/liste/getstore/'
    }
});