/**
 * Created by luca on 16/02/2017.
 */
Ext.define('rec.store.grids.annullati.Store', {
    extend: 'portal.v1.store.grids.BufferStore',
    alias:'store.v1-annullati',
    requires:[
        'rec.model.grids.Documenti'
    ],
    model: 'rec.model.grids.Documenti',
    proxy: {
        url: Backend.REST_API + 'grids/annullati/getstore/'
    }
});