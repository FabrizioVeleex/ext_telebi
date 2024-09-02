/**
 * Created by luca on 16/02/2017.
 */
Ext.define('gnc.store.grids.chiuse.Store', {
    extend: 'portal.v1.store.grids.BufferStore',
    alias:'store.v1-chiuse',
    requires:[
        'gnc.model.grids.Schede'
    ],
    model: 'gnc.model.grids.Schede',
    proxy: {
        url: Backend.REST_API + 'grids/chiuse/getstore/',
        extraParams: {idpadre:'NaN'}
    },
    listeners:{
        beforeload: 'beforeload'
    }
});