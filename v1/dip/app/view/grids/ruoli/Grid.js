Ext.define('dip.view.grids.ruoli.Grid', {
    extend: 'portal.v1.view.grids.DefaultGrid',
    requires: [
        'dip.view.grids.ruoli.Model',
        'dip.view.grids.ruoli.Controller',
    ],
    viewModel: 'ruoli',
    controller: 'ruoli',
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