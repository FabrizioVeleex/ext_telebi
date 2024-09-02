/**
 * Created by fabrizio on 24/10/2023.
 */
Ext.define('bolfor.grids.tipologie.Grid', {
    extend: 'portal.v1.view.grids.DefaultGrid',
    requires: [
        'bolfor.grids.tipologie.Controller',
        'bolfor.grids.tipologie.Model'
    ],
    viewModel: 'v1-bolfor-tipologie',
    controller: 'v1-bolfor-tipologie',
    bind: {
        store: '{storeTipologie}',
        title: '{titolo}'
    },
    columns: [],
    listeners: {
        columnresize: 'onResizeColumn',
        columnmove: 'onColumnMove',
        columnhide: 'onColumnhide',
        columnShow: 'onColumnshow',
        itemdblclick: 'onitemdblclick',
    }
});