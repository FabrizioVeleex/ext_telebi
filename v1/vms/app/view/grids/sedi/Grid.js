/**
 * Created by luca on 16/02/2017.
 */
Ext.define('vms.view.grids.sedi.Grid', {
    extend: 'portal.v1.view.grids.DefaultGrid',
    requires: [
        'vms.view.grids.sedi.Controller',
        'vms.view.grids.sedi.Model'
    ],
    viewModel: 'sedi',
    controller: 'sedi',
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