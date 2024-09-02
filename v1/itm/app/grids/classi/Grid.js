/**
 * Created by luke on 09/12/22.
 */
Ext.define('itm.grids.classi.Grid', {
    extend: 'portal.v1.view.grids.DefaultGrid',
    requires: [
        'itm.grids.classi.Controller',
        'itm.grids.classi.Model'
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