/**
 * Created by luke on 09/12/22.
 */
Ext.define('itm.grids.gruppi.Grid', {
    extend: 'portal.v1.view.grids.DefaultGrid',
    requires: [
        'itm.grids.gruppi.Controller',
        'itm.grids.gruppi.ViewModel'
    ],
    viewModel: 'gruppi',
    controller: 'gruppi',
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
        itemdblclick: 'onitemdblclick'
    }
});