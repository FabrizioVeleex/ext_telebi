/**
 * Created by luke on 09/12/22.
 */
Ext.define('doc.view.grids.default.uo.Grid', {
    extend: 'portal.v1.view.grids.DefaultGrid',
    requires: [
        'doc.view.grids.default.uo.Controller',
        'doc.view.grids.default.uo.Model'
    ],
    viewModel: 'classi',
    controller: 'classi',
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