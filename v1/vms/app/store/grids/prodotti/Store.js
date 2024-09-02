/**
 * Created by luca on 16/02/2017.
 */
Ext.define('vms.store.grids.prodotti.Store', {
    extend: 'portal.v1.store.grids.BufferStore',
    alias:'store.v1-prodotti',
    requires:[
        'vms.model.grids.Prodotti'
    ],
    model: 'vms.model.grids.Prodotti',
    proxy: {
        url: Backend.REST_API + 'grids/prodotti/getstore/',
        extraParams: {idpadre:'NaN'}
    },
    listeners:{
        beforeload: 'beforeload'
    }
});