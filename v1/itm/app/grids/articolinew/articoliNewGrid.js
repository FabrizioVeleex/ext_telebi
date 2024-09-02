/**
 * Created by luke on 09/12/22.
 */
Ext.define('itm.grids.articolinew.articoliNewGrid', {
    extend: 'portal.v1.view.grids.DefaultGrid',
    requires: [
        'itm.grids.articolinew.articoliNewController',
        'itm.grids.articolinew.articoliNewViewModel'
    ],
    viewModel: 'itm-v1-grid-articolinew',
    controller: 'itm-v1-grid-articolinew',
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
        selectionchange: "onSelectionChange", // gestione visualizzazione anteprima
        alterTitle: "onAlterTitle" // modifica titolo
    }
});