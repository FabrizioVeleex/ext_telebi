Ext.define('dip.view.grids.sistema.Grid', {
    extend: 'portal.v1.view.grids.DefaultGrid',
    requires: [
        'dip.view.grids.sistema.Model',
        'dip.view.grids.sistema.Controller',
        'Ext.grid.ActionColumn'
    ],
    viewModel: 'sistema',
    controller: 'sistema',
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