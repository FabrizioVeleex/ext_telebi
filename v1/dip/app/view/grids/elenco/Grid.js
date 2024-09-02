Ext.define('dip.view.grids.elenco.Grid', {
    extend: 'portal.v1.view.grids.DefaultGrid',
    requires: [
        'dip.view.grids.elenco.Model',
        'dip.view.grids.elenco.Controller'
    ],
    viewModel: 'elenco',
    controller: 'elenco',
    bind: {
        store: '{store}',
        title: '{titolo}'
    },
    columns: [],
    listeners:{
        columnresize:'onResizeColumn',
        columnmove:'onColumnMove',
        columnhide:'onColumnhide',
        columnShow:'onColumnshow'
    }
});