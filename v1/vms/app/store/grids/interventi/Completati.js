/**
 * Created by luca on 16/02/2017.
 */
Ext.define('vms.store.grids.interventi.Completati', {
    extend: 'portal.v1.store.grids.BufferStore',
    alias:'store.v1-completati',
    requires:[
        'vms.model.grids.Interventi'
    ],
    model: 'vms.model.grids.Interventi',
    proxy: {
        url: Backend.REST_API + 'grids/interventi/completati/',
        extraParams: {idpadre:'NaN'}
    },
    listeners:{
        beforeload: 'beforeload'
    }
});