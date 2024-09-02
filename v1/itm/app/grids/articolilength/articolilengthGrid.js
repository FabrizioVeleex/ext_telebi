/**
 * Created by luke on 09/12/22.
 */
Ext.define('itm.grids.articolilength.articoliLengthGrid', {
    extend: 'portal.v1.view.grids.DefaultGrid',
    requires: [
        'itm.grids.articolilength.articoliLengthController',
        'itm.grids.articolilength.articoliLengthViewModel'
    ],
    viewModel: 'itm-v1-grid-articolilength',
    controller: 'itm-v1-grid-articolilength',
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