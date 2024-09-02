/**
 * Created by fabrizio on 11/10/2021.
 */
Ext.define('sdc.view.grids.domini.Grid', {
    extend: 'portal.v1.view.grids.DefaultGrid',
    requires: [
        'sdc.view.grids.domini.Model',
        'sdc.view.grids.domini.Controller'
    ],
    viewModel: 'domini',
    controller: 'domini',
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