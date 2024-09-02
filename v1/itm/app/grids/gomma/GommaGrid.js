/**
 * Created by luke on 09/12/22.
 */
Ext.define('itm.grids.gomma.GommaGrid', {
    extend: 'portal.v1.view.grids.DefaultGrid',
    requires: [
        'itm.grids.gomma.Controller',
        'itm.grids.gomma.ViewModel'
    ],
    viewModel: 'gomma',
    controller: 'gomma',
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