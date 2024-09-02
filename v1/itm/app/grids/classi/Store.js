/**
 * Created by luca on 27/10/2017.
 */
Ext.define('itm.grids.classi.Store', {
    extend: 'portal.v1.store.grids.BufferStore',
    alias: 'store.itm-v1-grids-classi',
    requires: [
        'itm.grids.classi.Model'
    ],
    model: 'itm.grids.classi.Model',
    proxy: {
        url: Backend.REST_API + 'grids/classi/getstore/'
    }
});