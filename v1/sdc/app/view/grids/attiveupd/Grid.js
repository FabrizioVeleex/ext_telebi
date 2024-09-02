/**
 * Created by fabrizio on 11/10/2021.
 */
Ext.define('sdc.view.grids.attiveupd.Grid', {
    extend: 'portal.v1.view.grids.DefaultGrid',
    requires: [
        'sdc.view.grids.attiveupd.Controller',
        'sdc.view.grids.attiveupd.Model'
    ],
    viewModel: 'attiveupd',
    controller: 'attiveupd',
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