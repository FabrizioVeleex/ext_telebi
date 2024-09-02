/**
 * Created by luke on 09/12/22.
 */
Ext.define('itm.grids.sottogruppi.Grid', {
    extend: 'portal.v1.view.grids.DefaultGrid',
    requires: [
        'itm.grids.sottogruppi.Controller',
        'itm.grids.sottogruppi.ViewModel'
    ],
    viewModel: 'sottogruppi',
    controller: 'sottogruppi',
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