/**
 * Created by luca on 17/08/16.
 */
Ext.define('dip.store.grids.ruoli.Ruoli', {
    extend: 'portal.v1.store.grids.BufferStore',
    alias:'store.ruoli',
    requires:[
        'dip.model.grids.Ruoli'
    ],
    model: 'dip.model.grids.Ruoli',
    proxy: {
        url: Backend.REST_API + 'grids/ruoli/getstore/'
    }
});