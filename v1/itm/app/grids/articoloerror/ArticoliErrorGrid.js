/**
 * Created by luke on 09/12/22.
 */
Ext.define('itm.grids.articolierror.ArticoliErrorGrid', {
    extend: 'portal.v1.view.grids.DefaultGrid',
    requires: [
        'itm.grids.articolierror.ArticoliErrorController',
        'itm.grids.articolierror.ArticoliErrorViewModel'
    ],
    viewModel: 'itm-v1-grid-articolierror',
    controller: 'itm-v1-grid-articolierror',
    bind: {
        store: '{store}',
        title: '{titolo}'
    },
    columns: [],
    listeners: {
        columnresize: 'onResizeColumn',
        columnmove: 'onColumnMove',
        columnhide: 'onColumnhide',
        columnShow: 'onColumnshow',
        itemdblclick: 'onitemdblclick',
        addFilterStato: 'onAddFilterStato', // richiamato da treemenu filtro stato
        alterTitle: "onAlterTitle" // modifica titolo
    }
});