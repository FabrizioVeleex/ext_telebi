/**
 * Created by luca on 16/02/2017.
 */
Ext.define('rec.store.grids.annullatiacg.Store', {
    extend: 'portal.v1.store.grids.BufferStore',
    alias:'store.v1-annullatiacg',
    requires:[
        'rec.model.grids.Documenti'
    ],
    model: 'rec.model.grids.Documenti',
    proxy: {
        url: Backend.REST_API + 'grids/annullatiacg/getstore/'
    }
});