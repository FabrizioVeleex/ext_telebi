/**
 * Created by fabrizio on 24/10/2023.
 */
Ext.define('prd.grids.categorie.CategorieGrid', {
    extend: 'portal.v1.view.grids.DefaultGrid',
    requires: [
        'prd.grids.categorie.CategorieController',
        'prd.grids.categorie.CategorieViewModel'
    ],
    viewModel: 'v1-prd-categorie',
    controller: 'v1-prd-categorie',
    bind: {
        store: '{storeCategorie}',
        title: '{titolo}'
    },
    columns: [],
    listeners: {
        columnresize: 'onResizeColumn',
        columnmove: 'onColumnMove',
        columnhide: 'onColumnhide',
        columnShow: 'onColumnshow',
        itemdblclick: 'onitemdblclick',
    }
});