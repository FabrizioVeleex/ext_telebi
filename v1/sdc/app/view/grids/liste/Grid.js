/**
 * Created by fabrizio on 11/10/2021.
 */
Ext.define('sdc.view.grids.liste.Grid', {
    extend: 'portal.v1.view.grids.DefaultGrid',
    requires: [
        'sdc.view.grids.liste.Model',
        'sdc.view.grids.liste.Controller'
    ],
    viewModel: 'liste',
    controller: 'liste',
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