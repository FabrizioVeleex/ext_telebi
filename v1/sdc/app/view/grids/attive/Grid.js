/**
 * Created by fabrizio on 11/10/2021.
 */
Ext.define('sdc.view.grids.attive.Grid', {
    extend: 'portal.v1.view.grids.DefaultGrid',
    requires: [
        'sdc.view.grids.attive.Model',
        'sdc.view.grids.attive.Controller'
    ],
    viewModel: 'attive',
    controller: 'attive',
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