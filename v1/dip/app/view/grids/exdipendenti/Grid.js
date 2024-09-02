Ext.define('dip.view.grids.exdipendenti.Grid', {
    extend: 'portal.v1.view.grids.DefaultGrid',
    requires: [
        'dip.view.grids.exdipendenti.Model',
        'dip.view.grids.exdipendenti.Controller',
    ],
    viewModel: 'exdipendenti',
    controller: 'exdipendenti',
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