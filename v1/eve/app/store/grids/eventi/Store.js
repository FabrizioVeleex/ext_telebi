/**
 * Created by luca on 16/02/2017.
 */
Ext.define('eve.store.grids.eventi.Store', {
    extend: 'portal.v1.store.grids.BufferStore',
    alias:'store.v1-eventi',
    requires:[
        'eve.model.grids.Eventi'
    ],
    model: 'eve.model.grids.Eventi',
    proxy: {
        url: Backend.REST_API + 'grids/eventi/getstore/'
    }
});