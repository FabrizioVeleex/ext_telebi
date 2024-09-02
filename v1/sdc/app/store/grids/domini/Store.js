/**
 * Created by fabrizio on 11/10/2021.
 */
Ext.define('sdc.store.grids.domini.Store', {
    extend: 'portal.v1.store.grids.BufferStore',
    alias:'store.domini',
    requires:[

        'sdc.model.grids.domini.Model'
    ],
    model: 'sdc.model.grids.domini.Model',

    proxy: {
        url: Backend.REST_API + 'grids/domini/getstore/'
    }
});