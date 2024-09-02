/**
 * Created by luca on 27/06/2017.
 */
Ext.define('websrv.store.grids.assoricambi.Store', {
    extend: 'portal.v1.store.grids.BufferStore',
    alias:'store.v1-assoricambi',
    requires:[
        'websrv.model.grids.Assoricambi'
    ],
    model: 'websrv.model.grids.Assoricambi',

    proxy: {
        url: Backend.REST_API + 'grids/assoricambi/getstore/'
    }
});