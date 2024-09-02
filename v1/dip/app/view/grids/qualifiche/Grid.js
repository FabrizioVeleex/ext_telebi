Ext.define('dip.view.grids.qualifiche.Grid', {
    extend: 'portal.v1.view.grids.DefaultGrid',
    requires: [
        'dip.view.grids.qualifiche.Model',
        'dip.view.grids.qualifiche.Controller',
    ],
    viewModel: 'qualifiche',
    controller: 'qualifiche',
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