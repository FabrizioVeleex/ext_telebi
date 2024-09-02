/**
 * Created by luke on 09/12/22.
 */
Ext.define('itm.grids.kit.KitGrid', {
    extend: 'portal.v1.view.grids.DefaultGrid',
    requires: [
        'itm.grids.kit.Controller',
        'itm.grids.kit.ViewModel'
    ],
    viewModel: 'kit',
    controller: 'kit',
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