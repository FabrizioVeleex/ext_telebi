/**
 * Created by fabrizio on 24/10/2023.
 */
Ext.define('prd.grids.categorie.CategorieStore', {
    extend: 'portal.v1.store.grids.BufferStore',
    alias: 'store.v1-prd-categorie',
    requires: [
        'prd.grids.categorie.CategorieModel'
    ],
    model: 'prd.grids.categorie.CategorieModel',
    proxy: {
        url: Backend.REST_API + 'grids/categorie/getstore/'
    }
});