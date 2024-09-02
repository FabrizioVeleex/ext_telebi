/**
 * Created by fabrizio on 11/10/2021.
 */
Ext.define('sdc.view.grids.archiviateupd.Grid', {
    extend: 'portal.v1.view.grids.DefaultGrid',
    requires: [
        'sdc.view.grids.archiviateupd.Controller',
        'sdc.view.grids.archiviateupd.Model'
    ],
    viewModel: 'archiviateupd',
    controller: 'archiviateupd',
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