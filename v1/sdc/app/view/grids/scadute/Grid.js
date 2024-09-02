/**
 * Created by fabrizio on 11/10/2021.
 */
Ext.define('sdc.view.grids.scadute.Grid', {
    extend: 'portal.v1.view.grids.DefaultGrid',
    requires: [
        'sdc.view.grids.scadute.Model',
        'sdc.view.grids.scadute.Controller'
    ],
    viewModel: 'scadute',
    controller: 'scadute',
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