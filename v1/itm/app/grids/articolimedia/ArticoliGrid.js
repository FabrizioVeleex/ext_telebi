/**
 * Created by luke on 09/12/22.
 */
Ext.define('itm.grids.articolimedia.ArticoliGrid', {
    extend: 'portal.v1.view.grids.DefaultGrid',
    requires: [
        'itm.grids.articolimedia.ArticoliController',
        'itm.grids.articolimedia.ArticoliViewModel'
    ],
    viewModel: 'itm-v1-grid-articolimedia',
    controller: 'itm-v1-grid-articolimedia',
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
        addFilterMedia: 'onAddFilterMedia', // richiamato da treemenu filtro media
        alterTitle: "onAlterTitle", // modifica titolo
        selectionchange: "onSelectionChange", // gestione visualizzazione anteprima
        activate: 'onActivateGrid' // gestione toggle show image
    }
});