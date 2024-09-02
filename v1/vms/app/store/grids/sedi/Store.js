/**
 * Created by luca on 16/02/2017.
 */
Ext.define('vms.store.grids.sedi.Store', {
    extend: 'portal.v1.store.grids.Store',
    alias:'store.v1-sedi',
    requires:[
        'vms.model.grids.Sedi'
    ],
    model: 'vms.model.grids.Sedi',
    proxy: {
        url: Backend.REST_API + 'grids/sedi/getstore/'
    }
});