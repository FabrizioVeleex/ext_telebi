/**
 * Created by luca on 16/02/2017.
 */
Ext.define('rec.store.grids.bozze.Store', {
    extend: 'portal.v1.store.grids.BufferStore',
    alias:'store.v1-bozze',
    requires:[
        'rec.model.grids.Resi'
    ],
    model: 'rec.model.grids.Resi',
    proxy: {
        url: Backend.REST_API + 'grids/bozze/getstore/'
    }
});