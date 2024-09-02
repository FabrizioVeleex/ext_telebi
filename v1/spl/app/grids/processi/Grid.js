/**
 * Created by fabrizio on 26/11/2023.
 */
Ext.define('spl.grids.processi.Grid', {
    extend: 'portal.v1.view.grids.DefaultGrid',
    requires: [
        'spl.grids.processi.Controller',
        'spl.grids.processi.ViewModel'
    ],
    viewModel: 'v1-spl-grid-processi',
    controller: 'v1-spl-grid-processi',
    bind: {
        store: '{store}',
        title: '{titolo}'
    },
    columns: [],
    itemId: 'processi',
    iconCls: " x-fas fa-sync ",
    listeners: {
        itemdblclick: 'onitemdblclick',
        columnresize: 'onResizeColumn',
        columnmove: 'onColumnMove',
        columnhide: 'onColumnhide',
        columnShow: 'onColumnshow'
    }
});