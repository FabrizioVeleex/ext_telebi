/**
 * Created by fabrizio on 24/10/2023.
 */
Ext.define('prd.grids.categorie.CategorieViewModel', {
    extend: 'portal.v1.view.grids.DefaultModel',
    alias: 'viewmodel.v1-prd-categorie',
    requires: [
        'prd.grids.categorie.CategorieStore',
    ],
    stores: {
        storeCategorie: { type: 'v1-prd-categorie', autoLoad: false },
    },
    data: {
        titolo: Locale.t('prd.grids.categorie.title'),
    }
});