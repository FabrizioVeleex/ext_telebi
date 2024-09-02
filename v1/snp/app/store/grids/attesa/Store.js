/**
 * Created by luca on 16/02/2017.
 */
Ext.define('snp.store.grids.attesa.Store', {
    extend: 'portal.v1.store.grids.BufferStore',
    alias:'store.v1-attesa',
    requires:[
        'snp.model.grids.Schede'
    ],
    model: 'snp.model.grids.Schede',
    proxy: {
        url: Backend.REST_API + 'grids/attesa/getstore/'
    }
});