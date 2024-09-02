/**
 * Created by fabrizio on 24/10/2023.
 */
Ext.define('prd.grids.tipologie.TipologieGrid', {
    extend: 'portal.v1.view.grids.DefaultGrid',
    requires: [
        'prd.grids.tipologie.TipologieController',
        'prd.grids.tipologie.TipologieViewModel'
    ],
    viewModel: 'v1-prd-tipologie',
    controller: 'v1-prd-tipologie',
    bind: {
        store: '{storeTipologie}',
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