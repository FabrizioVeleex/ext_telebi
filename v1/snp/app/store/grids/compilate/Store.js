/**
 * Created by luca on 16/02/2017.
 */
Ext.define('snp.store.grids.compilate.Store', {
    extend: 'portal.v1.store.grids.BufferStore',
    alias:'store.v1-compilate',
    requires:[
        'snp.model.grids.Schede'
    ],
    model: 'snp.model.grids.Schede',
    proxy: {
        url: Backend.REST_API + 'grids/compilate/getstore/'
    }
});