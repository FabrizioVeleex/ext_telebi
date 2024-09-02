/**
 * Created by fabrizio on 11/10/2021.
 */
Ext.define('sdc.view.grids.scaduteupd.Grid', {
    extend: 'portal.v1.view.grids.DefaultGrid',
    requires: [
        'sdc.view.grids.scaduteupd.Model',
        'sdc.view.grids.scaduteupd.Controller'
    ],
    viewModel: 'scaduteupd',
    controller: 'scaduteupd',
    bind: {
        store: '{store}',
        title: '{titolo}'
    },
    columns: [],
    listeners:{
        itemdblclick:'onitemdblclick',
        columnresize:'onResizeColumn',
        columnmove:'onColumnMove',
        columnhide:'onColumnhide',
        columnShow:'onColumnshow'
    }
});