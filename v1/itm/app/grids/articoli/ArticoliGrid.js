/**
 * Created by luke on 09/12/22.
 */
Ext.define('itm.grids.articoli.ArticoliGrid', {
    extend: 'portal.v1.view.grids.DefaultGrid',
    requires: [
        'itm.grids.articoli.ArticoliController',
        'itm.grids.articoli.ArticoliViewModel'
    ],
    viewModel: 'itm-v1-grid-articoli',
    controller: 'itm-v1-grid-articoli',
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
        alterTitle: "onAlterTitle", // modifica titolo
        selectionchange: "onSelectionChange", // gestione visualizzazione anteprima
        activate: 'onActivateGrid' // gestione toggle show image
    }
});