/**
 * Created by luca on 16/02/2017.
 */
Ext.define('eve.store.grids.schede.Store', {
    extend: 'portal.v1.store.grids.BufferStore',
    alias:'store.v1-schede',
    requires:[
        'eve.model.grids.Schede'
    ],
    model: 'eve.model.grids.Schede',
    proxy: {
        url: Backend.REST_API + 'grids/schede/getstore/',
        extraParams: {idpadre:'NaN',idzona:'NaN'}
    },
    listeners:{
        beforeload: 'beforeload'
    }
});