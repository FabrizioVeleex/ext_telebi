Ext.define('dip.view.grids.abilitati.Grid', {
    extend: 'portal.v1.view.grids.DefaultGrid',
    requires: [
        'dip.view.grids.abilitati.Model',
        'dip.view.grids.abilitati.Controller'
    ],
    viewModel: 'abilitati',
    controller: 'abilitati',
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