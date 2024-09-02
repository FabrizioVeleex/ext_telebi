/**
 * Created by luca on 08/03/2017.
 */
Ext.define('ana.store.grids.categorie.Store', {
    extend: 'portal.v1.store.grids.BufferStore',
    alias:'store.v1-categorie',
    requires:[
        'ana.model.grids.Categorie'
    ],
    model: 'ana.model.grids.Categorie',

    proxy: {
        url: Backend.REST_API + 'grids/categorie/getstore/'
    }
});