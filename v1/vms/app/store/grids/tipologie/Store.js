/**
 * Created by luca on 16/02/2017.
 */
Ext.define('vms.store.grids.tipologie.Store', {
    extend: 'portal.v1.store.grids.BufferStore',
    alias:'store.v1-tipologie',
    requires:[
        'vms.model.grids.Tipologie'
    ],
    model: 'vms.model.grids.Tipologie',
    proxy: {
        url: Backend.REST_API + 'grids/tipologie/getstore/'
    }
});