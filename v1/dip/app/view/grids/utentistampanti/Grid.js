Ext.define('dip.view.grids.utentistampanti.Grid', {
    extend: 'portal.v1.view.grids.DefaultGrid',
    requires: [
        'dip.view.grids.utentistampanti.Model',
        'dip.view.grids.utentistampanti.Controller',
    ],
    viewModel: 'utentistampanti',
    controller: 'utentistampanti',
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