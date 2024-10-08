/**
 * Created by luke on 09/12/22.
 */
Ext.define('itm.grids.famiglie.Grid', {
    extend: 'portal.v1.view.grids.DefaultGrid',
    requires: [
        'itm.grids.famiglie.Controller',
        'itm.grids.famiglie.Model'
    ],
    viewModel: 'famiglie',
    controller: 'famiglie',
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