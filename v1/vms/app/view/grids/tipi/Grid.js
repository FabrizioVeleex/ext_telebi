/**
 * Created by luca on 16/02/2017.
 */
Ext.define('vms.view.grids.tipi.Grid', {
    extend: 'portal.v1.view.grids.DefaultGrid',
    requires: [
        'vms.view.grids.tipi.Controller',
        'vms.view.grids.tipi.Model'
    ],
    viewModel: 'tipi',
    controller: 'tipi',
    bind: {
        store: '{store}',
        title: '{titolo}'
    },
    columns: [],
    listeners:{
        columnresize:'onResizeColumn',
        columnmove:'onColumnMove',
        columnhide:'onColumnhide',
        columnShow:'onColumnshow',
        itemdblclick:'onitemdblclick'
    }
});