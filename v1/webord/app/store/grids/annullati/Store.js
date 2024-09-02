/**
 * Created by luca on 16/02/2017.
 */
Ext.define('webord.store.grids.annullati.Store', {
    extend: 'portal.v1.store.grids.BufferStore',
    alias:'store.v1-annullati',
    requires:[
        'webord.model.grids.Ordini'
    ],
    model: 'webord.model.grids.Ordini',
    proxy: {
        url: Backend.REST_API + 'grids/annullati/getstore/'
    }
});