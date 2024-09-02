/**
 * Created by luca on 16/02/2017.
 */
Ext.define('rec.store.grids.incorso.Store', {
    extend: 'portal.v1.store.grids.BufferStore',
    alias:'store.v1-incorso',
    requires:[
        'rec.model.grids.Resi'
    ],
    model: 'rec.model.grids.Resi',
    proxy: {
        url: Backend.REST_API + 'grids/incorso/getstore/',
        extraParams: {idpadre:'NaN'}
    },
    listeners:{
        beforeload: 'beforeload'
    }
});