Ext.define('dip.view.grids.filiali.Grid', {
    extend: 'portal.v1.view.grids.DefaultGrid',
    requires: [
        'dip.view.grids.filiali.Model',
        'dip.view.grids.filiali.Controller',
    ],
    viewModel: 'filiali',
    controller: 'filiali',
    forceFit: true,
    autoLoad:true,
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