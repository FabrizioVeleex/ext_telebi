/**
 * Created by luca on 16/02/2017.
 */
Ext.define('vms.store.grids.tipi.Store', {
    extend: 'portal.v1.store.grids.Store',
    alias:'store.v1-tipi',
    requires:[
        'vms.model.grids.Tipi'
    ],
    model: 'vms.model.grids.Tipi',
    proxy: {
        url: Backend.REST_API + 'grids/tipi/getstore/'
    }
});