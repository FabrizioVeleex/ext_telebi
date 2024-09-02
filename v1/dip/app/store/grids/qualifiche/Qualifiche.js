/**
 * Created by luca on 17/08/16.
 */
Ext.define('dip.store.grids.qualifiche.Qualifiche', {
    extend: 'portal.v1.store.grids.BufferStore',
    alias:'store.qualifiche',
    requires:[
        'dip.model.grids.Qualifiche'
    ],
    model: 'dip.model.grids.Qualifiche',
    proxy: {
        url: Backend.REST_API + 'grids/qualifiche/getstore/'
    }
});